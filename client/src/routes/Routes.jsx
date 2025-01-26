import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentications/Login";
import Register from "../pages/Authentications/Register";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import ErrorPage from "../pages/ErrorPage";
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";
import PrivateRoute from "./PrivateRoute";
import MyBids from "../pages/MyBids";
import BidRequests from "../pages/BidRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: () => fetch(`${import.meta.env.VITE_API_URL}/jobs`) //we can also load data like this but we use axios
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: '/job/:id',
        element: <PrivateRoute><JobDetails/></PrivateRoute>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path: '/update/:id',
        element: <PrivateRoute><UpdateJob/></PrivateRoute>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path: '/add-job',
        element: <PrivateRoute><AddJob/></PrivateRoute>
      },
      {
        path: '/my-posted-jobs',
        element: <PrivateRoute><MyPostedJobs/></PrivateRoute>
      },
      {
        path: '/my-bids',
        element: <PrivateRoute><MyBids/></PrivateRoute>
      },
      {
        path: '/bid-requests',
        element: <PrivateRoute><BidRequests/></PrivateRoute>
      }
    ],
  },
]);

export default router;
