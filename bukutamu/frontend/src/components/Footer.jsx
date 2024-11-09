import React from 'react';

const Footer = () => { // Use const instead of function
  return (
    <footer className="main-footer"> 
      <strong>
        Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block"> {/* Changed class to className */}
        <b>Version</b> 3.2.0-rc
      </div>
    </footer>
  );
}

export default Footer;
