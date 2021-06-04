import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import React from 'react'
import { createOutline } from 'ionicons/icons';

const Profile: React.FC<any> = ({ user, setuser }) => {
    console.log("Rerenders");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="text-center mt-3">
                    <img src={`http://192.168.43.228:5000/${user.avatar}`} alt="" style={{ height: "200px", width: "200px", borderRadius: "50%" }}></img>
                    <div className="h4 mt-3 text-primary">{user.name}</div>
                    {user.age && <div className="h4 mt-3 text-primary">{`${user.age} years old`}</div> }
                    <div className="h4 mt-3 text-primary">{user.gender}</div>
                </div>
              
              

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink="/editProfile">
                        <IonIcon icon={createOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
}

export default Profile
