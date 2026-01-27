// Import routing tools
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="contentMain">
            <div className="sideBarWrapper w-[18%] ">
              <Sidebar />
            </div>
          </div>
        </section>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
