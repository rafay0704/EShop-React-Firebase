import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Home, Contact, Login , Register , Reset} from './pages'
import { Header } from "./components/header/Header"
import { Footer } from "./components/footer/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 

  return (
    <>
      <BrowserRouter> 
      <ToastContainer/>
      <Header/>
      <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/contact" element={<Contact/>}/>
      <Route  path="/login" element={<Login/>}/>
      <Route  path="/register" element={<Register/>}/>
      <Route  path="/reset" element={<Reset/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      

     
    </>
  )
}

export default App
