import React, { useEffect, useState} from "react";
import publicIP from 'react-native-public-ip';
import ReactCountryFlag from "react-country-flag"

const GeoLocation = () =>{
  const [locationData,setLocationData]=useState({})
  useEffect(()=>{
    const getLocation = async()=>{
      let res;
      const publicIpAddress = await publicIP();
      const url = `https://ipapi.co/${publicIpAddress}/json/`;
      res = await fetch(url)
      res = await res.json();
      setLocationData(res)
    }
    getLocation()
  },[])
  return (
    <div className="contain_Ubication">
      <div>{locationData.city}/{locationData.country}
        <div className='flagIcon'>
          <ReactCountryFlag 
            countryCode={locationData.country} 
            svg 
            style={{
              width: '2em',
              height: '2em',
            }}  
          />
          
        </div>  
        <span>{locationData.currency}</span>
        </div>
      
    </div>
  )
}

export default GeoLocation; 