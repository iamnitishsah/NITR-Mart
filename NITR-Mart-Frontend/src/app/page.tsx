"use client";
import Footer from "./components/footer/page";
import Navbar from "./components/navbar/page";
import WelcomePage from "./pages/welcome/page";


const Home = () => {
 

  return (
   <div>
    <Navbar/>
    <WelcomePage/>
    <Footer/>
   </div>
  );
};

export default Home;
