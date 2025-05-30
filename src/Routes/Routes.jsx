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
import AllTeacherRequests from "../Dashboard/AllTeacherRequest/AllTeacherRequest";
import Payment from "../Dashboard/Payment/Payment";
import PaymentHistory from "../Dashboard/PaymentHistory/PaymentHistory";
import MyEnrolledClasses from "../Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import AddClass from "../Dashboard/AddClass/AddClass";
import myClass from "../Dashboard/MyClass/MyClass";
import MyClass from "../Dashboard/MyClass/MyClass";
import AdminClassApproval from "../Dashboard/AdminClassApproval/AdminClassApproval";
import MyClassDetails from "../Dashboard/myClassDetails/myClassDetails";
import MyEnrollClassDetails from "../Dashboard/MyEnrollClassDetails/MyEnrollClassDetails";



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
                path: "/classDetails/:id",
                element: <PrivateRoute><ClassDetailsPage /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/class/${params.id}`),
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
           {
            path:'teacherRequest',
            element:<AllTeacherRequests></AllTeacherRequests>
           },
           {
             path: 'paymentHistory',
             element: <PaymentHistory></PaymentHistory>

           },
            {
             path: 'enrolledClass',
             element: <MyEnrolledClasses></MyEnrolledClasses>

           },
           {
            path: 'addClass',
             element: <AddClass></AddClass>

           },
           {
            path: 'myClass',
             element: <MyClass></MyClass>

           },
            {
            path: 'AllClass',
             element: <AdminClassApproval></AdminClassApproval>

           },
            {
            path: 'myClassDetails/:id',
             element: <MyClassDetails></MyClassDetails>

           },
            {
            path: 'myenroll-class/:id',
             element: <MyEnrollClassDetails></MyEnrollClassDetails>

           }

          ]

        },
        {
          path:'payment',
          element:<PrivateRoute> <Payment></Payment> </PrivateRoute>

        },
       

      ]
    },
  ]);