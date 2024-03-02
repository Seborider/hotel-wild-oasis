import {
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineBanknotes,
    HiOutlineChartBar,
} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'
import Stat from './Stat.js'
import { BookingType } from '../../interfaces.js'

interface StatsProps {
    bookings?: BookingType[]
    confirmedStays?: BookingType[]
    numDays?: number
    cabinCount?: number
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
    // Stat 1)
    const numBookings = bookings!.length

    // Stat 2)
    const sales = bookings!.reduce((acc, cur) => acc + (cur.totalPrice ?? 0), 0)

    // Stat 3)
    const checkins = confirmedStays!.length

    // Stat 4)
    const occupation =
        confirmedStays!.reduce((acc, cur) => acc + (cur.numNights ?? 0), 0) /
        (numDays! * cabinCount!)

    return (
        <>
            <Stat
                icon={<HiOutlineBriefcase />}
                title="Bookings"
                value={String(numBookings)}
                color="blue"
            />
            <Stat
                icon={<HiOutlineBanknotes />}
                title="Sales"
                value={String(formatCurrency(sales))}
                color="green"
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                title="Check ins"
                value={String(checkins)}
                color="indigo"
            />
            <Stat
                icon={<HiOutlineChartBar />}
                title="Occupancy rate"
                value={String(Math.round(occupation * 100) + '%')}
                color="yellow"
            />
        </>
    )
}

export default Stats
