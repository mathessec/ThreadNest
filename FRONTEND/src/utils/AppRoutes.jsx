import {element} from 'react'
import Login from '../components/auth/login.jsx'
import SignUp from '../components/auth/signup.jsx'

const AppRoutes=[
    {
        path:'/Login',
        element:<Login/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    },
    {
        path:'*',
        element:<Navigate to='/Login'/>
    }
]

export default AppRoutes