import {
  /*Route,*/ createBrowserRouter /*createRoutesFromElements*/,
} from "react-router-dom";
import PublicLayout from "./routes/publicLayout";
import Clock from "./routes/clock";
import TableUsers, {
  loader as usersLoader,
  action as usersAction,
} from "./routes/TableUsers";
import User, { userLoader } from "./routes/User";

// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <div>Hello world!</div>
//     }
//   ]
// );

// const router =  createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<div>Hello world!</div>} />
//     )
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <div>Ooooooooooooooooooooooops! There was an error.</div>,
    children: [
      {
        errorElement: <div>Oops! There was an error in a child</div>,
        children: [
          {
            path: "clock",
            element: <Clock />,
          },
          {
            path: "people",
            element: <TableUsers />,
            loader: usersLoader,
            action: usersAction,
          },
          {
            path: "users/:userId",
            element: <User />,
            loader: userLoader,
          },
        ],
      },
    ],
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PublicLayout />,
//     errorElement: <div>Oooooooooooooooooooooops! There was an error.</div>,
//     children: [
//       {
//         path: "clock",
//         element: <Clock />,
//       },
//       {
//         path: "people",
//         element: <TableUsers />,
//         loader: usersLoader,
//         action: usersAction,
//       },
//       {
//         path: "users/:userId",
//         element: <User />,
//         loader: userLoader,
//       },
//     ],
//   },
// ]);

export default router;
