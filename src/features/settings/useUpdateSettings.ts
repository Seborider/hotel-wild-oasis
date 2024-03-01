import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSetting } from '../../services/apiSettings.ts'
import toast from 'react-hot-toast'

export function useUpdateSettings() {
    const queryClient = useQueryClient()

    const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success('Settings successfully updated')
            void queryClient.invalidateQueries(['settings'])
        },
        onError: (error: Error) => toast.error(error.message),
    })

    return { isUpdating, updateSettings }
}
