import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Farms from './pages/Farms';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

function App(){

  return<>
<BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/farms" element={<Farms />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  <Footer/>
  <ToastContainer toastClassName="w-[25px] text-sm p-2 mt-13" />
  </BrowserRouter>
  </>
}

export default App;