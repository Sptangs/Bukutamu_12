import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/admin/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import User from './pages/admin/User';
import AddUser from './pages/admin/AddUser';
import EditUser from './pages/admin/EditUser';
import BukuTamu from './pages/admin/BukuTamu';
import AddBukuTamu from './pages/admin/AddBukuTamu';
import Tamu from './pages/auth/tamu';
import Chart from './pages/admin/LineChart';
import Dashboard2 from './pages/admin/Dash2';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Layout />}>
          <Route path="user" element={<User />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edituser/:id" element={<EditUser />} />
          <Route path="buku-tamu" element={<BukuTamu />} />
          <Route path="adduser" element={<AddUser/>}></Route>
          
        </Route>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          {/* <Route path='formulir' element={<AddBukuTamu />}/> */}
          <Route path='/tamu' element={<Tamu/>}></Route>
          
          <Route path='/chart' element={<Chart/>}></Route>
          <Route path='/dash' element={<Dashboard2/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
