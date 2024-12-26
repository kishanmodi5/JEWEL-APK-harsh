import React, { useRef, useEffect, useState, useContext } from 'react';
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
    IonSelect,
    IonSelectOption,
    IonPopover,
    IonAccordion,
    IonAccordionGroup,
    IonRadio,
    IonRadioGroup,
} from '@ionic/react';
import { IonCol, IonGrid, IonRow, IonTabButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Header from './head';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../pages/Tab1.css';
import { useParams } from "react-router-dom";
import { IMG_PATH } from "../config";
import jwtAuthAxios from "../service/jwtAuth";
import { DataContext } from "../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";
import { addToCart, showCarts } from "../store/actions";
import { toast } from "react-toastify";

function CategoryPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const isFetching = useRef(false)
    const [selectedMetal, setSelectedMetal] = useState("");
    const { wishData, setWishData } = useContext(DataContext);
    const [checkedItems, setCheckedItems] = useState({});
    const [liked, setLiked] = useState(false);
    const [cart, setCart] = useState([]);
    const [quotations, setQuotations] = useState([]);

    const fetchCategoryData = async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        setLoading(true);
        try {
            const response = await jwtAuthAxios.get(`client/citems?id=${id}`);
            const items = response?.data?.data;
            setCategoryDetails(items);
            if (items.length > 0) {
                setSelectedMetal(items[0].metalcolor);
            }

            setError(null);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            setError('Failed to load category details. Please try again later.');
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    };



    const handleAddToCart = async (item) => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {

            // alert(item.itemtype)
            setLoading(true);
            const payload = {
                itemId: item._id,
                quantity: 1,
                metal: `${item.metal}-${selectedMetal}-GOLD`.toUpperCase(),
                diamondQuality: 'DEF VVS+',
                colorstone: item.colorstone,
                size: item.size,
                itemtype: item.itemtype,
                message: item.message,
                findings: item.findings,
                diaqty: item.diaqty,
                sidectwt: item.sidectwt,
                centerctwt: item.centerctwt
            };

            const response = await jwtAuthAxios.post('/client/cart/add', payload);
            setCart([...cart, response.data]);
            dispatch(addToCart({ item: item._id, quantity: 1 }));
            toast.success('Item added to cart');
            fetchCartData();
        } catch (error) {

            console.error('Error adding item to cart:', error);
            if (error.response) {
                console.error('Error Response:', error.response.data);
            }
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    };


    const handleItemCheckboxChange = (id, data) => {
        setLiked(!liked);
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: !prevCheckedItems[id],
        }));

        const storedList = JSON.parse(localStorage.getItem("wishList")) || [];
        const itemIndex = storedList.findIndex((item) => item._id === data._id);

        if (itemIndex === -1) {
            storedList.push(data);
        } else {
            storedList.splice(itemIndex, 1);
        }
        setWishData(storedList);
    };

    useEffect(() => {
        const newCheckedItems = {};
        wishData?.forEach((item) => {
            if (item?._id) {
                newCheckedItems[item._id] = true;
            }
        });

        setCheckedItems(newCheckedItems);
    }, []);


    useEffect(() => {
        if (id) {
            fetchCategoryData();
            handleAddToCart()
        }
    }, [id]);



    return (
        <IonPage>
            <IonHeader>
                <h1>home</h1>
            </IonHeader>
            <Header />

            <IonContent color="primary">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <Swiper className='main-toslider' style={{ marginBottom: '20px', height: '200px' }}
                                spaceBetween={20}
                                slidesPerView={3}
                                breakpoints={{
                                    340: {
                                        slidesPerView: 3,
                                    },
                                    440: {
                                        slidesPerView: 3,
                                    },
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 5,
                                    },
                                }}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                autoplay={true}
                            >
                                <SwiperSlide >
                                    <IonImg className='slider-img pulsating-circle'
                                        src="src/img/big-banner1.png"
                                        style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                    ></IonImg>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <IonImg
                                        src="src/img/big-banner2.png"
                                        style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                    ></IonImg>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <IonImg
                                        src="src/img/big-banner3.png"
                                        style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                    ></IonImg>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <IonImg
                                        src="src/img/big-banner4.png"
                                        style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                    ></IonImg>
                                </SwiperSlide>

                                <SwiperSlide >
                                    <IonImg
                                        src="src/img/big-banner2.png"
                                        style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                    ></IonImg>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <IonImg
                                        src="src/img/big-banner3.png"
                                        style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                    ></IonImg>
                                </SwiperSlide>
                            </Swiper>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonGrid>


                    <div>
                        <h5 class="text-center mb-5 element">Sub Category</h5>
                    </div>
                    <div className='main-catagory'>
                        <IonRow>
                            {/* <IonCol>
                                        <h6>Home - Ring - Category</h6>
                                    </IonCol> */}
                        </IonRow>
                        <IonRow>

                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p className="error-message">{error}</p>
                            ) : (
                                categoryDetails?.map(item =>
                                    <IonCol size-lg="3" size-md="4" size-sm="6" size="12">
                                        <div key={item._id} className='main-card-ctgy' style={{ marginBottom: '30px' }}>
                                            <ion-router-link href={`/product/${item?._id}`}>
                                                <div className='main-card-top'>
                                                    <img src={IMG_PATH + item?.thumbnailImage} alt="ig145" />
                                                    <span className='igsticky'>{item.sku}</span>
                                                </div>
                                            </ion-router-link>
                                            <div className='main-card-bottom'>
                                                <div>
                                                    <h5>{item.description}</h5>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <IonButton fill="clear" size="large" onClick={() => {
                                                        handleAddToCart(item);
                                                    }}>
                                                        <ion-icon name="bag-add-outline" slot="icon-only"></ion-icon>
                                                    </IonButton>
                                                    <IonRadioGroup value={selectedMetal} onIonChange={e => setSelectedMetal(e.detail.value)} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                        <IonRadio className='pink' value="ROSE" />
                                                        <IonRadio className='silver' value="WHITE" />
                                                        <IonRadio className='yellow' value="YELLOW" />
                                                    </IonRadioGroup>

                                                    <IonButton
                                                        key={item._id}
                                                        color={checkedItems[item._id] ? "danger" : "medium"}
                                                        fill="clear"
                                                        onClick={() => handleItemCheckboxChange(item._id, item)}
                                                    >
                                                        <IonIcon
                                                            slot="icon-only"
                                                            size="large"
                                                            icon={checkedItems[item._id] ? heart : heartOutline}
                                                        />
                                                    </IonButton>


                                                </div>
                                            </div>
                                        </div>
                                    </IonCol>
                                )
                            )}
                        </IonRow>
                    </div>

                </IonGrid>
            </IonContent>
        </IonPage >
    );
}
export default CategoryPage; 