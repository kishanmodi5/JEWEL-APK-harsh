import React from 'react';
import {
    IonPage,
    IonFooter,
} from '@ionic/react';
import { useLocation } from "react-router-dom";

const Videoshow = () => {

    const location = useLocation();
    const rowData = location?.state?.rowData;
   // console.log('rowData',location.state.rowData)
  
    if (!rowData) {
        return <div>No video data available.</div>; 
    }

    return (
        <IonPage>
            <div>
                <div style={{ background: "black", height: "100vh", paddingTop: '50px' }}>
                    <iframe
                        width="100%"
                        height='700px'
                        src={rowData?.filepath}
                        title="Video Player"
                        scrolling="no"
                        allowFullScreen
                        style={{ borderRadius: '10px' }}
                    ></iframe>
                </div>
                <div className='min-tiop text-center' >
            <h5 style={{color: '#c0629a', textAlign:'center'}}>{rowData?.name}</h5>
            <div className='min-tiop1'>
            <p class="videotip">Dia pcs: <span>{rowData?.diapcs}</span></p>
            <p class="videotip">Dia wt: <span>{rowData?.diawt}</span></p>
            <p class="videotip">Net wt: <span>{rowData?.netwt?.toFixed(2)}</span></p>
            </div>
          </div>
            </div>
        </IonPage >
    );
};

export default Videoshow;