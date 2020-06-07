import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      style={{background:"white"}}
      src="/images/logos/sociologo.png"
      {...props}
    />
  );
}

export default Logo;