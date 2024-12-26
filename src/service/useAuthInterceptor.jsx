import { useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import jwtAuthAxios from "./jwtAuth"; 


const useAuthInterceptor = () => {
  const history = useHistory();
  useEffect(() => {
    const interceptor = jwtAuthAxios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status === 401) {
          localStorage.clear();
          history.push("/home"); 
        }
        return Promise.reject(err);
      }
    );

    return () => {
      jwtAuthAxios.interceptors.response.eject(interceptor);
    };
  }, [history]);

};

export default useAuthInterceptor;