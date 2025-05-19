import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Classes from "../pages/Classes/Classes";
import ClassDetailsPage from "../pages/Classes/ClassDetailsPage";
import PrivateRoute from "./PrivateRoute";
import TeachOnEdumanage from "../Dashboard/TeachOnEdumanage/TeachOnEdumanage";
import Dashboard from "../Layout/Dashboard";
import Profile from "../pages/Profile/Profile";
import AllUsers from "../Dashboard/AllUsers/AllUsers";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
           {
            path:'login',
            element:<Login></Login>
          },
          {
            path: 'signup',
            element: <SignUp></SignUp>
          },
          {
            path:'classes',
            element:<Classes></Classes>

          },
                {
          path: "classDetails/:id",
          element: <ClassDetailsPage></ClassDetailsPage>,
         loader: async ({ params }) => {
          try {
            const res = await fetch(`http://localhost:5000/class/${params.id}`);

            if (!res.ok) {
              const error = await res.text();
              throw new Error(`Fetch failed: ${res.status} - ${error}`);
            }

            const data = await res.json();

            return data;
          } catch (error) {
            console.error("Failed to fetch class:", error.message);
            throw new Response("Class Not Found", { status: 404, statusText: error.message });
          }
        }



         

        

          
        },
        {
          path:'dashboard',
          element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
          children:[
             {
          path:'applyforteacher',
          element:<TeachOnEdumanage></TeachOnEdumanage>,
           },
           {
            path:'profile',
            element:<Profile></Profile>
           }, {
            path:'users',
            element:<AllUsers></AllUsers>
           },

          ]

        },
       

      ]
    },
  ]);