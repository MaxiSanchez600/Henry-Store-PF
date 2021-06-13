import React, { useEffect, useState} from "react";
import publicIP from 'react-native-public-ip';

const GeoLocation = () =>{
  const [locationData,setLocationData]=useState({})
  useEffect(async ()=>{
    let res;
    const ACCESS_KEY = '2de9ef829bf711637520426c8af36cbc';
    const publicIpAddress = await publicIP();
    const url = `http://api.ipstack.com/${publicIpAddress}?access_key=${ACCESS_KEY}&format=1`;
    res = await fetch(url)
    res = await res.json();
    setLocationData(res)
  },[])
  return (
    <div className="contain_Ubication">
      <p>{locationData.city}/{locationData.country_code}</p>
    </div>
  )
}

export default GeoLocation; 