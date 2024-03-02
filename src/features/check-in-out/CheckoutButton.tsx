import Button from '../../ui/Button'
import { useCheckOut } from '../check-in-out/useCheckOut'

interface CheckoutButtonProps {
    bookingId: number
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
    const { isCheckingOut, checkout } = useCheckOut()
    return (
        <Button
            size="small"
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
        >
            Check out
        </Button>
    )
}

export default CheckoutButton
