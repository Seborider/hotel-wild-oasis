import { useCabins } from "./useCabins.ts";

import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import ErrorFallback from "../../ui/ErrorFallback.tsx";
import Table from "../../ui/Table.tsx";
import { CabinType } from "../../interfaces.ts";
import Menus from "../../ui/Menus.tsx";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback />;

  //1. Filter

  const filteredValue = searchParams.get("discount") ?? "all";

  let filteredCabins: CabinType[] = [];
  if (filteredValue === "all") filteredCabins = cabins ?? [];
  if (filteredValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) ?? [];
  if (filteredValue === "with-discount")
    filteredCabins =
      cabins?.filter((cabin) => cabin?.discount && cabin.discount > 0) ?? [];

  //2. Sort

  const sortBy = searchParams.get("sortBy") ?? "name-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          render={(cabin: CabinType) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          )}
          data={sortedCabins}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
