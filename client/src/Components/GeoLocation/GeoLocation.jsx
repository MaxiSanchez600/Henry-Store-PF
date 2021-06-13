import React, { useEffect, useState} from "react";
import publicIP from 'react-native-public-ip';
/* var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(pos) {
  var crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default class GeoLocation extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }

  render() {
    return (
      <div>
          <div className="contain_Ubication">
            <div className="Ubication_body"><span class="iconify" data-icon="logos:google-maps" data-inline="false"></span>Ingresa tu ubicacion</div>
        </div>
      </div>
    );
  }
} */


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