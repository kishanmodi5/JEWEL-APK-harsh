import React from 'react';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

const PageOne: React.FC = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page One</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <p>This is the content for page 1.</p>
                <IonButton routerLink="/page-two">Go to Page 2</IonButton>
            </IonContent>
        </>
    );
};

const PageTwo: React.FC = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Page Two</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <p>This is the content for page 2.</p>
            </IonContent>
        </>
    );
};

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/" component={PageOne} />
                <Route path="/page-two" component={PageTwo} />
                <Redirect exact from="*" to="/" />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;

