import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraResultType } from '@capacitor/camera';
import { useHistory } from 'react-router';


const EditProfile: React.FC<any> = ({ user, setuser }) => {
    const [imgFile, setimgFile] = useState<Blob>();
    const [previewImgUrl, setpreviewImgUrl] = useState(`http://192.168.43.228:5000/${user.avatar}`);
    const [name, setname] = useState(user.name);
    const [age, setage] = useState(user.age);
    const [gender, setgender] = useState(user.gender);
    const [showToast, setshowToast] = useState(false);
    const [toastMessage, settoastmessage] = useState("");
    const [toastType, settoastType] = useState("");
    let history = useHistory();
    let inputref = useRef<any>();
    console.log("edit rerenders");
    async function camerahandler() {
        let photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri
        });
        let res = await fetch(photo.webPath);
        let imgFile = await res.blob();
        setimgFile(imgFile);
        setpreviewImgUrl(photo.webPath);
    }

    function updateHandler() {
        let formData = new FormData();
        if (name == "") {
            settoastType("danger");
            settoastmessage("Name should not be empty!");
            setshowToast(true);
            return;
        }
        formData.append('imgFile', imgFile);
        formData.append('name', name);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('userId', user._id);
        let resStatus = 0;
        fetch("http://192.168.43.228:5000/updateProfile", {
            method: 'POST',

            body: formData
        }).then(res => { resStatus = res.status; return res.json() })
            .then(res => {
                if (resStatus == 200) {
                    setuser(res.user);
                    settoastType("success");
                    settoastmessage(res.message);
                    setshowToast(true);
                    history.push('/profile');
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
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Edit Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="text-center mt-3">
                    <img onClick={camerahandler} src={previewImgUrl} alt="" style={{ height: "200px", width: "200px", borderRadius: "50%" }} />
                    <IonItem className="mt-3">
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput value={name} onIonChange={(e) => setname(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem className="mt-3">
                        <IonLabel position="stacked">Age</IonLabel>
                        <IonInput value={age} onIonChange={(e) => setage(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem className="mt-3">
                        <IonLabel position="stacked">Gender</IonLabel>
                        <IonSelect value={gender} placeholder="Select One" onIonChange={e => setgender(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                        </IonSelect>
                    </IonItem>

        



                    <IonButton size="default" expand="block" onClick={updateHandler} color="primary">Update</IonButton>



                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setshowToast(false)}
                        message={toastMessage}
                        duration={2000}
                        color={toastType}
                    />
                </div>
            </IonContent>
        </IonPage>
    )
}

export default EditProfile
