import { Navigate } from "react-router-dom";
import SignupUser from '../Components/SignupUser';
import LoginUser from '../Components/LoginUser';
import ForgotPassword from '../Components/ForgotPassword';
import ResetPassword from '../Components/ResetPassword';
import Home from '../Components/Home';
import MemberForm from "../Components/MemberForm";
import OrganizersApproval from "../Components/OrganizersApproval";
import CreateEvent from "../Components/CreateEvent";
import EventsApproval from "../Components/EventsApproval";
import CancelEvents from "../Components/CancelEvents";
import ViewMore from "../Components/ViewMore";
import AllEvents from "../Components/AllEvents";
import Payment from "../Components/Payment";
import UpcommingEvents from "../Components/UpcommingEvents";

const AppRoutes = [
    {
        path: '/signup',
        element: <SignupUser/>
    },
    {
        path: '/login',
        element: <LoginUser/>
    },
    {
        path: '/forgotPassword',
        element: <ForgotPassword/>
    },
    {
        path: '/resetPassword/:token',
        element: <ResetPassword/>
    },
    {
        path: '/index',
        element: <Home/>
    },
    {
        path: '/memberForm',
        element: <MemberForm/>
    },
    {
        path: '/pendingOrganizers',
        element: <OrganizersApproval/>
    },
    {
        path: '/createEvent',
        element: <CreateEvent/>
    },
    {
        path: '/eventApprovals',
        element: <EventsApproval/>
    },
    {
        path: '/cancelEvents',
        element: <CancelEvents/>
    },
    {
        path: '/viewMore/:id',
        element: <ViewMore/>
    },
    {
        path: '/allEvents',
        element: <AllEvents/>
    },
    {
        path: '/payment/:id',
        element: <Payment/>
    },
    {
        path: '/upcommingEvents',
        element: <UpcommingEvents/>
    },
    {
        path: '*',
        element: <Navigate to = '/login'/>
    },
]

export default AppRoutes;