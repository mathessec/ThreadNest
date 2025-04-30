import { Navigate } from 'react-router-dom';
import Login from '../components/auth/login.jsx';
import SignUp from '../components/auth/signup.jsx';
import Dashboard from '../routes/common/dashboard.jsx';
import Service from '../routes/common/service.jsx';
import About from '../routes/common/about.jsx';
import Home from '../routes/common/home.jsx';
import TailorList from '../components/tailor/index.jsx';
import CreateTailor from '../components/tailor/createshop.jsx';
import EditTailor from '../components/tailor/editshop.jsx';// Import the DeleteTailor componen

const AppRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path:'/service',
    element:<Service/>
  },
  {
    path:'/home',
    element:<Service/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path: '/tailor/list',
    element: <TailorList />
  },
  {
    path: '/tailor/createshop',
    element: <CreateTailor />
  },
  {
    path: '/tailor/editshop/:id',  // Updated to include dynamic id parameter
    element: <EditTailor />
  }, 
  {
    path: '*',
    element: <Navigate to="/login" />
  }
];

export default AppRoutes;
