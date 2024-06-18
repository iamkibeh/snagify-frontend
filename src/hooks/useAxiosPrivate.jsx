import { useEffect } from "react"
import { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    // attach interceptor to axiosPrivate 
    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]) {
                    console.log("Attaching token to request = > " + auth.access_token);
                    config.headers["Authorization"] = `Bearer ${auth.access_token}`;
                }
                return config;
            }, 
            error => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const previousRequest = error?.config;
                console.log({previousRequest})
                console.log({error})
                if ((error?.response?.status === 403 || error?.response?.status === 401) && (!previousRequest?.sent)) {
                    console.log("There is an error here and we need to reffresh token");
                    previousRequest.sent = true;

                    const newAccessToken = await refresh();
                    console.log({newAccessToken})
                    previousRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return  axiosPrivate(previousRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }
    }, [auth, refresh]);
    return axiosPrivate;
}

export default useAxiosPrivate
