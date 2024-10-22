
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from './page/home/HomePage'
import LoginPage from "./page/auth/LoginPage"
import RegisterPage from './page/auth/RegisterPage'
import MainLayout from './component/layout/MainLayout'
import MainLayoutAuth from './component/layout/MainLayoutAuth'
import EmployeePage from "./page/employee/EmployeePage"
import CustomerPage from "./page/customer/CustomerPage"
import CategoryPage from "./page/category/CategoryPage"
import RolePage from "./page/role/RolePage"
import UserPage from "./page/user/UserPage"
import SupplierPage from './page/purchase/SupplierPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route element={<MainLayout/>}>
            <Route path='/' element={<HomePage/>}/> 
            <Route path='/employee' element={<EmployeePage/>}/>
            <Route path='/customer' element={<CustomerPage/>}/>
            <Route path='/category' element={<CategoryPage/>}/>
            <Route path='/role' element={<RolePage/>}/>
            <Route path='/supplier' element={<SupplierPage/>}/>
            {/* <Route path='/role' element={<RolePage/>}/> */}
            <Route path='/user' element={<UserPage/>}/>
            <Route path='*' element={<h1>404-Route Not Found!</h1>}/>
          </Route>
          
          <Route element={<MainLayoutAuth/>}>
            <Route path='/' element={<HomePage/>}/> 
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
