import {  IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC<any> = ({setLoggedIn}) => {

  function logOutHandler() {
    localStorage.clear();
    setLoggedIn(false);
  }
 console.log("home rerenders");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Homee </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-top">
      <IonButton fill="clear" routerLink="/profile">Go To Profile Page</IonButton>
      <IonButton onClick={logOutHandler}>LogOut</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
