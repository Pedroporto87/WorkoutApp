import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default App
