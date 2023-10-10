import React, {useEffect, useState} from "react";
import TopLoadingBar from "react-top-loading-bar";
import theme from "@/styles/theme";
import {useRouter} from "next/router";


const LoadingBar: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", () => {
            setProgress(40);
        });
        router.events.on("routeChangeComplete", () => {
            setProgress(100);
        });

    }, []);

    return <TopLoadingBar color={theme.palette.primary.main} height={3} progress={progress} waitingTime={400}
                       onLoaderFinished={() => setProgress(0)}/>
}

export default LoadingBar