import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../services/apiBookings'

export default function useTodayActivity() {
    const { isLoading: isLoadingActivity, data: activities } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity'],
    })

    return { isLoadingActivity, activities }
}
