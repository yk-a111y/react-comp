const isNumber = (obj: any) => {
  return (
    Object.prototype.toString.call(obj) === "[object Number]" && obj === obj
  );
};

const toNumber = (value?: string | number, defaultValue?: number) => {
  if (value === undefined) {
    return defaultValue;
  }
  if (isNumber(value)) {
    return value;
  }
  const numberVal = parseFloat(value as string);

  return isNumber(numberVal) ? numberVal : defaultValue;
};

export { isNumber, toNumber };
