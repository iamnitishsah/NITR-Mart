"use client";
import Login from "./auth/login/page";
import Footer from "./components/footer/page";
import Navbar from "./components/navbar/page";
// import Dashboard from "./pages/dashboard/page";

const Home = () => {
 

  return (
   <div>
    <Navbar/>
    {/* <Dashboard/> */}
    <Login/>
    <Footer/>
   </div>
  );
};

export default Home;
