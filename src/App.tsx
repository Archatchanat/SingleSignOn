import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'



function App() {
  const clientID = "583832811490-8ca800aikar3klforu2q71crihttc7kn.apps.googleusercontent.com"

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientID: clientID,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log('success', res)
  }

  const onFailure = (res) => {
    console.log('failed', res)
  }

  const logOut = () => {
    setProfile(null);
  }

  return (
    <>
      
      <div>
      <h2>React Google Login</h2>
      <br /><br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt='User_image' />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br /><br />
          <GoogleLogout clientId={clientID} buttonText='Log out' onLogoutSuccess={logOut}/>

        </div>
      ): (
        <GoogleLogin
          clientId={clientID}
          buttonText='Sign in with Google'
          onSuccess={onSuccess}
          onFailure={onFailure} 
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
      </div>
      

        
    </>
  )
}

export default App
