import React, { SetStateAction } from "react";

type YearSelectProps = {
  setYear: React.Dispatch<SetStateAction<string>>;
  year: string;
};

const YearSelect: React.FC<YearSelectProps> = ({ year, setYear }) => {
  const years = Array.from({ length: 49 }, (_, i) => (2022 + i).toString());

  return (
    <select
      value={year}
      onChange={(e) => setYear(e.target.value)}
      className="border rounded p-2 w-full focus:border-blue-500"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelect;
