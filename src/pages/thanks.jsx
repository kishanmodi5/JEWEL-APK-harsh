import React, { useEffect, useState } from 'react';
import { IonContent, IonImg, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonTabButton,IonBackButton } from '@ionic/react';
import { IonButtons, IonButton, IonModal, IonHeader, IonPage } from '@ionic/react';


const Thanks = () => {

    return (
        <>

        <IonPage style={{justifyContent: 'flex-start'}}>
        <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Page Two</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonRow>
                <IonCol>
                <div style={{textAlign:'center'}}>
                    {/* <img
                        src="/img/thnaks.jpg"
                        style={{
                            maxWidth: "385px",
                            width: "100%",
                            padding: "40px 0px 25px 0px",
                        }}
                    /> */}
                    <IonImg
                        src='src/img/thnaks.jpg'
                        style={{ maxWidth: "260px", width: "100%", margin:'auto' }}
                    />
                    <h4>Thank you for </h4>
                    <p style={{fontSize:'12px', maxWidth:'350px', margin:'auto'}}>
                        Requesting a quotation for our jewelry. We appreciate your interest
                        in our products. Our team will review your request and respond
                        within 24 working hours. If you have any further questions, please
                        feel free to reach out.
                    </p>
                    <ion-router-link href='/' className="badge button --shutter --up d-block"
                        style={{ width: "fit-content", margin: "auto" , padding:'10px', color:'#fff',background:'#4c3226', display:'block',marginTop:"20px" }}>
                        Return to Homepage
                    </ion-router-link>
            </div>
                </IonCol>
            </IonRow>
        </IonPage>
        </>
    );
};

export default Thanks;