import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import user from '../components/images/user.png';
import logout from '../components/images/logout.png';
import left_arrow from '../components/images/left-arrow.png';
import right_arrow from '../components/images/right-arrow.png';


class Navebar1 extends Component {
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
    const mapContainer = document.querySelector('.custom-map-container');
    if (mapContainer) {
      if (this.state.isSideNavbarOpen) {
        mapContainer.style.width = '83%';
        mapContainer.style.marginLeft = '17%';
      } else {
        mapContainer.style.width = '100%';
        mapContainer.style.marginLeft = '0';
      }
    }
  });
}



  logout=()=>{
    window.localStorage.clear();
    window.location.href="./";
  }

  

  render() {
    const { isSideNavbarOpen } = this.state;

    return (
      <div className=''>
        <nav className='nav1'>
          <div className={`side-navbar ${isSideNavbarOpen ? '' : 'hidden'}`}>
            {/* Side navbar content */}
            <ul className='mt-20 text-center text-black text-base font-semibold' >
              <li className='mx-8  py-4 border-solid hover:bg-sky-950 hover:text-white rounded-2xl'><Link to='./Home1' >Home</Link></li>
              <li className='mx-8  py-4 border-solid hover:bg-sky-950 hover:text-white rounded-2xl'><Link to='./Dataset'>Dataset</Link></li>
              <li className='mx-8  py-4 border-solid hover:bg-sky-950 hover:text-white rounded-2xl'><Link to='./Search'>Search</Link></li>
              <li className='mx-8  py-4 border-solid hover:bg-sky-950 hover:text-white rounded-2xl'><Link to='./Map'>Map</Link></li>
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
            <div className='nav1-logout flex justify-center text-black text-xs font-semibold'>
              <img src={logout} alt="" className='h-5' />
              <button className='p-0.5' onClick={this.logout}>Log Out</button>
            </div>
          </div>

          <div className="top-navbar p-3">
            {/* Top navbar content */}
            <div className='flex pr-20'>
              <img src={user} alt="" className='ml-auto h-11 ' />
              <h2 className='pt-2 pl-1'>{this.state.userData.name}</h2>
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

export default Navebar1;