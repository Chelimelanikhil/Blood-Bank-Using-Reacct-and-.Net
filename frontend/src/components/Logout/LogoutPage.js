import React from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

function LogoutPage() {
  return (
    <>
     
      {/* Assuming the above link is for your custom styles */}

      {/* Navbar Component */}
<Navbar />

      {/* Main Content */}
      <div className="container">
        {/* Middle Content Start */}
        <div className="vd_content-wrapper" style={{ minHeight: '8px' }}>
          <div className="vd_container" style={{ minHeight: '8px' }}>
            <div className="vd_content clearfix">
              <div className="vd_content-section clearfix">
                <div className="vd_register-page">
                  <div className="heading clearfix">
                    <div className="logo">
                      <h2><img src= {"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Human-gnome-logout.svg/1200px-Human-gnome-logout.svg.png"} alt="logo"  style={{height:'300px', marginLeft:'400px', marginTop:'80px'}}/></h2>
                      {/* Assuming you have imported your logo image */}
                    </div>
                  </div>
                  <div className="panel widget">
                    <div className="panel-body">
                      <div className="login-icon"> <i className="fa fa-sign-out"></i> </div>
                      <h1 className="font-semibold text-center" style={{ fontSize: '52px' }}>You Have Been Logged Out</h1>
                      <form className="form-horizontal" action="#" role="form">
                        <div className="form-group">
                          <div className="col-md-12">
                            <h4 className="text-center mgbt-xs-20">Thank you for using our website</h4>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Middle Content End */}
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
}

export default LogoutPage;
