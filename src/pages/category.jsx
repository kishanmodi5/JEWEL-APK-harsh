import React, { useRef, useState, useEffect } from 'react';
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
    IonInput,
    IonCheckbox
} from '@ionic/react';
import { useParams } from "react-router-dom";
import { IonCol, IonGrid, IonRow, IonTabButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Header from './head';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../pages/Tab1.css';
import { IMG_PATH } from "../config";
import jwtAuthAxios from "../service/jwtAuth";
import { Navigation, Autoplay } from 'swiper/modules';


function Category() {
    const { id } = useParams();
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [selectedSku, setSelectedSku] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [hoveredImage, setHoveredImage] = useState('');
    const [pageSize, setPageSize] = useState(21);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState([])
    const [subcollection, setSubcollection] = useState([])
    const [itemname, setItemname] = useState('')

    const isFetching = useRef(false)

    const fetchCategoryData = async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        setLoading(true);
        try {
            const response = await jwtAuthAxios.post(`client/category?id=${id}&page=${page}&limit=${pageSize}`, {
                filters: selectedCategories,
                filters: selectedCollection
            });
            console.log("Fetching with filters:", selectedCategories);
            setCategoryDetails(response?.data?.data);
            setSubcategories(response?.data.CategoryFilter);
            setSubcollection(response.data.CollectionFilter)
            setTotalCount(response?.data?.pagination?.totalCount);
            setItemname(response.data.data[0].itemtype.name)
            // console.log('k', response.data.data[0].itemtype.name)
            setError(null);
        } catch (error) {
            setError('Failed to load category details. Please try again later.');
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    };

    const handleCategoryChange = (categoryId) => {
        //console.log("category:", categoryId);
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleCollectionChange = (collectionId) => {
        //console.log("category:", categoryId);
        setSelectedCollection(prev =>
            prev.includes(collectionId)
                ? prev.filter(id => id !== collectionId)
                : [...prev, collectionId]
        );
    };



    useEffect(() => {
        if (id) {
            fetchCategoryData();
        }
    }, [id, page, selectedCategories, selectedCollection]);

    const handleMouseEnter = (sku, description, image, itemId) => {
        setHoveredItemId(itemId);
        setSelectedSku(sku);
        setSelectedDescription(description);
        setHoveredImage(image);
    };

    const handleMouseLeave = () => {
        setHoveredItemId(null);
        setHoveredImage('');
    };

    const handleNextPage = () => {
        if (page * pageSize < totalCount) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Header />

            <IonPage>
                <div style={{ margin: '30px' }}></div>

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
                        <div>
                            <h5 class="text-center mb-5 element">Category </h5>
                        </div>
                        <div className='main-catagory'>
                            <IonRow>
                                <IonCol>
                                    <h5>{itemname}</h5>
                                </IonCol>
                            </IonRow>
                            <IonRow>

                                {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p className="error-message">{error}</p>
                                ) : (
                                    categoryDetails?.map(item =>
                                        <IonCol size-md='4' size-sm='6' size='12'>
                                            <div key={item._id} className='main-card-ctgy' style={{ marginBottom: '30px' }}>
                                                <ion-router-link href={`/c-category/${item?._id}`}>
                                                    <div className='main-card-top'>
                                                        <img src={hoveredItemId === item._id ? hoveredImage : IMG_PATH + item?.thumbnailImage} alt="ig145" />
                                                        <span className='igsticky'>{hoveredItemId === item._id ? selectedSku : item.sku}</span>
                                                    </div>
                                                </ion-router-link>
                                                <div className='main-card-bottom'>
                                                    <div>
                                                        <h5>{hoveredItemId === item._id ? selectedDescription : item.description}</h5>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div className='ctstop'>
                                                            <span>CTS:</span>
                                                        </div>
                                                        <div style={{ width: '80%', margin: 'auto' }}>
                                                            <div style={{ width: '100%', maxWidth: "250px" }}>
                                                                <div className='right'>
                                                                    {/* <Swiper style={{ margin: '4px 4px' }} spaceBetween={5} slidesPerView={4}>
                                                                        {[item, ...item?.subItems]?.map(subItem => (
                                                                            <SwiperSlide
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    window.location.href = `/product/${subItem._id}`;
                                                                                }}
                                                                                key={subItem._id}
                                                                                onMouseEnter={() => handleMouseEnter(subItem.sku, subItem.description, IMG_PATH + subItem.thumbnailImage, item._id)}
                                                                                onMouseLeave={handleMouseLeave}
                                                                            >
                                                                                <span style={{ fontSize: '12px' }}>{subItem?.ctswts?.toFixed(2)}</span>
                                                                            </SwiperSlide>
                                                                        ))}
                                                                    </Swiper> */}
                                                                    <Swiper
                                                                        style={{ padding: '4px 4px' }}
                                                                        spaceBetween={5}
                                                                        slidesPerView={3}
                                                                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                                                                        modules={[Navigation]}
                                                                        breakpoints={{
                                                                            320: { slidesPerView: 3, spaceBetween: 6 },
                                                                            480: { slidesPerView: 3, spaceBetween: 6 },
                                                                            768: { slidesPerView: 3, spaceBetween: 6 },
                                                                            1024: { slidesPerView: 4, spaceBetween: 5 },
                                                                        }}
                                                                    >
                                                                        {[item, ...item?.subItems]?.map(subItem => (
                                                                            <SwiperSlide
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    window.location.href = `/product/${subItem._id}`;
                                                                                }}
                                                                                key={subItem._id}
                                                                                onMouseEnter={() => handleMouseEnter(subItem.sku, subItem.description, IMG_PATH + subItem.thumbnailImage, item._id)}
                                                                                onMouseLeave={handleMouseLeave}
                                                                            >
                                                                                <span style={{ fontSize: '12px' }}>{subItem?.ctswts?.toFixed(2)}</span>
                                                                            </SwiperSlide>
                                                                        ))}
                                                                    </Swiper>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </IonCol>

                                    )
                                )}
                            </IonRow>

                            {/* <IonButton className='right_bottom_fix' shape='round' size='large' color='secondary' id="open-modal">
                                <ion-icon name="filter-outline" slot="icon-only"></ion-icon>
                            </IonButton>
                            <IonModal trigger="open-modal" color='secondary' initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
                                <IonContent className="ion-padding" color='secondary'>
                                    <IonList>
                                        <div className='topbtn'>
                                            <span>Filter by:</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <IonButton style={{ width: '100%', margin: '15px 0', background: '#f3a41c' }} expand="full">Reset</IonButton>
                                                <IonButton style={{ width: '100%', margin: '15px 0', background: '#f3a41c' }} expand="full">Apply</IonButton>
                                            </div>
                                        </div>
                                        <IonAccordionGroup class='filter-drop' multiple={true} style={{ padding: '0' }}>
                                            <IonAccordion value="first">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>Sub Category</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    {subcategories.map(CategoryFilter => (
                                                        <IonCheckbox
                                                            key={CategoryFilter._id}
                                                            size='large'
                                                            labelPlacement="end"
                                                            style={{ marginBottom: '10px' }}
                                                            checked={selectedCategories.includes(CategoryFilter._id)}
                                                            onIonChange={() => handleCategoryChange(CategoryFilter._id)}
                                                        >
                                                            <span>{CategoryFilter.name}</span>
                                                        </IonCheckbox>
                                                    ))}
                                                </div>
                                            </IonAccordion>
                                            <IonAccordion value="second">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>Collection</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    {subcollection.map(CollectionFilter => (
                                                        <IonCheckbox
                                                            key={CollectionFilter._id}
                                                            size='large'
                                                            labelPlacement="end"
                                                            style={{ marginBottom: '10px' }}
                                                            checked={selectedCollection.includes(CollectionFilter._id)}
                                                            onIonChange={() => handleCollectionChange(CollectionFilter._id)}
                                                        >
                                                            <span>{CollectionFilter.name}</span>
                                                        </IonCheckbox>
                                                    ))}
                                                </div>
                                            </IonAccordion>
                                            <IonAccordion value="third" >
                                                <IonItem slot="header" color='secondary'>
                                                    <p>CT Wts</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    <div className='d-flex'>
                                                        <span>Min</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <span>Max</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                </div>
                                            </IonAccordion>
                                            <IonAccordion value="fore">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>Gram Wts</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    <div className='d-flex'>
                                                        <span>Min</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <span>Max</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                </div>
                                            </IonAccordion>
                                        </IonAccordionGroup>
                                    </IonList>
                                </IonContent>
                            </IonModal> */}
                            {/* <button className="open-btn right_bottom_fix" onClick={toggleOffcanvas}>
                                <ion-icon name="filter-outline" slot="icon-only"></ion-icon>
                            </button> */}
                            <IonButton className='right_bottom_fix' shape='round' size='large' color='secondary' onClick={toggleOffcanvas}>
                                {isOpen ? (
                                    <ion-icon name="close-outline" slot="icon-only"></ion-icon>
                                ) : (
                                    <ion-icon name="filter-outline" slot="icon-only"></ion-icon>
                                )}
                            </IonButton>
                            <div className={`offcanvas ${isOpen ? "show" : ""}`}>
                                <div className="content">
                                    <div color='secondary'>
                                        <div className='topbtn'>
                                            <span>Filter by:</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <IonButton style={{ width: '100%', margin: '15px 0', background: '#f3a41c' }} expand="full">Reset</IonButton>
                                                <IonButton style={{ width: '100%', margin: '15px 0', background: '#f3a41c' }} expand="full">Apply</IonButton>
                                            </div>
                                        </div>
                                        <IonAccordionGroup
                                            class='filter-drop'
                                            multiple={true}
                                            value={["first", "second", "third", "fore"]} // Set the first accordion as open by default
                                            style={{ padding: '0' }}>
                                            <IonAccordion value="first">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>Sub Category</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    {subcategories.map(CategoryFilter => (
                                                        <IonCheckbox
                                                            key={CategoryFilter._id}
                                                            size='large'
                                                            labelPlacement="end"
                                                            style={{ marginBottom: '10px' }}
                                                            checked={selectedCategories.includes(CategoryFilter._id)}
                                                            onIonChange={() => handleCategoryChange(CategoryFilter._id)}
                                                        >
                                                            <span>{CategoryFilter.name}</span>
                                                        </IonCheckbox>
                                                    ))}
                                                </div>
                                            </IonAccordion>
                                            <IonAccordion value="second">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>Collection</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    {subcollection.map(CollectionFilter => (
                                                        <IonCheckbox
                                                            key={CollectionFilter._id}
                                                            size='large'
                                                            labelPlacement="end"
                                                            style={{ marginBottom: '10px' }}
                                                            checked={selectedCollection.includes(CollectionFilter._id)}
                                                            onIonChange={() => handleCollectionChange(CollectionFilter._id)}
                                                        >
                                                            <span>{CollectionFilter.name}</span>
                                                        </IonCheckbox>
                                                    ))}
                                                </div>
                                            </IonAccordion>
                                            <IonAccordion value="third">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>CT Wts</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    <div className='d-flex'>
                                                        <span>Min</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <span>Max</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                </div>
                                            </IonAccordion>
                                            <IonAccordion value="fore">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>Gram Wts</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    <div className='d-flex'>
                                                        <span>Min</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <span>Max</span>
                                                        <IonInput type="number" style={{ background: 'transparent' }} placeholder="0"></IonInput>
                                                    </div>
                                                </div>
                                            </IonAccordion>
                                        </IonAccordionGroup>

                                    </div>
                                </div>
                            </div>
                            <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <button onClick={handlePreviousPage} disabled={page === 1} style={{
                                    color: 'rgb(24 9 2)', padding: '4px 8px', fontSize: '28px', border: '1px solid #e5e0db', background: '#ffe4c4', borderRadius: '10px',
                                }}><ion-icon name="arrow-back-circle-outline" slot="icon-only"></ion-icon></button>
                                <button onClick={handleNextPage} disabled={page * pageSize >= totalCount} style={{
                                    color: 'rgb(24 9 2)', padding: '4px 8px', fontSize: '28px', border: '1px solid #e5e0db', background: '#ffe4c4', borderRadius: '10px'
                                }}><ion-icon name="arrow-forward-circle-outline" slot="icon-only"></ion-icon></button>
                            </div>
                        </div>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
}
export default Category; 