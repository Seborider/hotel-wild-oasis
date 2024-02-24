import { useCabins } from "./useCabins.ts";

import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import ErrorFallback from "../../ui/ErrorFallback.tsx";
import Table from "../../ui/Table.tsx";
import { CabinType } from "../../interfaces.ts";
import Menus from "../../ui/Menus.tsx";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback />;

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
          data={cabins!}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
