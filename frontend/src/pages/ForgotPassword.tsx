import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonSpinner, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

const ForgotPassword: React.FC = () => {
  console.log("Rerend frogotpassword");
  const [token, settoken] = useState("")
  const [email, setemail] = useState("")
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [showToast, setshowToast] = useState(false);
  const [toastMessage, settoastmessage] = useState("");
  const [toastType, settoastType] = useState("");

  const [emailSending, setemailSending] = useState(false);
  const [emailSent, setemailSent] = useState(false);
  const [passwordChanged, setpasswordChanged] = useState(false);
  let history = useHistory();

  function resetfields() {
    setemailSent(false);
    setemailSending(false);
    setpasswordChanged(false);
    settoken("");
    setnewpassword("");
    setconfirmpassword("");
    setemail("");
  }

  // useIonViewWillEnter(() => {
  //   resetfields();
  // });

  let component;
  function renderComponent() {

    if (!emailSending && !emailSent) {
      console.log("sd");
      component = sendToken();
    }

    else if (passwordChanged)
      component = passwordChangedSuccessfully();
    else if (emailSent)
      component = resetpassword();

  }
  renderComponent();

  function sendTokenHandler() {
    if (email == "") {
      settoastType("danger");
      settoastmessage("Email should not be empty");
      setshowToast(true);
      return;
    }
    let resStatus = 0;
    setemailSending(true);
    fetch("http://192.168.43.228:5000/sendForgotPasswordToken", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }).then(res => { resStatus = res.status; return res.json() })
      .then(res => {
        if (resStatus == 200) {
          settoastType("success");
          settoastmessage(res.message);
          setshowToast(true);
          setemailSent(true);
          setemailSending(false);
        }
        else {
          settoastType("danger");
          settoastmessage(res.error);
          setshowToast(true);
          setemailSending(false);
        }
      });
  }

  function sendToken() {
    return (<div>
      <IonItem>
        <IonLabel position="stacked">Email</IonLabel>
        <IonInput value={email} onIonChange={(e) => setemail(e.detail.value)}></IonInput>
      </IonItem>
      <IonButton size="default" expand="block" onClick={sendTokenHandler} color="primary">Send Reset Token</IonButton>
    </div>
    )
  }

  function resetPasswordHandler() {
    if (token == "" || newpassword == "") {
      settoastType("danger");
      settoastmessage("All fields are mandatory");
      setshowToast(true);
      return;
    }
    if (newpassword !== confirmpassword) {
      settoastType("danger");
      settoastmessage("Passwords Should be Matched");
      setshowToast(true);
      return;
    }

    let resStatus = 0;
    fetch("http://192.168.43.228:5000/verifyForgotPasswordDetails", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, password: newpassword })
    }).then(res => { resStatus = res.status; return res.json() })
      .then(res => {
        if (resStatus == 200) {
          settoastType("success");
          settoastmessage(res.message);
          setshowToast(true);
          setpasswordChanged(true);
        }
        else {
          settoastType("danger");
          settoastmessage(res.error);
          setshowToast(true);
        }
      });
  }

  

  function passwordChangedSuccessfully() {
    return (
      <div>
        <div className="text-primary h3">
          Password Changed Successfully
        </div>
        <IonButton routerLink="/login" fill="clear">Go to Login Page</IonButton>
      </div>
    )
  }

  function resetpassword() {
    return (<div>
      <IonItem>
        <IonLabel position="stacked">Token</IonLabel>
        <IonInput value={token} onIonChange={(e) => settoken(e.detail.value)}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">New Password</IonLabel>
        <IonInput value={newpassword} onIonChange={(e) => setnewpassword(e.detail.value)}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Confrim Password</IonLabel>
        <IonInput value={confirmpassword} onIonChange={(e) => setconfirmpassword(e.detail.value)}></IonInput>
      </IonItem>
      <IonButton size="default" expand="block" onClick={resetPasswordHandler} color="primary">Set Password</IonButton>
    
    </div>)
  }


  // function spinner() {
  //   return <IonSpinner name="crescent" />
  // }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-top">


        {component}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setshowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastType}
        />
          <IonLoading isOpen={emailSending} />
      </IonContent>

    </IonPage>
  );
};

export default ForgotPassword;