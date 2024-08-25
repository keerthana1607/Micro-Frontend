
// import edicon2 from './asset/edicon2.jpg';
// import edicon3 from './asset/edicon3.jpg';
// import edicon4 from './asset/edicon4.jpg';


import React from 'react';
import './Programs.css';
import tax1 from '../assets/tax1.jpg';
import tax2 from '../assets/tax2.jpg';
import tax3 from '../assets/tax3.jpg';


const Programs = () => {
    return (
        <div>
            <h1>
                Our Mission
            </h1>
       <div className="programs" >
        <div className="program">
            <img src={tax1} />
            <div className="caption">
                <p>Pay your Tax</p>
            </div>
        </div>
        <div className="program">
            <img src={tax2} />
            <div className="caption">
                <p>E-Tax</p>
            </div>
        </div>
        <div className="program">
            <img src={tax3} />
            <div className="caption">
                <p>Numbers Don't Lie</p>
            </div>
        </div>
       </div>
       </div>
       
           

    );
};

export default Programs;
