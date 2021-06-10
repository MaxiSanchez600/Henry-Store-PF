// import React, { Component, useContext } from "react"
// import firebase from "firebase"
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

// import React from 'react';

// const Auth = () => {

//   const [isSignedIn, setisSignedIn] = useState(false);

//   const uiConfig = {
//     signInFlow: "popup",
//     signInOptions: [
//       auth.GoogleAuthProvider.PROVIDER_ID,
//       auth.GithubAuthProvider.PROVIDER_ID
//     ],
//     callbacks: {
//       // FUNCION LUEGO DE QUE SE COMPLETO EL INICIO DE SESION
//       signInSuccessWithAuthResult: (e) => {
//         console.log(e);
//       },
//     },
//   };

//   useEffect(() => {
    
//   }, []);
  
//   componentDidMount = () => {
//     firebase.auth().onAuthStateChanged(user => {
//       setisSignedIn({ isSignedIn: !!user })
//       console.log("user", user)
//     })
//   }

//   return (
//      <div >
//         {isSignedIn ? (
//           <span>
//             <div>Signed In!</div>
//             <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
//             <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
//             <img
//               alt="profile picture"
//               src={firebase.auth().currentUser.photoURL}
//             />
//           </span>
//         ) : (
//           <StyledFirebaseAuth
//             uiConfig={uiConfig}
//             firebaseAuth={firebase.auth()}
//           />
//         )}
//       </div>
//   );
// };

// export default Auth;


// firebase.initializeApp({
//   apiKey: "AIzaSyDA9oROP8tGSZKx6uwvTTzNqJIYWUC6asE",
//   authDomain: "henry-store-ca75c.firebaseapp.com"
// })

// class Auth extends Component {
//   state = { isSignedIn: false }
//   uiConfig = {
//     signInFlow: "popup",
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     ],
//     callbacks: {
//       signInSuccess: () => false
//     }
//   }

//   componentDidMount = () => {
//     firebase.auth().onAuthStateChanged(user => {
//       this.setState({ isSignedIn: !!user })
//       console.log("user", user)
//     })
//   }

//   render() {
//     return (
//       <div >
//         {this.state.isSignedIn ? (
//           <span>
//             <div>Signed In!</div>
//             <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
//             <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
//             <img
//               alt="profile picture"
//               src={firebase.auth().currentUser.photoURL}
//             />
//           </span>
//         ) : (
//           <StyledFirebaseAuth
//             uiConfig={this.uiConfig}
//             firebaseAuth={firebase.auth()}
//           />
//         )}
//       </div>
//     )
//   }
// }

// export default Auth
