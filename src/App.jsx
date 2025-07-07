import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Helmet } from "react-helmet";
import Signup from "./pages/Signup"; // If you have a signup page
import Payment from "./pages/Payment";
import FlightSearch from "./pages/FlightSearch";
function App() {
  return (
    <>
    <Helmet>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Helmet>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/payment" element={<Payment />} />
         <Route path="/flightsearch" element={<FlightSearch />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
