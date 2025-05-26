// import React, { useContext } from 'react'
// import { MdCastForEducation } from 'react-icons/md'
// import { Link } from 'react-router-dom'
// import { AuthContext } from '../../../providers/AuthProvider';

// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const handleLogOut = () => {
//         logOut()
//             .then(() => { })
//             .catch(error => console.log(error));
//     }
//     const navOptions = <>
//          <li><Link to="/">Home</Link></li>
//           <li><Link to="/classes">Classes</Link></li>
//           <li><Link to='/dashboard/'>Dashboard</Link></li>
//           <div className="avatar">
//             <div className="ring-primary ring-offset-base-100 w-6 rounded-2xl ring-2 ring-offset-2">
//                 <img src={user.photoURL} />
//             </div>
//             </div>
//             <li tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52">

//                     <li><Link to='/dashboard/'>Dashboard</Link></li>
//                 </li>
                
        
//      </>
//   return (
//     <>
//       {/* <div className="navbar bg-black text-white  "> */}
//       <div className="navbar bg-transparent text-white fixed top-0 left-0 z-50 w-full">

//         <div className="navbar-start">
//             <div className="dropdown">
//                 <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//                 </label>
//                 {/* <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"> */}
//                 <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52">

//                     {navOptions}
//                 </ul>
//             </div>
//             <Link to="/" className="btn btn-ghost normal-case text-xl bg-green-500"><MdCastForEducation /> EduManage</Link>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//             <ul className="menu menu-horizontal px-1 bg-white text-black rounded-md">
//                 {navOptions}
//             </ul>
//         </div>
//         <div className="navbar-end">

//             {
//                 user?<>
//                 <button onClick={handleLogOut} className="btn bg-green-500 text-white" >Logout </button>
//                 </>:<>

//                 <Link to="/login" className="btn bg-green-500 text-white">Login</Link>
//                 </>
//             }
            
//         </div>
//     </div>
//     </>
//   )
// }

// export default Navbar

import React, { useContext, useState } from 'react';
import { MdCastForEducation } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
    setDropdownOpen(false);
  };

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/classes">Classes</Link></li>
      {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
    </>
  );

  return (
    <div className="navbar bg-transparent text-white fixed top-0 left-0 z-50 w-full">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl bg-green-500">
          <MdCastForEducation /> EduManage
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 bg-white text-black rounded-md">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end relative">
        {user ? (
          <>
            {/* Avatar dropdown */}
            <div className="relative">
              <div className="avatar cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </div>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 p-2 shadow menu dropdown-content bg-white text-black rounded-box w-52 z-50">
                  <li><Link to="/dashboard/profile" onClick={() => setDropdownOpen(false)}>Profile</Link></li>
                  <li><Link to="/dashboard" onClick={() => setDropdownOpen(false)}>Dashboard</Link></li>
                  <li><button onClick={handleLogOut}>Logout</button></li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="btn bg-green-500 text-white">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

