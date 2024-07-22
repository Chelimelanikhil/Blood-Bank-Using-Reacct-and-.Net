import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Home() {
    return (
      <div>
       <Navbar />
        <section id="section-jumbotron" className="jumbotron jumbotron-fluid d-flex justify-content-center align-items-center xyz">
          <div className="container text-center">
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br />
            
            
          </div>
        </section>
  
        <div className="jumbotron">
          <p className="lead text-center">“Opportunities knock the door sometimes, so don’t let it go and donate blood.”
          </p>
          <p className="text-center">- Nikhil</p>
        </div>
  
        <Footer />
      </div>
    );
  }
  
  export default Home;