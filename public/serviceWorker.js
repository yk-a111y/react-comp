const CACHE_NAME = 'HOMEPAGE_CACHE_v1'; // 缓存 key，sw.js 更新了可以升级版本

// 配置需要缓存的资源，只缓存主文档，静态资源浏览器自己就会缓存
const urlsToCache = [
  '/api/test.txt',
];

// 安装事件：预缓存一些关键资源
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install Event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching pre-defined resources');
      return cache.addAll(urlsToCache);
    }).catch((error) => {
      console.error('[Service Worker] Failed to cache resources during install:', error);
    })
  );
});

// 激活事件：清理旧版本的缓存
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate Event');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // 确保 SW 控制所有客户端
  );
});

// 获取事件：实现 "Stale-While-Revalidate" 策略
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  // 仅处理需要缓存的请求
  if (!urlsToCache.includes(requestUrl.pathname)) return;

  // 处理 fetch 事件
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // 如果缓存存在，立即返回缓存内容
        console.log(`[Service Worker] Serving from cache: ${event.request.url}`);

        // 后台发起网络请求以更新缓存
        event.waitUntil(
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              // 获取缓存响应中的版本
              const cachedVersion = cachedResponse.headers.get('x-page-version');
              // 获取网络响应中的版本
              const networkVersion = networkResponse.headers.get('x-page-version');
              console.log(`[Service Worker] Cached Version: ${cachedVersion}`);
              console.log(`[Service Worker] Network Version: ${networkVersion}`);
              if (cachedVersion !== networkVersion) {
                return caches.open(CACHE_NAME).then((cache) => {
                  // 缓存最新内容，下次使用
                  cache.put(event.request, networkResponse.clone());
                  console.log(`[Service Worker] Fetched and cached (background): ${event.request.url}`);

                  // 通知客户端刷新，展示最新内容
                  return sendMessage({
                    version: networkVersion,
                    action: 'update',
                    url: event.request.url,
                  });
                });
              }
            }
          }).catch((error) => {
            console.error(`[Service Worker] Background fetch failed for: ${event.request.url}`, error);
          })
        );

        return cachedResponse; // 立即返回缓存内容
      }

      // 如果缓存不存在，从网络获取最新资源
      return fetch(event.request).catch((error) => {
        console.error(`[Service Worker] Fetch failed for: ${event.request.url}`, error);
      });
    })
  );
});

function sendMessage(data) {
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(data);
    });
  });
}