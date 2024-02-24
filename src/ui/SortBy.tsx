import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByProps {
  options: Options[];
}

export interface Options {
  value: string;
  label: string;
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    ></Select>
  );
}

export default SortBy;
