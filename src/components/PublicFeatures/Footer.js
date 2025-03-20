import React from "react";

import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
      <div>
        <p style={{color: "gray", textAlign: "center", marginTop: "2vw"}}>
          <a href="https://www.google.com/maps/place/20+W+37th+St,+New+York,+NY+10018/@40.7506567,-73.9870869,17z/data=!3m1!4b1!4m6!3m5!1s0x89c259aa21f3c0dd:0xaaf057da219fbb4e!8m2!3d40.7506527!4d-73.984512!16s%2Fg%2F11b8v67m9d?entry=ttu"  
            style={{color: "gray", textDecoration: "none"}}
            target="_blank" rel="noreferrer"> 
            1010 Northern Boulevard Suite 200, Great Neck, NY 11021 |
          </a> &nbsp;

          <a href="https://www.tcelect.net" style={{color: "gray"}} target="_blank" rel="noreferrer">www.tcelect.net</a> | &nbsp; 

          
          <a href={`mailto:tcig@tcelect.net`} style={{color: "gray", textDecoration: "none"}}>
            tcig@tcelect.net
            <EmailIcon style={{ marginLeft: '.5vw', marginBottom: ".1vw", cursor: 'pointer', color: "gray"}} />
          </a>
        </p>       
      </div>
  );
};

export default Footer;