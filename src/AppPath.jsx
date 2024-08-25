import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';
import UserRegister from './UserRegister';
import AdminHome from './AdminHome';
import Pendingtax from './Admin/PendingTax';

import AddPolicy from './Admin/AddPolicy';
import AppRouter from './AppRouter';
import AdminViewPolicy from './Admin/AdminViewPolicy';
import EditTax from './Admin/EditTax'
import ApprovedTax from './Admin/ApprovedTax';

import UserTaxView from './User/UserTaxView';
import AddTaxReturn from './User/AddTaxReturn';
import CalculatedTax from './User/CalculatedTax';
import UserViewStatus from './User/UserViewStatus'
import RejectedTax from './Admin/RejectedTax';
import PaymentTax from './Admin/PaymentTax'
import Payment from './User/Payment';
import UserProfile from './User/UserProfile';
import UserEdit from './User/UserEdit';
import HeroHome from './HeroHome';
import AdminPayment from './Admin/AdminPayment';
import FAQ from './FAQ';
import Chatbot from './Chatbot';





function App() {
  // return (
  //   <div className="App">
      {/* <Router>
        <Routes>
          <Route exact path="/" element={<AppRouter />}></Route>
          <Route exact path="/user" element={<UserLogin />}></Route>
          <Route exact path="/admin" element={<AdminLogin />}></Route>
          <Route exact path="/register" element={<UserRegister/>}></Route>
          <Route exact path="/adminhome" element={<AdminHome />}></Route>
          <Route exact path="/addpolicy" element={<AddPolicy/>}></Route>
          <Route exact path="/pendingtax" element={<Pendingtax/>}></Route>
          <Route exact path="/adminViewPolicy" element={<AdminViewPolicy/>}></Route>
          <Route exact path="/editTax/:policyId" element={<EditTax/>}></Route>
          <Route exact path="/approvedRequest" element={<ApprovedTax/>}></Route>
          <Route exact path="/userhome" element={<ImageSlides/>}></Route>
          <Route exact path="/userviewtax" element={<UserTaxView/>}></Route> 
          <Route exact path="/addtaxreturn" element={<AddTaxReturn/>}></Route> */}
       

          // if(sessionStorage.getItem("userName")||sessionStorage.getItem("adminName")!=null){
        return (
            <Router>
             
              <Routes>

{/* <Route exact path="/userhome" element={<ImageSlides/>}></Route> */}
          <Route exact path="/userviewtax" element={<UserTaxView/>}></Route> 
          <Route exact path="/addtaxreturn" element={<AddTaxReturn/>}></Route>
          <Route exact path="/calculate" element={<CalculatedTax/>}></Route>
          <Route exact path="/usertaxcheck" element={<UserViewStatus />}></Route>
          <Route exact path="/rejectedform" element={<RejectedTax />}></Route>

          <Route exact path="/paymentRequest" element={<AdminPayment />}></Route>

          <Route exact path="/" element={<HeroHome />}></Route>
          <Route exact path="/user" element={<UserLogin />}></Route>
          <Route exact path="/faq" element={<FAQ />}></Route>
          <Route exact path="/admin" element={<AdminLogin />}></Route>
          <Route exact path="/register" element={<UserRegister/>}></Route>
          <Route exact path="/adminhome" element={<AdminHome />}></Route>
          <Route exact path="/addpolicy" element={<AddPolicy/>}></Route>
          <Route exact path="/pendingtax" element={<Pendingtax/>}></Route>
          <Route exact path="/adminViewPolicy" element={<AdminViewPolicy/>}></Route>
          <Route exact path="/editTax/:policyId" element={<EditTax/>}></Route>
          <Route exact path="/approvedRequest" element={<ApprovedTax/>}></Route>
          <Route exact path="/userhome" element={<AppRouter/>}></Route>
          <Route exact path="/userviewtax" element={<UserTaxView/>}></Route> 
          <Route exact path="/addtaxreturn" element={<AddTaxReturn/>}></Route>
          <Route exact path="/calculate/:userId" element={<CalculatedTax/>}></Route>
          <Route exact path="/payment" element={<PaymentTax/>}></Route>
           <Route exact path="/paymentpage/:formId" element={<Payment/>}></Route> 
          <Route exact path="/userprofile" element={<UserProfile/>}></Route>
          <Route exact path="/useredit/:userId" element={<UserEdit/>}></Route>
          <Route exact path="/Chatbot" element={<Chatbot/>}></Route>
              </Routes>
            </Router>
          )
    }
// else{
//   return (
//     <Router>
//       <Routes>
//       <Route exact path="/" element={<AppRouter />}></Route>
//           <Route exact path="/user" element={<UserLogin />}></Route>
//           <Route exact path="/admin" element={<AdminLogin />}></Route>
//           <Route exact path="/register" element={<UserRegister/>}></Route>
//         <Route path="*"  element={<Navigate to="/" />} />
//       </Routes>
//     </Router>







        
//   );
//   }
// }

export default App;