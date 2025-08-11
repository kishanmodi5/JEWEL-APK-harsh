import React, { useEffect, useState } from 'react';
import { 
  IonContent, 
  IonImg,
  IonGrid, 
  IonRow, 
  IonCol,
  IonPage
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Head from './head';
import { IMG_PATH } from "../config";
import jwtAuthAxios from "../service/jwtAuth";
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  const [homeDetails, setHomeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const response = await jwtAuthAxios.get(`client/dashboard`);
      setHomeDetails(response?.data.data.sec[0].data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleCategoryClick = (id) => {
    history.push(`/category/${id}`);
  };

  return (
    <IonPage>
      <Head />
      <IonContent color="primary">
        <IonGrid>
          <IonRow>
            <IonCol>
              <Swiper 
                style={{ marginBottom: '20px', marginTop: '140px' }}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={true}
              >
                <SwiperSlide>
                  <IonImg 
                    className='slider-img'
                    src="/img/slider-banner-1.jpg"
                    style={{ width: '100%', height: '235px', objectFit: 'cover', borderRadius: '9px', overflow: 'hidden' }}
                  />
                </SwiperSlide>
                {/* Other slides */}
              </Swiper>
            </IonCol>
          </IonRow>
        </IonGrid>
        
        <div>
          <h6 className="text-center mb-5 element">Categories at a Glance</h6>
          <IonGrid style={{ marginBottom: '100px', marginTop: '30px' }}>
            <IonRow>
              {homeDetails.map((item) => (
                <IonCol 
                  size-lg="3" size-md="4" size-sm="4" size="4" 
                  key={item._id} 
                  onClick={() => handleCategoryClick(item._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className='main-categoryimg'>
                    <IonImg className='categoryimg' src={IMG_PATH + item?.filepath} />
                    <IonImg className='categoryimg1' src="/img/catagory-bg.png" />
                  </div>
                  <span style={{
                    color:'black', 
                    display:'flex',
                    justifyContent:'center',
                    fontSize:'15px', 
                    marginBottom:'10px'
                  }}>
                    {item?.name}
                  </span>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;