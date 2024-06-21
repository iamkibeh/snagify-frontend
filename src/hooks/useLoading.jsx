import { useContext } from "react";
import LoadingContext from "../context/LoadingProvider";

const useLoading = () => {
    const loadingContext = useContext(LoadingContext);
    if (!loadingContext) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return loadingContext;
}

export default useLoading;