import React, { useEffect, useRef, useState } from 'react';
import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonToast
} from '@ionic/react';
import { IonInput } from '@ionic/react';
import { IonInputPasswordToggle } from '@ionic/react';
import jwtAuthAxios, { setAuthToken } from "../service/jwtAuth";
import { useHistory } from "react-router-dom";


const Forgets = () => {
    const history = useHistory();
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await jwtAuthAxios.post("client/forgot-passwords", {
                email: forgotPasswordEmail,
            });
            if (response.status === 200) {
                setForgotPasswordEmail("");
                setToastMessage(response?.data?.message);
                setShowToast(true);
                history.push("/login");
            }
        } catch (error) {
            console.error(error?.response?.data || "This User email is not register");
            setToastMessage(error?.response?.data);
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <IonPage>
                <div className='main-bg' style={{ width: '100%', height: '100%' }}>
                    <img
                        className='freem253'
                        src="/img/logoa12.png"
                    ></img>
                    <div style={{ width: '100%', height: '30px', background: '#4c3226', position: 'absolute', left: ' 0', top: '0' }}></div>
                    <img
                        className='freemlogin1'
                        src="/img/freemlogin.svg"
                    ></img>
                    <div className='user-img'>
                        <IonImg
                            className='freemlogin2'
                            src="/img/userlogo.svg"
                        ></IonImg>
                        <div class="cell smaldesignleft">
                            <div class="circle fade-in-left">
                                <img
                                    src="/img/leftdesign.svg"
                                ></img>
                            </div>
                        </div>
                        <div class="cell smaldesignright">
                            <div class="circle fade-in-left">
                                <img
                                    src="/img/rightdesign.svg"
                                ></img>
                            </div>
                        </div>

                    </div>
                    <IonGrid>
                        <IonRow className='loginrow'>
                            <IonCol size-md='6' size-sm='8' size='12'>
                                <form onSubmit={handleForgotPassword}>
                                    <div style={{ display: 'flex' }}>
                                        <IonInput
                                            name="email"
                                            type="email"
                                            placeholder="Enter Email"
                                            color='secondary'
                                            style={{ background: '#ffdeb300', color: '#000' }}
                                            slot="start"
                                            value={forgotPasswordEmail}
                                            onBlur={(e) => setForgotPasswordEmail(e.target.value)}
                                            required
                                            fill="clear"
                                            autocomplete="email" 
                                        >
                                            <ion-icon style={{ marginLeft: '15px', marginRight: '27px',  }} color='secondary' slot="start" name="mail"></ion-icon>
                                        </IonInput>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                                        <IonButton
                                            color='secondary'
                                            type='submit'
                                            expand="full"
                                            style={{ width: '100%', textTransform: 'uppercase', fontSize: '13px' }}
                                        // disabled={loading}
                                        >
                                            {loading ? "Sending Link..." : "Forgot Password"}
                                        </IonButton>
                                        <IonButton
                                           onClick={() => history.push('/login')}
                                            color='secondary'
                                            type='submit'
                                            expand="full"
                                            style={{ width: '100%', textTransform: 'uppercase' }}
                                            
                                        >
                                            Back
                                        </IonButton>
                                        
                                    </div>

                                </form>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonPage>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={2000}
            />
        </>
    );
}

export default Forgets;