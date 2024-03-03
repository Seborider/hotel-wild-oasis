import styled from 'styled-components'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Spinner from '../../ui/Spinner'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import BookingDataBox from './BookingDataBox'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from './useBooking.js'
import { useNavigate } from 'react-router-dom'
import { useCheckOut } from '../check-in-out/useCheckOut'
import { useDeleteBooking } from './useDeleteBooking'
import Empty from '../../ui/Empty'

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`

function BookingDetail() {
    const moveBack = useMoveBack()
    const { booking, isLoading } = useBooking()
    const { status, id: bookingId } = booking! ?? {}
    const navigate = useNavigate()
    const { checkout, isCheckingOut } = useCheckOut()
    const { isDeleting, deleteBooking } = useDeleteBooking()

    const statusToTagName = {
        'un-confirmed': 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    }

    if (isLoading) return <Spinner />
    if (!booking) return <Empty resource={String(booking)} />

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking {bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status!.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking!} />

            <ButtonGroup>
                {status === 'un-confirmed' && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check-In
                    </Button>
                )}

                {status === 'unconfirmed' && (
                    <Button onClick={moveBack}>Check in</Button>
                )}

                {status === 'checked-in' && (
                    <Button
                        onClick={() => checkout(bookingId!)}
                        disabled={isCheckingOut}
                    >
                        Check-Out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens="delete">
                        <Button $variation="danger">Delete Booking</Button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resource="booking"
                            onConfirm={() => {
                                deleteBooking(bookingId!, {
                                    onSettled: () => navigate(-1),
                                })
                            }}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>

                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    )
}

export default BookingDetail
