
const ApiRoutes = {
    LoginUser:{
        path: '/users/loginUser',
        authenticate: false
    },
    SignupUser:{
        path: '/users/createUser',
        authenticate: false
    },
    ForgotPassword: {
        path: '/users/forgotPassword',
        authenticate: false
    },
    ResetPassword: {
        path: '/users/resetPassword',
        authenticate: false
    },
    SearchEvents:{
        path: '/event/search',
        authenticate: true
    },
    MemberForm:{
        path: '/users/memberForm',
        authenticate: true
    },
    PendingOrganizers: {
        path: '/users/pendingOrganizers/',
        authenticate: true
    },
    ApproveOrganizers: {
        path: '/users/approveOrganizer',
        authenticate: true
    },
    RejectOrganizer: {
        path: '/users/rejectOrganizer/',
        authenticate: true
    },
    CreateEvent: {
        path: '/event/createEvent',
        authenticate: true
    },
    PendingEvents: {
        path: '/event/pendingEvents',
        authenticate: true
    },
    ApproverEvent: {
        path: '/event/approveEvent',
        authenticate: true
    },
    RejectEvent: {
        path: '/event/rejectEvent',
        authenticate: true
    },
    GetApprovedEvents: {
        path: '/event/getAllEvents',
        authenticate: true
    },
    CancelEvent: {
        path: '/event/cancelEvent',
        authenticate: true
    },
    GetAllApprovedEvents: {
        path: '/event/getApprovedEvents',
        authenticate: true
    },
    GetEventById: {
        path: '/event/getEventById',
        authenticate: true
    },
    RegisterEvent: {
        path: '/ticket/purchaseTicket',
        authenticate: true
    },
    UpcommingEvents: {
        path: '/event/upcommingEvent',
        authenticate: true
    }
}

export default ApiRoutes;