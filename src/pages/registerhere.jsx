import React, { useRef } from 'react';
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
} from '@ionic/react';
import { IonInput } from '@ionic/react';
import { IonInputPasswordToggle } from '@ionic/react';

function Login() {
    return (
        <>
            <IonPage>
                <div className='main-bg' style={{ width: '100%', height: '100%' }}>
                    <div style={{ width: '100%', height: '30px', background: '#4c3226', position: 'absolute', left: ' 0', top: '0' }}></div>
                    <img
                        className='freemlogin1'
                        src="src/img/freemlogin.png"
                    ></img>
                    <div className='user-img'>
                        <IonImg
                            className='freemlogin2'
                            src="src/img/userlogo.svg"
                        ></IonImg>
                        <div class="cell smaldesignleft">
                            <div class="circle fade-in-left">
                                <img
                                    src="src/img/leftdesign.svg"
                                ></img>
                            </div>
                        </div>
                        <div class="cell smaldesignright">
                            <div class="circle fade-in-left">
                                <img
                                    src="src/img/rightdesign.svg"
                                ></img>
                            </div>
                        </div>

                    </div>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <div className='foem-details' color='secondary' style={{ marginTop: '27%' }}>

                                    <div style={{ display: 'flex' }}>
                                        <IonInput
                                            placeholder="Enter your First Name"
                                            color='secondary'
                                            style={{ background: '#FFDEB3', color: '#000' }}
                                            slot="start"
                                        >
                                            <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="person"></ion-icon>
                                        </IonInput>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <IonInput
                                            placeholder="Enter your Email"
                                            color='secondary'
                                            style={{ background: '#FFDEB3', color: '#000' }}
                                            slot="start"
                                        >
                                            <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="mail"></ion-icon>
                                        </IonInput>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <IonInput
                                            placeholder="Enter your Number"
                                            color='secondary'
                                            type='tel'
                                            style={{ background: '#FFDEB3', color: '#000' }}
                                            slot="start"
                                        >
                                            <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="call"></ion-icon>
                                        </IonInput>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <IonInput
                                            placeholder="Enter your Business Name"
                                            color='secondary'
                                            style={{ background: '#FFDEB3', color: '#000' }}
                                            slot="start"
                                        >
                                            <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="business"></ion-icon>
                                        </IonInput>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <IonInput
                                            placeholder="Enter your Refrence Name"
                                            color='secondary'
                                            style={{ background: '#FFDEB3', color: '#000' }}
                                            slot="start"
                                        >
                                            <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="person-add"></ion-icon>
                                        </IonInput>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <IonInput
                                            type="password"
                                            color='secondary'
                                            placeholder=".........."
                                            fill="clear"
                                            style={{ background: '#FFDEB3', color: '#000' }}
                                            slot="start"
                                        >
                                            <IonInputPasswordToggle style={{ padding: '0' }} slot="start" fill='clear' color='secondary'></IonInputPasswordToggle>
                                        </IonInput>

                                    </div>
                                </div>
                                <div style={{ width: '100%', display: 'flex', margin: 'auto', flexDirection: 'column', textAlign: 'center', fontSize: '14px' }}>
                                    <IonButton color='secondary' type='submit' expand="full" style={{ marginTop: '20px', textTransform: 'capitalize' }}>Login</IonButton>
                                    <p>Don’t Have An Account? Login </p>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </div>
            </IonPage>
        </>
    );
}

export default Login;