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
import { toast } from "react-toastify";

const Login = ({ handleClosep }) => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        mobileNo: "",
        password: "",
        company: "",
        refrence: ""
    });
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

       useEffect(() => {
        // Force reflow after the component loads
        setTimeout(() => {
            document.body.classList.add('force-reflow');
        }, 0);

        // Preload fonts/icons (You can also use custom fonts if needed)
        const iconLink = document.createElement('link');
        iconLink.rel = 'stylesheet';
        iconLink.href = 'https://cdn.jsdelivr.net/npm/ionicons@5.5.2/dist/css/ionicons.min.css'; // Ensure it's the right version
        document.head.appendChild(iconLink);

    }, []);


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setLoading(true);

        console.log(input)

        try {
            
                const response = await jwtAuthAxios.post("client/register", input);
                if (response.status === 200) {

                    setInput({
                        name: input.name,
                        password: input.password,
                    });
                    setIsLogin(true);
                    setToastMessage('Register Successful');
                    setShowToast(true);
                }
            
        } catch (error) {
            console.error(error?.response?.data || "Invalid ");
            setToastMessage(error.response.data)
            // setToastMessage('User not found.');
            setShowToast(true);

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    };


    return (
        <>
            <IonPage>
                <div className='main-bg' style={{ width: '100%', height: '100%', marginTop:'30px' }}>
                    <img
                        className='freem253'
                        src="/img/logoa12.png"
                    ></img>
                    {/* <div style={{ width: '100%', height: '30px', background: '#4c3226', position: 'absolute', left: ' 0', top: '50px' }}></div> */}
                    <img
                        className='freemlogin1'
                        src="/img/freemlogin.svg"
                    ></img>
                    {/* <IonImg
                        className='freem3'
                        src="src/img/bg-d.svg"
                    ></IonImg> */}
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
                   
                        <IonRow className='loginrow' >
                            <IonCol size-md='6' size-sm='8' size='12'>
                                <form className='form-details' color='secondary' onSubmit={handleSubmit}>
                                
                                        
                                            <div style={{ display: 'flex' }}>
                                                <IonInput
                                                    name="name"
                                                    placeholder="Enter Username"
                                                    color='secondary'
                                                    style={{ background: '#ffdeb300', color: '#000' }}
                                                    slot="start"
                                                    value={input.name}
                                                    onBlur={handleChange}
                                                    required
                                                    fill="clear"
                                                >
                                                    <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="person"></ion-icon>
                                                </IonInput>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <IonInput
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    color='secondary'
                                                    style={{ background: '#ffdeb300', color: '#000' }}
                                                    slot="start"
                                                    value={input.email || ''}
                                                    onBlur={handleChange}
                                                    required
                                                    fill="clear"
                                                >
                                                    <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="mail"></ion-icon>
                                                </IonInput>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <IonInput
                                                    name='mobileNo'
                                                    type="tel"
                                                    placeholder="Enter Mobile NO"
                                                    color='secondary'
                                                    style={{ background: '#ffdeb300', color: '#000' }}
                                                    slot="start"
                                                    value={input.mobileNo || ''}
                                                    onBlur={handleChange}
                                                    required
                                                    fill="clear"
                                                >
                                                    <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="call"></ion-icon>
                                                </IonInput>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <IonInput
                                                    name='company'
                                                    placeholder="Enter Business Name"
                                                    color='secondary'
                                                    style={{ background: '#ffdeb300', color: '#000' }}
                                                    slot="start"
                                                    value={input.company || ''}
                                                    onBlur={handleChange}
                                                >
                                                    <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="business"></ion-icon>
                                                </IonInput>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <IonInput
                                                    name='refrence'
                                                    placeholder="Enter Refrence Name"
                                                    color='secondary'
                                                    style={{ background: '#ffdeb300', color: '#000' }}
                                                    slot="start"
                                                    value={input.refrence || ''}
                                                    onBlur={handleChange}
                                                >
                                                    <ion-icon style={{ marginLeft: '15px', marginRight: '27px' }} color='secondary' slot="start" name="person-add"></ion-icon>
                                                </IonInput>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <IonInput
                                                    name='password'
                                                    type="password"
                                                    color='secondary'
                                                    placeholder="Enter Password"
                                                    fill="clear"
                                                    style={{ background: '#ffdeb300', color: '#000' }}
                                                    slot="start"
                                                    value={input.password}
                                                    onBlur={handleChange}
                                                    required
                                                >
                                                    <IonInputPasswordToggle style={{ padding: '0' }} slot="start" fill='clear' color='secondary'></IonInputPasswordToggle>
                                                </IonInput>
                                            </div>

                                            <IonButton color='secondary' type='submit' expand="full" style={{ marginTop: '20px', width: '95%', textTransform: 'capitalize' }}>Register</IonButton>
                                  
                                
                                </form>
                                <div style={{ width: '100%', display: 'flex', margin: 'auto', flexDirection: 'column', textAlign: 'center', fontSize: '14px' }}>
                                    
                                        {/* <div style={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
                                            Don't have an account ? {" "}
                                            <span onClick={() => setIsLogin(false)} style={{ cursor: "pointer", color: '#bc7700', marginLeft: '5px' }}>
                                                Register here
                                            </span>
                                        </div> */}
                                  
                                        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
                                            Already have an account?{" "}
                                            <span onClick={() => window.location.href='/login'} style={{ cursor: "pointer", color: '#bc7700', marginLeft: '5px' }}>
                                                Login here
                                            </span>
                                        </div>
                           
                                </div>
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

export default Login;