import React, { useEffect } from 'react'
import NavbarUser from './Home/NavbarUser';
import Main from './Home/Main';
import Programs from './Home/Programs';
import Contact from './Home/Contact';
import Footer from './Home/Footer';





const AppRouter = () => {

  

  return (
    
    <div>
      <NavbarUser />
      <Main />
    
        
        <Programs />
       
        <Contact />
       
        <Footer />

      </div>
    
    
  );
};


export default AppRouter;
