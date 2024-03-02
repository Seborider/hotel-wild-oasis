import styled from 'styled-components'
import Button from '../../ui/Button'
import { Flag } from '../../ui/Flag'
import Tag from '../../ui/Tag'
import { BookingType } from '../../interfaces'
import { Link } from 'react-router-dom'
import CheckoutButton from '../check-in-out/CheckoutButton'

const StyledTodayItem = styled.li`
    display: grid;
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
    gap: 1.2rem;
    align-items: center;
    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }

    /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */
`

const Guest = styled.div`
    font-weight: 500;
`

interface TodayItemProps {
    activity: BookingType
}

function TodayItem({ activity }: TodayItemProps) {
    const { id, status, guests, numNights } = activity

    return (
        <StyledTodayItem>
            {status === 'un-confirmed' && <Tag type="green">Arriving</Tag>}
            {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

            <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
            <Guest>{guests.fullName}</Guest>
            <div>{numNights} nights</div>

            {status === 'un-confirmed' && (
                <Button size="small" as={Link} to={`/checkin/${id}`}>
                    Check In
                </Button>
            )}

            {status === 'checked-in' && (
                <CheckoutButton bookingId={id!}></CheckoutButton>
            )}
        </StyledTodayItem>
    )
}

export default TodayItem
