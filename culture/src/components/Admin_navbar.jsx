import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import user from '../components/images/Admin-profil.png';
import logout from '../components/images/Admin_logout.png';
import left_arrow from '../components/images/left-arrow.png';
import right_arrow from '../components/images/right-arrow.png';


class Admin_navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideNavbarOpen: false,
      userData: ""
    };
    this.toggleSideNavbar = this.toggleSideNavbar.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData",{
      method: "POST",
      crossDomin: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-control-Allow-Orgin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

toggleSideNavbar() {
  this.setState(prevState => ({
    isSideNavbarOpen: !prevState.isSideNavbarOpen
  }), () => {
    // After state update, adjust the width and margin-left of the map container
    // const mapContainer = document.querySelector('.custom-map-container');
    // if (mapContainer) {
    //   if (this.state.isSideNavbarOpen) {
    //     mapContainer.style.width = '83%';
    //     mapContainer.style.marginLeft = '17%';
    //   } else {
    //     mapContainer.style.width = '100%';
    //     mapContainer.style.marginLeft = '0';
    //   }
    // }
  });
}



  logout=()=>{
    window.localStorage.clear();
    window.location.href="./";
  }

  

  render() {
    const { isSideNavbarOpen } = this.state;
    const topNavbarStyle = isSideNavbarOpen ? { paddingLeft: '17%' } : {};
  
    return (
      <div className=''>
        <nav className='nav1'>
  
          <div className="top-navbar p-3" style={topNavbarStyle}>
            {/* Top navbar content */}
            <div className='flex mr-10'>
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-gray-300 bg-white h-10  px-5 pr-32 rounded-lg ml-10 text-sm focus:outline-none"
              // value={searchTerm}
              // onChange={handleInputChange}
            />
            {/* <span   style={{position:"absolute", right: 10, top:8,color:"#aaa"}}>
            Total Records {data.length}
            </span> */}
            {/* <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-full"
              // onClick={handleSearch}
            ></button> */}
            <img src={user} alt="" className='ml-auto h-9  mr-2' />
              <h2 className='pt-2 pl-1'>{this.state.userData.name}</h2>
            </div>
          </div>
  
          
          <div className={`side-navbar-Admin ${isSideNavbarOpen ? '' : 'hidden'}`}>
            {/* Side navbar content */}
            <h2 className='text-white font-bold text-3xl text-center'>Admin</h2>
            <ul className='mt-7 ml-11 text-slate-300 text-base font-semibold' >
            <li className='mx-8  py-4'><Link to='./Admin' >Dashboard</Link></li>
              <li className='mx-8  py-4'><Link to='./pages' >Pages</Link></li>
              <li className='mx-8  py-2 '><Link to='./Dataset'>Dataset</Link></li>
              <li className='mx-8  py-4 '><Link to='./Search'>Search</Link></li>
            </ul>
            <div className='flex justify-end pt-16'>
              <button onClick={this.toggleSideNavbar}>
                {isSideNavbarOpen ? (
                  <img src={left_arrow} alt="" className='h-9' />
                ) : (
                  <img src={right_arrow} alt="" className='h-9' />
                )}
              </button>
            </div>
            <div className='Admin-logout flex justify-center text-white text-xs font-semibold'>
              <img src={logout} alt="" className='h-5 ' />
              <button className='p-0.5' onClick={this.logout}>Log Out</button>
            </div>
          </div>
  
        
  
          {!isSideNavbarOpen && (
            <button onClick={this.toggleSideNavbar} className="fixed left-0 top-96">
              <img src={right_arrow} alt="" className='h-9' />
            </button>
          )}
        </nav>
      </div>
    );
  }
  
  
}

export default Admin_navbar;