import { useEffect, useMemo } from "react";
import  NProgress from "nprogress";


export default function SuspenseFallback() {
    NProgress.configure({
      showSpinner: false,
    });
  
    useMemo(() => {
      console.log("start",Date.now);
      NProgress.start();
    }, []);
  
    useEffect(() => {
      console.log("done",Date.now());
      NProgress.done();
    }, []);
  
    return null;
  }