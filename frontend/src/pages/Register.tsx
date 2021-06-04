import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Register: React.FC = () => {
  const [name, setname] = useState("");
  const [age, setage] = useState<string>();
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("");
  const [password, setpassword] = useState("");
  const [showToast, setshowToast] = useState(false);
  const [toastMessage, settoastmessage] = useState("");
  const [toastType, settoastType] = useState("");
  let history = useHistory();

  const RegisterHandler = () => {
    if (name == "" || email == "" || password == "" || confirmpassword == "") {
      settoastType("danger");
      settoastmessage("All fields are mandatory");
      setshowToast(true);
      return;
    }
    if (password != confirmpassword) {
      settoastType("danger");
      settoastmessage("password should be matched");
      setshowToast(true);
      return;
    }

    let resStatus = 0;
    fetch("http://192.168.43.228:5000/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, age, gender })
    }).then(res => { resStatus = res.status; return res.json() })
      .then(res => {
        if (resStatus == 200) {
          settoastType("success");
          settoastmessage(res.message);
          setshowToast(true);
          history.push("/login");
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
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-top">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput value={name} onIonChange={(e) => setname(e.detail.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput value={email} onIonChange={(e) => setemail(e.detail.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Age</IonLabel>
          <IonInput value={age} onIonChange={(e) => setage(e.detail.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Gender</IonLabel>
          <IonSelect value={gender} placeholder="Select One" onIonChange={e => setgender(e.detail.value)}>
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="male">Male</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setpassword(e.detail.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Confirm Password</IonLabel>
          <IonInput type="password" value={confirmpassword} onIonChange={(e) => setconfirmpassword(e.detail.value)}></IonInput>
        </IonItem>
        <IonButton size="default" expand="block" onClick={RegisterHandler} color="primary">Register</IonButton>
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

export default Register;
