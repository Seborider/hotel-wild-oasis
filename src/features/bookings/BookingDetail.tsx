import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack.js";

import ButtonText from "../../ui/ButtonText";
import { useBooking } from "./useBooking.js";
import Spinner from "../../ui/Spinner.js";
import BookingDataBox from "./BookingDataBox.js";
import { BookingKa } from "../../interfaces.js";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { status, id: bookingId } = booking! ?? {};
  const navigate = useNavigate();

  const statusToTagName = {
    "un-confirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as unknown as BookingKa} />

      <ButtonGroup>
        {status === "un-confirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check-In
          </Button>
        )}

        {status === "unconfirmed" && (
          <Button onClick={moveBack}>Check in</Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
