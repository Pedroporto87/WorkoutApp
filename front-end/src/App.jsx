import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
//import { useAutomaticTokenRefresh } from './store/hooks/useAutomaticTokenRefresh';

function App() {
  //useAutomaticTokenRefresh()
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default App
