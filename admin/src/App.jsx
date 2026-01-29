import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import AdminProvider from "./Providers/AdminProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

// Pages
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import Orders from "./Pages/Orders";
import Slides from "./Pages/Slides";
import Users from "./Pages/Users";
import Products from "./Pages/Products";

// ---------- Layout ----------
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <section className="main">
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="contentMain flex">
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="rightPart w-full ">
          <div
            className={`transition-all duration-300 bg-[#f1f1f1] pt-[90px] z-50
              ${sidebarOpen ? "pl-[270px]" : "pl-[100px]"} pr-7 py-3`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Router ----------
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "slides", element: <Slides /> },
      { path: "slides/create", element: <Slides /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "products/create", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/create", element: <Categories /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);

// ---------- App ----------
function App() {
  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
}

export default App;
