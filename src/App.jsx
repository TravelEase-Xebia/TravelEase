import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Signup from "./pages/Signup"; // If you have a signup page
import Payment from "./pages/Payment";
import FlightSearch from "./pages/FlightSearch";
import Landing from "./pages/Landing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/payment" element={<Payment />} />
         <Route path="/flightsearch" element={<FlightSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
