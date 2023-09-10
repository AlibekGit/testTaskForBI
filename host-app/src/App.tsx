import React, { FC } from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

// import Counter from "remote_form/Counter";

import "./index.scss";
import { Header } from "./components/Header";
import { ContactsPage } from "./pages/ContactsPage";
import { MainPage } from "./pages/MainPage";

const App: FC = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "/contacts",
        element: <ContactsPage />
      }
    ]
  }
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("app"));
