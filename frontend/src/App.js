import Registerpage from './pages/Registerpage';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
// import './App.css';
import Loginpage from './pages/Loginpage';
import AdminLogin from './pages/AdminLogin';
import Profilepage from './pages/Profilepage';
import 'react-toastify/dist/ReactToastify.css'
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import AddUserpage from "./pages/AddUserpage";
import EditUserPage from './pages/EditUserPage';


 

function App() {
  return (
    <div className="App">

    <Router>
      <Routes>
        <Route  path='/register' element={<Registerpage/>}/>
        <Route  path='/login' element={<Loginpage/>} />
        <Route  path='/' element={<UserHome/>}/>
        <Route  path='/adlogin' element={<AdminLogin/>}/>
        <Route path='/admin/home' element={<AdminHome/>}/>
        <Route  path='/profile' element={<Profilepage/>}/>
        <Route path='/updateprofile' element={<UpdateProfile/>}/>
        <Route path="/admin/add-user" element={<AddUserpage />} />
        <Route path="/admin/edit-user" element={<EditUserPage />} />
       
        </Routes>  
      </Router>
    </div>
  );
}

export default App;
