import { Dayjs } from "dayjs";
import "./Header.less";

interface HeaderProps {
  curMonth: Dayjs;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleToday: () => void;
}

const Header = (props: HeaderProps) => {
  const { curMonth, handlePrevMonth, handleNextMonth, handleToday } = props;

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={handlePrevMonth}>
          &lt;
        </div>
        <div className="calendar-header-value">
          {curMonth.format("YYYY 年 MM 月")}
        </div>
        <div className="calendar-header-icon" onClick={handleNextMonth}>
          &gt;
        </div>
        <button className="calendar-header-btn" onClick={handleToday}>
          今天
        </button>
      </div>
    </div>
  );
};

export default Header;
