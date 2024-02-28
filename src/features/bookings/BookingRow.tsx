import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { BookingKa } from "../../interfaces";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import { useCheckOut } from "../check-in-out/useCheckout";

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
  booking: BookingKa;
}

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckOut();

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

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId!} />
          <Menus.List id={bookingId!}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "un-confirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-In
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId!)}
                disabled={isCheckingOut}
              >
                Check-Out
              </Menus.Button>
            )}
          </Menus.List>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
