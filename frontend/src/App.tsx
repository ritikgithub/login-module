import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [user, setuser] = useState({});
  let resStatus = 0;
  useEffect(() => {
    fetch("http://192.168.43.228:5000/isAuthenticated", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => { resStatus = res.status; return res.json() })
      .then(res => {
        if (resStatus == 200) {
          setLoggedIn(true);
          setuser(res.user);
        }
      });
  }, [])
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          
          <Route exact path="/" render={(props)=> LoggedIn ? <Home {...props} setLoggedIn={setLoggedIn} />  : <Redirect to="/login" /> } />
         
          <Route exact path="/login" render={(props) => LoggedIn ? <Redirect to="/" /> : <Login {...props} setLoggedIn={setLoggedIn} setuser={setuser} /> } />
          {/* <Route exact path="/profile">
            {LoggedIn ? <Profile user={user} setuser={setuser} /> : <Redirect to="/" />}
          </Route> */}
          <Route exact path="/profile" render={(props) => LoggedIn ? <Profile {...props} user={user} setuser={setuser} /> : <Redirect to="/" /> } />
          <Route exact path="/editProfile" render={(props) => LoggedIn ? <EditProfile {...props} user={user} setuser={setuser} /> : <Redirect to="/" /> } />
         
          <Route exact path="/register">
            {LoggedIn ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/forgotpassword" render={(props)=> LoggedIn ? <Redirect to ="/" /> : <ForgotPassword />} />
        
        </IonRouterOutlet>
      </IonReactRouter>

    </IonApp>
  );
}

export default App;
