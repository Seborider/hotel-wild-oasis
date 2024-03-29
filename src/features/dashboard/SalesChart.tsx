import { useDarkMode } from '../../context/DarkModeContext'
import styled from 'styled-components'
import DashboardBox from './DashboardBox.js'
import Heading from '../../ui/Heading.js'
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { BookingType } from '../../interfaces.js'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`

interface SalesChartsProps {
    bookings?: BookingType[]
    numDays?: number
}

function SalesChart({ bookings, numDays }: SalesChartsProps) {
    const { isDarkMode } = useDarkMode()

    const colors = isDarkMode
        ? {
              totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
              extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
              text: '#e5e7eb',
              background: '#18212f',
          }
        : {
              totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
              extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
              text: '#374151',
              background: '#fff',
          }

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays! - 1),
        end: new Date(),
    })

    const data = allDates.map((date) => {
        return {
            label: format(date, 'MMM dd'),
            totalSales: bookings
                ?.filter((booking) =>
                    isSameDay(date, new Date(booking.created_at!))
                )
                .reduce((acc, cur) => acc + cur.totalPrice!, 0),
            extrasSales: bookings
                ?.filter((booking) =>
                    isSameDay(date, new Date(booking.created_at!))
                )
                .reduce((acc, cur) => acc + cur.extrasPrice!, 0),
        }
    })

    return (
        <StyledSalesChart>
            <Heading as="h2">
                Sales from {format(allDates.at(0)!, 'MMM dd yyyy')} &mdash;{' '}
                {format(allDates.at(-1)!, 'MMM dd yyyy')}
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit="$"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray="3" />
                    <Tooltip
                        contentStyle={{ backgroundColor: colors.background }}
                    />
                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        strokeWidth={4}
                        unit="$"
                        name="Sales"
                    />
                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        strokeWidth={4}
                        unit="$"
                        name="Sales"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    )
}

export default SalesChart
