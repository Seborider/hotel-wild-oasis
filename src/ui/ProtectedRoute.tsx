import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import useUser from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
    children: ReactNode
}

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    // 1. load the authenticated user
    const { isAuthenticated, isLoading } = useUser()
    const navigate = useNavigate()

    // 2. if there is no authenticated user, return to /login
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate('/login')
        },
        [isAuthenticated, isLoading, navigate]
    )

    // 3. while loading show a spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />;
            </FullPage>
        )

    //4. if there is a user, render the app
    if (isAuthenticated) return <div>{children};</div>
}
