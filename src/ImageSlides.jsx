




import { useEffect, useRef, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from "react-router-dom";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AddIcon from '@mui/icons-material/Add';  
import CalculateIcon from '@mui/icons-material/Calculate'; 
import AssignmentIcon from '@mui/icons-material/Assignment'; 

import './ImageSlides.css';

const images = [
  "https://static.toiimg.com/thumb/msid-107200177,width-1070,height-580,imgsize-34166,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  "https://i.ytimg.com/vi/HKUlJ_2loxk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDTNVmgHp98af7ztF4b4-0gvVCNCQ",
  "https://www.globalgovernancenews.com/wp-content/uploads/2024/04/Govt-Denies-Reports-of-Changes-in-New-Income-Tax-Regime-Starting-April-1.jpg"
];
const delay = 2500;

export default function ImageSlides() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const win = sessionStorage.getItem("userName") || "User";

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            E-Tax Calculator
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={click ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={handleClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${click ? ' show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/userviewtax"
                  className="nav-link"
                  onClick={handleClick}
                >
                  <ViewModuleIcon /> View Tax Policy
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/addtaxreturn"
                  className="nav-link"
                  onClick={handleClick}
                >
               <AddIcon /> Add Tax Return
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/calculate"
                  className="nav-link"
                  onClick={handleClick}
                >
                  <CalculateIcon />  Calculated Tax
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/usertaxcheck"
                  className="nav-link"
                  onClick={handleClick}
                >
                    <AssignmentIcon /> Forms Status
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  <ArrowLeftIcon /> Sign Out
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/userprofile"
                  className="nav-link"
                  onClick={handleClick}
                >
                  Hi {win} <AccountCircleIcon />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br /><br />
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {images.map((image, index) => (
            <div
              className="slide"
              key={index}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>

        <div className="slideshowDots">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => setIndex(idx)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
