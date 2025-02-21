import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './Components/User/user';
import Photographer from './Components/Vendors/Photographer/photographer';
import Venues from './Components/Venues/venues';
import Service from './Components/Service/service';
import RealWedding from './Components/Real wedding/realWedding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/photographer" element={<Photographer />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/service" element={<Service />} />
        <Route path="/real-wedding" element={<RealWedding />} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
