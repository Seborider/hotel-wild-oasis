import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { BookingResponse } from "../../interfaces";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: Sono;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: Sono;
  font-weight: 500;
`;

interface BookingRowProps {
  booking: BookingResponse;
}

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const statusToTagName = {
    "un-confirmed": "blue",
    "checked-in": "green",
    "checked-out:": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(String(startDate)))
            ? "Today"
            : formatDistanceFromNow(String(startDate))}{" "}
          &rarr; {Number(numNights)} nights stay
        </span>
        <span>
          {format(new Date(String(startDate)), "MM dd yyyy")} &mdash;{" "}
          {format(new Date(String(endDate)), "MM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", "")}</Tag>

      <Amount>{formatCurrency(Number(totalPrice))}</Amount>
    </Table.Row>
  );
}

export default BookingRow;
