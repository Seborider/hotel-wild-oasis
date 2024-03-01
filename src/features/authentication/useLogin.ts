import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { LoginPromise, login as loginApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { UserAttributes } from '@supabase/supabase-js'

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const loginMutation = useMutation<
        LoginPromise,
        unknown,
        UserAttributes,
        unknown
    >({
        mutationFn: (loginProps: UserAttributes) => loginApi(loginProps),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user)
            navigate('/', { replace: true })
            toast.success('Login successfull!')
        },
        onError: () => {
            toast.error('Email or password incorrect')
        },
    })

    return { login: loginMutation.mutate, isLoading: loginMutation.isLoading }
}
