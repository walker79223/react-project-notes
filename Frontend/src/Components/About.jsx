import axios from 'axios';
import React, { useState, useEffect } from 'react';

const About = () => {
  const hasToken = localStorage.getItem('token') !== null;
  const [name, setName] = useState("");

  useEffect(() => {
    if (hasToken) {
      const url = `http://localhost:7000/api/profile`;
      const token = `Bearer ${localStorage.getItem("token")}`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
      };

      axios.get(url, { headers })
        .then(function (response) {
          if (response.data.success) {
            setName(`Hello, ${response.data.userFetched} !!`);
          } else {
            console.log("Nhi hua");
          }
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
    }
  }, [hasToken]); // Add hasToken as a dependency to the useEffect

  return (
    <div className='container'>
      <h2>About Page</h2>
      {hasToken && <h4 className='my-5'>{name}</h4>}
    </div>
  );
};

export default About;
