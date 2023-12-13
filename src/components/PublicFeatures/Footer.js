import React from "react";

import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
      <div style={{marginTop:'90px'}}>
        <p style={{color: "gray", textAlign: "center", marginTop: "50px"}}>
          20 W 37th Street, New York, NY 10018 | {''}

          <a href="https://www.tcelect.net" style={{color: "gray"}} target="_blank" rel="noreferrer">www.tcelect.net</a> | 

          tcig@tcelect.net
          <a href={`mailto:tcig@tcelect.net`}>
              <EmailIcon style={{ marginLeft: '5px', marginBottom: "1px", cursor: 'pointer', color: "gray"}} />
          </a>
        </p>       
      </div>
  );
};

export default Footer;