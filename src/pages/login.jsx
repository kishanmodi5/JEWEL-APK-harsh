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
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setLoading(true);

        console.log(input)

        try {
            if (isLogin) {
                const response = await jwtAuthAxios.post("client/auth", {
                    name: input.name,
                    password: input.password,
                    rememberMe: isRememberMe,
                });
                if (response.status === 200) {
                    setAuthToken(response?.data, isRememberMe);
                    localStorage.setItem("token", response?.data?.token);
                    localStorage.setItem("user", JSON.stringify(response?.data?.data));
                    jwtAuthAxios.defaults.headers.common["Authorization"] =
                        "Bearer " + response?.data?.token;
                    
                        if (isRememberMe) {
                            localStorage.setItem('rememberedUsername', input.name);
                            localStorage.setItem('rememberedPassword', input.password);
                            localStorage.setItem('rememberMeChecked', 'true');
                        } else {
                            localStorage.removeItem('rememberedUsername');
                            localStorage.removeItem('rememberedPassword');
                            localStorage.removeItem('rememberMeChecked');
                        }

                    setToastMessage(response?.data?.message);
                    setShowToast(true);
                    history.push("/home");
                    window.location.href = '/home';
                    handleClosep();

                }
            } else {
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
        console.log('sdsd')
        const { name, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    };


    useEffect(() => {
        console.log('input', input)
    }, [input])


    const handleItemClick = () => {
        history.push(
            window.location.href = '/forgets'
        );
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('rememberedUsername');
        const storedPassword = localStorage.getItem('rememberedPassword');
        const rememberMeChecked = localStorage.getItem('rememberMeChecked') === 'true'; // Get the boolean value

        if (storedUsername && storedPassword && rememberMeChecked) {
            setInput(prevState => ({
                ...prevState,
                name: storedUsername,
                password: storedPassword
            }));
            setIsRememberMe(true);
        }
    }, []);

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
                        <IonRow className='loginrow1'>
                            <IonCol size-lg='10' size-md='10' size-sm='8' size='12'>
                                <form className='form-details' color='secondary' onSubmit={handleSubmit}>
                                    {isLogin ? (
                                        <div className='loginrow' >
                                            <div style={{ display: 'flex' }}>
                                                <IonInput
                                                    name="name"
                                                    placeholder="Enter your Username or Phone No or Email"
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
                                                    name='password'
                                                    type="password"
                                                    color='secondary'
                                                    placeholder="Enter Password"
                                                    style={{ background: '#ffdeb300', color: '#000' }}
                                                    slot="start"
                                                    value={input.password}
                                                    onBlur={handleChange}
                                                    required
                                                    // fill="clear"
                                                >
                                                    <IonInputPasswordToggle style={{ padding: '0' }} slot="start" fill='clear' color='secondary'></IonInputPasswordToggle>
                                                </IonInput>
                                            </div>
                                            <IonCol size='12'>
                                               <IonRow >
                                                   <IonCol size='6' style={{display:'flex'}}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isRememberMe}
                                                            onChange={() => setIsRememberMe(!isRememberMe)}
                                                        />
                                                        <span style={{marginLeft:'5px',fontSize:'14px', color:'rgb(76 50 38)'}}>
                                                            <label>Remember Me</label>
                                                        </span>
                                                    </IonCol>   
                                                    <IonCol size='6' className="col-6 " style={{textAlign:'end'}}>
                                                        <span onClick={() => handleItemClick()} style={{ cursor: "pointer", fontSize: '14px', color: '#bc7700' }}>
                                                            Forget Password ?
                                                        </span>
                                                    </IonCol>
                                                </IonRow> 
                                            </IonCol>
                                            <IonButton
                                                color='secondary'
                                                type='submit'
                                                expand="full"
                                                style={{ marginTop: '10px', width: '100%', textTransform: 'uppercase', letterSpacing: '1.1px' }}
                                                disabled={loading}
                                            >
                                                {loading ? 'Logging in...' : 'Login'}
                                            </IonButton>
                                        </div>
                                    ) : (
                                        <div className='loginrow loginrow2'>
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

                                            <IonButton color='secondary' type='submit' expand="full" style={{ marginTop: '20px', width: '95%', textTransform: 'uppercase', letterSpacing: '1.1px' }}>Register</IonButton>
                                        </div>
                                    )}
                                </form>
                                <div style={{ width: '100%', display: 'flex', margin: 'auto', flexDirection: 'column', textAlign: 'center', fontSize: '14px' }}>
                                    {isLogin ? (
                                        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
                                            Don't have an account ? {" "}
                                            <span onClick={() => setIsLogin(false)} style={{ cursor: "pointer", color: '#bc7700', marginLeft: '5px' }}>
                                                Register here
                                            </span>
                                        </div>
                                    ) : (
                                        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
                                            Already have an account?{" "}
                                            <span onClick={() => setIsLogin(true)} style={{ cursor: "pointer", color: '#bc7700', marginLeft: '5px' }}>
                                                Login here
                                            </span>
                                        </div>
                                    )}
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