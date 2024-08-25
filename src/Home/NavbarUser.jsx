import React ,{useState,useEffect} from 'react'
import "./Navbar.css"
import logo from "../assets/logo.jpg"
import menu from '../assets/menu.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const win = sessionStorage.getItem("userName") ;

    const handleLogout = () => {
      sessionStorage.clear();
      window.location.href = '/';
    };

const Navbar = () => {

  const[sticky,setSticky]=useState(false);
useEffect(()=>{
  window.addEventListener('scroll',()=>{
    window.scrollY > 500 ? setSticky(true): setSticky(false);
})
},[])
const [mobileMenu,setMobileMenu]=useState(false);
const toggleMenu=()=>{
mobileMenu?setMobileMenu(false):setMobileMenu(true);

}

  return (

    

<nav className={sticky ? 'con dark-nav' : 'con'}>
   
        <img src={logo} className='logo' />
        <ul className={mobileMenu?'':'hide-menu'}>
            <li><a href="#main" >Home</a></li>

            <li><a href="/addtaxreturn" >Apply Tax Return Form</a></li>
            <li><a href="/usertaxcheck"  className='offset-target'>Form Status</a></li>
            <li><a href="/userviewtax"  className='offset-target'>Tax Policy</a></li>
            <li><a href="/calculate"  className='offset-target'>Calculated Tax</a></li>
            <li><a href="/userprofile" ><AccountCircleIcon />Hi {win}</a></li>
            <li><button className='btnn'><a href="/"  onClick={handleLogout}>Logout</a></button></li>
        </ul>
        <img src={menu} className='menu' onClick={toggleMenu}/>
    </nav>
  )
}


export default Navbar
