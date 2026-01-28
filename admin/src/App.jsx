import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

// Pages
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import Orders from "./Pages/Orders";
import Slides from "./Pages/Slides";
import Users from "./Pages/Users";
import Products from "./Pages/Products";


function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <section className="main">
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="contentMain flex">
        <Sidebar open={sidebarOpen} />

        <div className="rightPart w-full">
          <div
            className={`transition-all duration-300
            ${sidebarOpen ? "pl-64" : "pl-7"} pr-7 py-3`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> }, // /

      { path: "slides", element: <Slides /> }, // /slides
      { path: "slides/create", element: <Slides /> },

      { path: "users", element: <Users /> }, // /users

      { path: "products", element: <Products /> }, // /products
      { path: "products/create", element: <Products /> },

      { path: "categories", element: <Categories /> }, // /categories
      { path: "categories/create", element: <Categories /> },

      { path: "orders", element: <Orders /> }, // /orders
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
