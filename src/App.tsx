import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./styles/GlobalStyles.ts";

import Dashboard from "./pages/Dashboard.tsx";
import Account from "./pages/Account.tsx";
import Bookings from "./pages/Bookings.tsx";
import Cabins from "./pages/Cabins.tsx";
import Login from "./pages/Login.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import Settings from "./pages/Settings.tsx";
import Users from "./pages/Users.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Account />} path="account" />
            <Route element={<Bookings />} path="bookings" />
            <Route element={<Cabins />} path="cabins" />
            <Route element={<Settings />} path="settings" />
            <Route element={<Users />} path="users" />
          </Route>
          <Route element={<Login />} path="login" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
