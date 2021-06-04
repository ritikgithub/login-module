import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

interface Login {
  setLoggedIn : Function,
  setuser: Function
}
const Login: React.FC<Login> = ({setLoggedIn, setuser})  => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showToast, setshowToast] = useState(false);
  const [toastMessage, settoastmessage] = useState("");
  const [toastType, settoastType] = useState("");
  let history = useHistory();

  const LoginHandler = () => {
    if (email == "" || password == "") {
      settoastType("danger");
      settoastmessage("All fields are mandatory");
      setshowToast(true);
      return;
    }
    let resStatus = 0;
    fetch("http://192.168.43.228:5000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => { resStatus = res.status; return res.json() })
      .then(res => {
        if (resStatus == 200) {
          settoastType("success");
          settoastmessage(res.message);
          setshowToast(true);
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setuser(res.user);
        }
        else {
          settoastType("danger");
          settoastmessage(res.error);
          setshowToast(true);
        }
      });
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-top">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput value={email} onIonChange={(e) => setemail(e.detail.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setpassword(e.detail.value)}></IonInput>
        </IonItem>
        <IonButton size="default" expand="block" onClick={LoginHandler} color="primary">Login</IonButton>
        <IonButton fill="clear" routerLink="/register">Create a New Account??</IonButton>
        <IonButton fill="clear" routerLink="/forgotpassword">Forgot Password?</IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setshowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastType}
        />
      </IonContent>

    </IonPage>
  );
};

export default Login;
