import React, { SetStateAction } from "react";
import { Months } from "../../Types/utils";

type MonthSelectProps = {
  setMonth: React.Dispatch<SetStateAction<number>>;
  month: number;
};

export const MonthSelect: React.FC<MonthSelectProps> = ({
  month,
  setMonth,
}) => {
  return (
    <select
      onChange={(e) => setMonth(parseInt(e.target.value, 10))}
      value={month}
      className="border rounded p-2 w-full focus:border-blue-500"
    >
      {Object.entries(Months).map(([monthName, monthNumber]) => (
        <option key={monthName} value={monthNumber}>
          {monthName}
        </option>
      ))}
    </select>
  );
};

export default MonthSelect;
