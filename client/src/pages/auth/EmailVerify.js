import { useState } from "react";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import { toast } from "react-hot-toast";

import Page from "../../components/Page";
import useAuth from "../../hook/useAuth";
import { useEffect } from "react";
import { API_AUTH, SEND_POST_REQUEST } from "../../utils/API";
import { setSession } from "../../utils/jwt";


export default function EmailVerify() {
    const {user} = useAuth();
    const navigate= useNavigate();
    const [loading, setLoading] = useState(false)
    const handleResendAuthMail = ()=>{
        setLoading(true);
        SEND_POST_REQUEST(API_AUTH.resendAuthMail,{}).then(res=>{
            setLoading(false);
            if(res.status === 200){
                toast.success(res.message);
                setSession(res.data.token);
            }
            else{
                toast.error(res.message);
                setSession(res.data.token);
            }
        }).catch(err=>{
            setLoading(false);
  
            toast.error("Internal server error")
        })
    }

    useEffect(()=>{
        if(!user){
            navigate('/auth/login')
        }
        if(user?.active){
            navigate('/shopping')
        }
    },[navigate,user])
    return (
        <Page className="flex w-full justify-center mt-10 pb-10" title="Verify Your Email">
            <div className="flex  w-11/12 sm:w-[450px]  flex-col items-center ">
                {/* image */}
                <div className=" w-32 h-32  overflow-hidden mb-8  ">
                    <img alt="email" className="w-32 h-32" src={`/assets/email-verify.svg`}></img>
                </div>
                <label className="text-3xl font-bold mb-8">
                    {t('auth.verify-title')}
                </label>
                <label className="break-all">
                    {t('auth.verify-description')}
                </label>
                <label className="font-bold  mb-4 "> {user?.email}</label>
                <label className="break-all mb-8">
                    {t('auth.verify-sub-description')}
                </label>
                <label className="break-all mb-8">
                    {t('auth.verify-sub-title')}
                </label>
                <div className="w-full px-4 sm:px-10 grid gap-4 justify-center">
                    
                    <button className={`btn btn-accent btn-outline mb-8 w-full ${loading?'loading':''}`} onClick ={handleResendAuthMail}>{t('auth.resend')}</button>
                </div>
            </div>
        </Page>
    )
}