import React, { useState, useEffect } from 'react';
import {
    IonContent,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonGrid,
    IonImg,
    IonFooter,
    IonButtons,
} from '@ionic/react';
import { Tooltip } from 'react-tooltip'
import { camera } from 'ionicons/icons';
import jwtAuthAxios from "../service/jwtAuth";
import { useHistory } from 'react-router-dom';

const Videojewal = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(24);
    const filteredItems = selectedOption ? data.filter(item => item.type === selectedOption) : data;
    const history = useHistory();
    const [selectedItems, setSelectedItems] = useState([]);

    const fetchVideoData = async () => {
        try {
            const response = await jwtAuthAxios.get('/master/upload-videofile');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleCheckboxChange = (itemId) => {
        setSelectedItems(prevSelected => {
            if (prevSelected.includes(itemId)) {
                return prevSelected.filter(id => id !== itemId);
            } else {
                return [...prevSelected, itemId];
            }
        });
    };

    useEffect(() => {
        fetchVideoData();
    }, []);


    const handleItemClick = (item) => {
        history.push({
            pathname: `/videoshow/${item?._id}`,
            state: { rowData: item }
        });

    };


    const handlePDFDownload = async () => {
        try {
            const idsToDownload = selectedItems.length > 0 ? selectedItems : data.map(item => item._id);

            const response = await jwtAuthAxios.get('/master/downloadpdf', {
                responseType: 'blob',
                params: { ids: idsToDownload }
            });

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'video_files.pdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url); // Clean up URL object
            } else {
                console.error('Failed to download PDF:', response.statusText);
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };


    const getUniqueCategories = () => {
        const uniqueTypes = [...new Set(data.map(item => item.type))];
        return uniqueTypes;
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setCurrentPage(1);
    };


    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };


    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <IonPage>
            <IonContent style={{ background: "rgba(188, 119, 0, 0.07)" }}>
                <div className="pb-3">
                    <IonGrid>
                        <IonRow className="ion-align-items-center mb-4">
                            <IonCol size-sm="3" size="3" >
                                {/* <h4 className="breadcrumb-item" style={{ fontFamily: 'Circular' }}>
                                    Jewellery Assets
                                </h4> */}

                                <a href="/home" style={{ padding: '0', }}>
                                    <IonImg
                                        className='logo'
                                        src="/img/logo.svg"
                                        style={{ width: '72px', height: '40px' }}
                                    ></IonImg>
                                </a>


                            </IonCol>

                            <IonCol size-sm="9" size="9">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'end' }}>
                                    <div>
                                        <select
                                            id="simple-select"
                                            value={selectedOption}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="">All Select Jewellery</option>
                                            {getUniqueCategories().map((type, index) => (
                                                <option key={index} value={type}>
                                                    {type}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                    <IonButton color='secondary' style={{ height: '40px', width: '40px' }} onClick={handlePDFDownload}>
                                        <ion-icon name="download-outline" slot="icon-only" ></ion-icon>
                                    </IonButton>

                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                 <div style={{ marginTop: '15px',paddingTop: '10px', borderTop: '1.6px solid #00000047', display: 'flex',alignItems:"center", justifyContent: 'space-between' }}>
                            <h4>Exclusive Jewellery</h4>
                            <IonSelect value={itemsPerPage} className="w-auto" style={{ marginLeft: 'auto', display: 'flex',width:'auto' }} onIonChange={handleItemsPerPageChange}>
                                <IonSelectOption value={24}>24</IonSelectOption>
                                <IonSelectOption value={48}>48</IonSelectOption>
                                <IonSelectOption value={72}>72</IonSelectOption>
                                <IonSelectOption value={100}>100</IonSelectOption>
                            </IonSelect>
                        </div>
                            </IonCol>
                        </IonRow>
                       
                        <IonRow>
                            {currentItems.map(item => (
                                <IonCol size="12" size-sm="6" size-md="4" size-lg="2">
                                    <IonCard style={{ background: '#fbf2e5', position: 'relative', margin: '0px' }} key={item._id}>
                                        <IonButton
                                            href={`https://api.whatsapp.com/send?text=Check out this item: ${item.filepath}`}
                                            color='secondary'
                                            fill="solid"
                                            shape="round"
                                            target="_blank"
                                            style={{
                                                position: 'absolute',
                                                width: '40px',
                                                height: '40px',
                                                top: '7px',
                                                right: '10px',
                                            }}
                                        >
                                            <ion-icon name="logo-whatsapp" slot="icon-only"></ion-icon>
                                        </IonButton>
                                        <img
                                            src={`https://s3.ap-south-1.amazonaws.com/console.v360.tech.output/thumbnails/${item.filepath.split('/')[5].split('?')[0]}.webp`}
                                            alt="Jewelry"
                                            className='picjewels'
                                        />
                                        <div class='videogld'>
                                            <h6 style={{ margin: '0' }}>{item.name}</h6>
                                            <IonButton

                                                onClick={() => handleItemClick(item)}
                                                color='success'
                                                fill="solid"
                                                shape="round"
                                                target="_blank"
                                            >
                                                <ion-icon name="videocam-outline" slot="icon-only" style={{ color: 'white' }}></ion-icon>
                                            </IonButton>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                fontFamily: 'Outfit',
                                                gap: '10px',
                                                padding: '10px',
                                                borderTop: '1px solid rgba(0, 0, 0, 0.22)',

                                            }}
                                        >
                                            <p className='videotip'>Dia pcs: <span> {item?.diapcs}</span></p>
                                            <p className='videotip'>Dia wt: <span>{item?.diawt.toFixed(2)}</span></p>
                                            <p className='videotip'>Net wt: <span>{item?.netwt.toFixed(2)}</span></p>
                                        </div>
                                        <div className='select-cart'>
                                            <input
                                                style={{ margin: 'auto', display: 'block' }}
                                                type='checkbox'
                                                checked={selectedItems.includes(item._id)}
                                                onChange={() => handleCheckboxChange(item._id)}
                                            />
                                        </div>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                        <IonRow style={{ justifyContent: 'center' }}>
                            <IonCol size='12' style={{ justifyContent: 'center' }}>
                                <IonButtons style={{ justifyContent: 'center' }}>
                                    <IonButton
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ion-icon name="arrow-back-circle-outline"></ion-icon>
                                    </IonButton>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <IonButton
                                            key={index + 1}
                                            style={{
                                                backgroundColor: index + 1 === currentPage ? '#f3a41c' : 'transparent',
                                                color: index + 1 === currentPage ? '#fff' : '#000',
                                                borderRadius: index + 1 === currentPage ? '100%' : '100%',
                                                padding: index + 1 === currentPage ? '4px 7px' : '4px 7px',

                                            }}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </IonButton>
                                    ))}
                                    <IonButton
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ion-icon name="arrow-forward-circle-outline" ></ion-icon>
                                    </IonButton>
                                </IonButtons>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
            <p style={{ textAlign: 'center', fontSize: '13px', backgroundColor:"transparent"}}>All rights are reserved. GreenLab Jewels</p>
        </IonPage >
    );
};

export default Videojewal;
