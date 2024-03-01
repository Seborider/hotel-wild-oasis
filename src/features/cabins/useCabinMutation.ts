import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { CabinType } from '../../interfaces.ts'

interface UseCabinMutationProps {
    isEditSession?: boolean
    operation: (editId?: number, newCabinData?: CabinType) => Promise<CabinType>
    editId?: number
}

export function useCabinMutation({
    isEditSession,
    operation,
    editId,
}: UseCabinMutationProps) {
    const queryClient = useQueryClient()
    const successMessage = isEditSession
        ? 'Cabin successfully updated'
        : 'New cabin successfully created'

    const { isLoading: isSubmitting, mutate } = useMutation({
        mutationFn: isEditSession
            ? (newCabinData: CabinType) => operation(editId, newCabinData)
            : operation,
        onSuccess: () => {
            toast.success(successMessage)
            void queryClient.invalidateQueries({ queryKey: ['cabins'] })
        },
        onError: (err: Error) => {
            toast.error(err.message)
        },
    })

    return { isSubmitting, mutate }
}
