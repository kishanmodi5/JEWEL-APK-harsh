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
    IonCheckbox,
    IonRange
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
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/actions';


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
    const [CategoryFilter, setCategoryFilter] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState([])
    const [subcollection, setSubcollection] = useState([])
    const [itemname, setItemname] = useState('')
    const isFetching = useRef(false)
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.filter);
    const [pendingFetch, setPendingFetch] = useState(false);
    const [attr, setAttr] = useState([]);
    const [filterDetails, setFilterDetails] = useState(filters?.filter || {
        minctwts: 0, maxctwts: 0, minGramWt: 0, maxGramWt: 0, minpointer: 0,
        maxpointer: 0,
        attr: [],
    });

    const [maxattr, setMaxttr] = useState({});


    const fetchCategoryData = async (filterflag) => {
        if (isFetching.current) return;
        isFetching.current = true;
        setLoading(true);



        try {
            const response = await jwtAuthAxios.post(`client/category?id=${id}&page=${page}&limit=${pageSize}`, {
                CategoryFilter,
                CollectionFilter: selectedCollection,
                filter: filterDetails,

            });
            // console.log("Fetching with filters:", selectedCategories);
            setMaxttr(response?.data?.maxAttr);
            if (filterDetails.attr.length <= 0) {
                setAttr(response?.data.attribute[0].attr);
            }
            if (filterflag) {
                setFilterDetails({
                    minctwts: 0,
                    maxctwts: 0,
                    minGramWt: 0,
                    maxGramWt: 0,
                    minpointer: 0,
                    maxpointer: 0,
                    attr: [],
                });
            } else {
                setFilterDetails(response?.data?.filter);
            }
            setCategoryDetails(response?.data?.data);
            // setSubcategories(response?.data.CategoryFilter);
            setSubcollection(response.data.CollectionFilter)
            setTotalCount(response?.data?.pagination?.totalCount);
            setItemname(response.data.data[0].itemtype.name)
            setError(null);

        } catch (error) {
            console.error(error?.response?.data?.error)
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    };

    const demosub = async () => {
        const response = await jwtAuthAxios.post(`client/category?id=${id}&page=${page}&limit=${pageSize}`, {
            CategoryFilter,
            CollectionFilter: selectedCollection,
            filter: filterDetails,

        });
        setSubcategories(response?.data.CategoryFilter);
    }

    useEffect(() => {
        demosub()
    }, [])

    const handleCategoryChange = (categoryId) => {
        // Toggle the selected category
        const updatedCategories = CategoryFilter.includes(categoryId)
            ? CategoryFilter.filter(id => id !== categoryId)
            : [...CategoryFilter, categoryId];

        setCategoryFilter(updatedCategories);
        dispatch(setFilter(updatedCategories));
    };

    const handleCollectionChange = (collectionId) => {
        const updatedCollection = selectedCollection.includes(collectionId)
            ? selectedCollection.filter(id => id !== collectionId)
            : [...selectedCollection, collectionId];

        setSelectedCollection(updatedCollection);
        dispatch(setFilter(updatedCollection));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        const numericValue = value === '' ? '' : parseFloat(value);

        if (value !== '' && isNaN(numericValue)) {
            console.error(`Invalid input for ${name}: ${value}`);
            return;
        }

        setFilterDetails((prevDetails) => ({
            ...prevDetails,
            [name]: numericValue,
        }));

        setPendingFetch(true);
    };

    const handleFilterAttrChange = (attr, attributeName, newValue) => {
        if (newValue === "") {
            console.log('" " value found');
            setAttr([]);
            setFilterDetails((prevDetails) => ({
                ...prevDetails,
                attr: [],
            }));
            setPendingFetch(true);
            return;
        }

        const updatedAttr = attr.map((attribute) => {
            if (attribute.name === attributeName) {
                return { ...attribute, value: newValue };
            }
            return attribute;
        });

        setAttr(updatedAttr);
        setFilterDetails((prevDetails) => ({ ...prevDetails, attr: updatedAttr }));
        setPendingFetch(true);
    };

    useEffect(() => {
        if (id) {
            fetchCategoryData();

        }
    }, [id, page, CategoryFilter, selectedCollection,]);


    useEffect(() => {
        if (pendingFetch) {
            fetchCategoryData();
            setPendingFetch(false);

        }
    }, [filterDetails, pendingFetch]);

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

    useEffect(() => {
        console.log('filter', filterDetails)
    }, [filterDetails])

    const handleReset = () => {
        setFilterDetails({
            minctwts: 0,
            maxctwts: 0,
            minGramWt: 0,
            maxGramWt: 0,
            minpointer: 0,
            maxpointer: 0,
            attr: [],
        });
        setCategoryFilter([]);
        setSelectedCollection([]);
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
                                            src="/img/big-banner1.png"
                                            style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                        ></IonImg>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <IonImg
                                            src="/img/big-banner2.png"
                                            style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                        ></IonImg>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <IonImg
                                            src="/img/big-banner3.png"
                                            style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                        ></IonImg>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <IonImg
                                            src="/img/big-banner4.png"
                                            style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                        ></IonImg>
                                    </SwiperSlide>

                                    <SwiperSlide >
                                        <IonImg
                                            src="/img/big-banner2.png"
                                            style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                        ></IonImg>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <IonImg
                                            src="/img/big-banner3.png"
                                            style={{ width: '100%', height: '100%', maxwidth: '180px', background: '#fff6ec', margin: '0', objectFit: 'contain', borderRadius: '9px', borderRadius: '9px', overflow: 'hidden' }}
                                        ></IonImg>
                                    </SwiperSlide>
                                </Swiper>
                            </IonCol>
                        </IonRow>
                        <div>
                            <h5 class="text-center mb-5 element" style={{marginBottom:'20px'}}>{itemname}  Category </h5>
                        </div>
                        <div className='main-catagory'>
                            <IonRow>
                                <IonCol>
                                    <h5></h5>
                                </IonCol>
                            </IonRow>
                            <IonRow>

                                {loading ? (
                                    <p style={{ color: '#000', display: 'flex', justifyContent: 'center' }}>Loading...</p>
                                ) : error ? (
                                    <p className="error-message" style={{ color: '#000', display: 'flex', justifyContent: 'center' }}>{error}</p>
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
                                                    <div>
                                                        <h5 style={{color:'#bc7700'}}>{item.category[0].name}</h5>
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
                                                <IonButton onclick={handleReset} style={{ width: '100%', margin: '15px 0', background: '#f3a41c' }} expand="full">Reset</IonButton>
                                                <IonButton onClick={toggleOffcanvas} style={{ width: '100%', margin: '15px 0', background: '#f3a41c' }} expand="full">Apply</IonButton>
                                            </div>
                                        </div>
                                        <IonAccordionGroup
                                            class='filter-drop'
                                            multiple={true}
                                            // Set the first accordion as open by default
                                            style={{ padding: '0' }}>
                                            <IonAccordion value="first">
                                                <IonItem slot="header" color='secondary'>
                                                    <p>Sub Category</p>
                                                </IonItem>
                                                <div className="ion-padding" slot="content">
                                                    {subcategories.map(subcategory => (
                                                        <div key={subcategory._id} style={{ display: 'flex' }}>
                                                            <IonCheckbox
                                                                size='large'
                                                                labelPlacement="end"
                                                                style={{ marginBottom: '10px' }}
                                                                //checked={selectedCategories.includes(subcategory._id)}
                                                                checked={Array.isArray(CategoryFilter) && CategoryFilter.includes(subcategory._id)}
                                                                onIonChange={() => handleCategoryChange(subcategory._id)}
                                                            />
                                                            <span style={{ margin: '1px 0px 0px 10px' }}>{subcategory.name}</span>
                                                        </div>
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
                                                            checked={Array.isArray(selectedCollection) && selectedCollection.includes(CollectionFilter._id)}
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
                                                        <IonInput color="secondary" type="number" style={{ background: 'transparent' }} placeholder="0"
                                                            min={0}
                                                            max={100}
                                                            step={0.01}
                                                            name="minctwts"
                                                            value={filterDetails?.minctwts || 0}
                                                            // onIonChange={handleFilterChange}
                                                            onIonBlur={handleFilterChange}

                                                        ></IonInput>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <span>Max</span>
                                                        <IonInput type="number" color="secondary" style={{ background: 'transparent' }} placeholder="0"
                                                            min={0}
                                                            max={100}
                                                            step={0.01}
                                                            name="maxctwts"
                                                            value={filterDetails.maxctwts || 0}
                                                            // onIonChange={handleFilterChange}
                                                            onIonBlur={handleFilterChange}

                                                        ></IonInput>
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
                                                        <IonInput type="number" color="secondary" style={{ background: 'transparent' }} placeholder="0"
                                                            min={0}
                                                            max={100}
                                                            step={0.01}
                                                            name="minGramWt"
                                                            value={filterDetails?.minGramWt || 0}
                                                            // onIonChange={handleFilterChange}
                                                            onIonBlur={handleFilterChange}
                                                        ></IonInput>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <span>Max</span>
                                                        <IonInput type="number" color="secondary" style={{ background: 'transparent' }} placeholder="0"
                                                            min={0}
                                                            max={100}
                                                            step={0.01}
                                                            name="maxGramWt"
                                                            value={filterDetails.maxGramWt || 0}
                                                            // onIonChange={handleFilterChange}
                                                            onIonBlur={handleFilterChange}
                                                        ></IonInput>
                                                    </div>
                                                </div>
                                            </IonAccordion>
                                            {attr?.length > 0 && (
                                                <IonAccordion value="five">
                                                    <IonItem slot="header" color='secondary'>
                                                        <p>Pointer</p>
                                                    </IonItem>
                                                    <div slot="content" style={{ margin: '10px 0px 0px 20px', width: '90%' }}>
                                                        <div >
                                                            <>
                                                                {attr?.map((attribute, index) => {
                                                                    switch (attribute.type) {
                                                                        case "singleinput":
                                                                            return (
                                                                                <div key={attribute._id} >
                                                                                    <label>
                                                                                        {attribute?.name}
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        style={{ width: "65%" }}
                                                                                        id={attribute.name}
                                                                                        name={`attr${index}`}
                                                                                        value={attribute.value}
                                                                                        onChange={(e) =>
                                                                                            handleFilterAttrChange(
                                                                                                attr,
                                                                                                attribute.name,
                                                                                                e.target.value
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        case "radio":
                                                                            return (
                                                                                <div key={attribute._id} >
                                                                                    <label >
                                                                                        {attribute?.name}
                                                                                    </label>
                                                                                    <input
                                                                                        type="radio"
                                                                                        id={attribute.value}
                                                                                        name={attribute.name}
                                                                                        value={attribute.value}
                                                                                        onChange={handleFilterAttrChange}
                                                                                    />
                                                                                    <label htmlFor={attribute.value}>
                                                                                        {attribute.value}
                                                                                    </label>
                                                                                </div>
                                                                            );
                                                                        case "range1":
                                                                            return (
                                                                                <div key={attribute._id} >
                                                                                    <label >
                                                                                        {attribute?.name}
                                                                                    </label>

                                                                                    <IonRange
                                                                                        style={{ border: 'none', boxShadow: 'none', fontWeight: '500', fontSize: '18px' }}
                                                                                        dualKnobs={true}
                                                                                        id={attribute.value}
                                                                                        min={0.00}
                                                                                        name={`attr${index}`}
                                                                                        max={maxattr?.value}
                                                                                        step={0.01}
                                                                                        value={{
                                                                                            lower: parseFloat(attribute.value.split("-")[0]) || 0,
                                                                                            upper: parseFloat(attribute.value.split("-")[1]) || (maxattr?.value)
                                                                                        }}
                                                                                        pinFormatter={(value) => `${value}`}
                                                                                        pin={true}
                                                                                        ticks={true}
                                                                                        snaps={true}
                                                                                        onIonChange={(e) => {
                                                                                            const newMinValue = e.detail.value.lower;
                                                                                            const newMaxValue = e.detail.value.upper;
                                                                                            handleFilterAttrChange(attr, attribute.name, `${newMinValue}-${newMaxValue}`);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        case "range":
                                                                            return (
                                                                                <div key={attribute._id} >
                                                                                    <label >
                                                                                        {attribute?.name}
                                                                                    </label>
                                                                                    <form
                                                                                        name="price"
                                                                                        action=""
                                                                                        method="POST"
                                                                                        style={{ display: "flex", marginTop: "5px" }}
                                                                                    >
                                                                                        <label htmlFor="price-start">
                                                                                            min
                                                                                            <input
                                                                                                id="price-start"
                                                                                                type="number"
                                                                                                min={0}
                                                                                                max={100}
                                                                                                name={`max${attribute.name}`}
                                                                                                value={attribute.value.split("-")[0]}
                                                                                                onChange={(e) =>
                                                                                                    handleFilterAttrChange(
                                                                                                        attr,
                                                                                                        attribute.name,
                                                                                                        `${e.target.value}-${attribute.value.split("-")[1]
                                                                                                        }`
                                                                                                    )
                                                                                                }
                                                                                                style={{
                                                                                                    marginLeft: "5px",
                                                                                                    marginRight: "15px",
                                                                                                }}
                                                                                            />
                                                                                        </label>
                                                                                        <label htmlFor="price-end">
                                                                                            Max
                                                                                            <input
                                                                                                id="price-end"
                                                                                                type="number"
                                                                                                min={0}
                                                                                                max={100}
                                                                                                name={`min${attribute.name}`}
                                                                                                value={attribute.value.split("-")[1]}
                                                                                                onChange={(e) =>
                                                                                                    handleFilterAttrChange(
                                                                                                        attr,
                                                                                                        attribute.name,
                                                                                                        `${attribute.value.split("-")[0]}-${e.target.value
                                                                                                        }`
                                                                                                    )
                                                                                                }
                                                                                                style={{ marginLeft: "5px" }}
                                                                                            />
                                                                                        </label>
                                                                                    </form>
                                                                                </div>
                                                                            );
                                                                        default:
                                                                            return null;
                                                                    }
                                                                })}
                                                            </>
                                                        </div>
                                                    </div>
                                                </IonAccordion>
                                            )}
                                        </IonAccordionGroup>

                                    </div>
                                </div>
                            </div>
                            <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={page === 1}
                                    style={{
                                        color: page === 1 ? 'rgb(40 39 39)' : 'rgb(24 9 2)',
                                        padding: '12px',
                                        border: '1px solid #e5e0db',
                                        background: page === 1 ? '#f0e4d7' : '#ffe4c4',
                                        borderRadius: '10px',
                                        cursor: page === 1 ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    disabled={page * pageSize >= totalCount}
                                    style={{
                                        color: (page * pageSize >= totalCount) ? 'rgb(40 39 39)s' : 'rgb(24 9 2)',
                                        padding: '12px',
                                        border: '1px solid #e5e0db',
                                        borderRadius: '10px',
                                        background: (page * pageSize >= totalCount) ? '#f0e4d7' : '#ffe4c4',
                                        cursor: (page * pageSize >= totalCount) ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
}
export default Category; 