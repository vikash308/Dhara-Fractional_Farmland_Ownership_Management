import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Farms from './pages/Farms';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import SelectCrop from './pages/SelectCrop';
import CropLogs from './pages/CropLogs';
import FarmerDashboard from './FarmerPages/FarmerDashboard';
import AddCropLog from './FarmerPages/AddCropLogs';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App(){

  return<>
<BrowserRouter>
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking/:farmId" element={<Booking />} />
              <Route path="/select-crop/:bookingId" element={<SelectCrop />} />
              <Route path="/crop-logs/:bookingId" element={<CropLogs />} />
            </Route>

            {/* Farmer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['farmer']} />}>
              <Route path="/farmer" element={<FarmerDashboard />} />
              <Route path="/add-log/:bookingId" element={<AddCropLog />} />
            </Route>

            
          </Routes>
        </main>
        <Footer />
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </BrowserRouter>
  </>
}

export default App;