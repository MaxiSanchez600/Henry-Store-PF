import React from "react";
import { SuspenseWithPerf, useAuth } from "reactfire";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const SignInForms = () => {
  const auth = useAuth;
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
     
      // FUNCION LUEGO DE QUE SE COMPLETO EL INICIO DE SESION
      signInSuccessWithAuthResult: (e) => {
        console.log(e);
       
      },
    },
  };
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
};

const AuthGithub = () => {
    
  return (
    <SuspenseWithPerf
      traceId={"firebase-user-wait"}
      fallback={<p>loading...</p>}
    >
      <SignInForms />
    </SuspenseWithPerf>
  );
};

export default AuthGithub;

