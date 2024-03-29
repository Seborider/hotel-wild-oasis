import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GlobalStyles from './styles/GlobalStyles.ts'

import Dashboard from './pages/Dashboard.tsx'
import Account from './pages/Account.tsx'
import Bookings from './pages/Bookings.tsx'
import Cabins from './pages/Cabins.tsx'
import Login from './pages/Login.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import Settings from './pages/Settings.tsx'
import Users from './pages/Users.tsx'
import AppLayout from './ui/AppLayout.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import Booking from './pages/Booking.tsx'
import CheckIn from './pages/Checkin.tsx'
import ProtectedRoute from './ui/ProtectedRoute.tsx'
import { DarkModeProvider } from './context/DarkModeContext.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
})

export default function App() {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to="dashboard" />}
                            />
                            <Route element={<Dashboard />} path="dashboard" />
                            <Route element={<Account />} path="account" />
                            <Route element={<Bookings />} path="bookings" />
                            <Route
                                element={<Booking />}
                                path="bookings/:bookingId"
                            />
                            <Route
                                element={<CheckIn />}
                                path="checkin/:bookingId"
                            />
                            <Route element={<Cabins />} path="cabins" />
                            <Route element={<Settings />} path="settings" />
                            <Route element={<Users />} path="users" />
                        </Route>
                        <Route element={<Login />} path="login" />
                        <Route element={<PageNotFound />} path="*" />
                    </Routes>
                </BrowserRouter>
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: '8px' }}
                    toastOptions={{
                        success: { duration: 3000 },
                        error: { duration: 5000 },
                        style: {
                            fontSize: '16px',
                            maxWidth: '500px',
                            padding: '16px 24px',
                            backgroundColor: 'var(--color-grey-0)',
                            color: 'var(--color-grey-700)',
                        },
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
    )
}
