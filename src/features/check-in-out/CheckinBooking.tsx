import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import BookingDataBox from '../../features/bookings/BookingDataBox'

import { useMoveBack } from '../../hooks/useMoveBack'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useBooking } from '../bookings/useBooking'
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'
import { formatCurrency } from '../../utils/helpers'
import { useCheckIn } from './useCheckIn'
import { useSettings } from '../settings/useSettings'

const Box = styled.div`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(border-radius-md);
    padding: 2.4rem 4rem;
`

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false)
    const [addBreakfast, setAddBreakfast] = useState(false)

    const moveBack = useMoveBack()
    const { booking, isLoading } = useBooking()
    const { checkin, isCheckingIn } = useCheckIn()
    const { settings, isLoading: isLoadingSettings } = useSettings()

    const optionalBreakfastPrice =
        settings?.breakfastPrice && booking?.numGuests && booking?.numNights
            ? settings.breakfastPrice * booking.numGuests * booking.numNights
            : 0

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false)
    }, [booking])

    if (isLoading || isLoadingSettings) return <Spinner />

    function handleCheckIn() {
        if (!confirmPaid) return
        if (addBreakfast && booking)
            checkin({
                bookingId: booking.id!,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: booking.totalPrice! + optionalBreakfastPrice,
                },
            })

        if (booking?.id) checkin({ bookingId: booking.id, breakfast: {} })
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking </Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking!} />

            {!booking?.hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast(!addBreakfast),
                                setConfirmPaid(false)
                        }}
                        id="breakfast"
                    >
                        Add breakfast for{' '}
                        {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid(!confirmPaid)}
                    id="confirm"
                    disabled={confirmPaid || isCheckingIn}
                >
                    I confirm that {booking?.guests.fullName}has paid the full
                    amount of{' '}
                    {!addBreakfast
                        ? formatCurrency(Number(booking?.totalPrice))
                        : `${formatCurrency(optionalBreakfastPrice + booking!.totalPrice!)} (${formatCurrency(Number(booking?.totalPrice))} + ${formatCurrency(optionalBreakfastPrice)})`}
                    .
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    disabled={!confirmPaid || isCheckingIn}
                    onClick={handleCheckIn}
                >
                    Check in booking
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    )
}

export default CheckinBooking
