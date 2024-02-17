import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Account from "./pages/Account.tsx";
import Bookings from "./pages/Bookings.tsx";
import Cabins from "./pages/Cabins.tsx";
import Login from "./pages/Login.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import Settings from "./pages/Settings.tsx";
import Users from "./pages/Users.tsx";
import GlobalStyles from "./styles/GlobalStyles.ts";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route element={<Dashboard />} path="dashboard" />
          <Route element={<Account />} path="account" />
          <Route element={<Bookings />} path="bookings" />
          <Route element={<Cabins />} path="cabins" />
          <Route element={<Login />} path="login" />
          <Route element={<Settings />} path="settings" />
          <Route element={<Users />} path="users" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </>
  );
}
