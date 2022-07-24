import { useState } from "react";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Page from "../../components/Page";
import useAuth from "../../hook/useAuth";
import { ASSETS_URL } from "../../utils/API";


export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [loading,setLoading ] = useState(false);
    const defaultValues = {
        email:"",
        password:"",
    }
    const {register, handleSubmit} = useForm(defaultValues);

    const onSubmit = async(data)=>{
        setLoading(true);
        login(data.email,data.password).then(response=>{
            setLoading(false);
            if(response.status === 200){
                toast.success(response.message);
                if(response?.data?.user?.active)
                    navigate('/',{replace:true});
                else
                    navigate('/auth/verify-email',{replace:true});
            }
            else{
                toast.error(response.message);
            }
            
        }).catch(err=>{
            setLoading(false)
            console.log(err);
        })
    }
    return (
        <Page className="flex w-full justify-center mt-20 pb-10" title="Login">
            <div className="flex rounded-lg border border-base-300 w-11/12 sm:w-[450px]  flex-col items-center ">
                {/* avatar */}
                <div className="rounded-full w-32 h-32 -mt-14 overflow-hidden mb-10 shadow-lg ">
                    <img alt="avatar" className="w-32 h-32" src={`/assets/avatar.jpg`}></img>
                </div>
                <label className="text-3xl font-bold mb-10">
                    {t('auth.login-title')}
                </label>
                <form className="w-full px-4 sm:px-10 grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('email')} className="input input-bordered" placeholder={`${t('auth.email-placeholder')}`}>

                    </input>
                    <input {...register('password')} type="password" className="input input-bordered " placeholder={`${t('auth.password-placeholder')}`}>
                    </input>
                    <div className="flex justify-between">
                        <Link to ='/auth/forgot-password'>{t('auth.forgot-password')}</Link>
                        <Link to ='/auth/signup'>{t('auth.not-registered')}</Link>
                    </div>
                    <button className={`btn btn-ghost bg-base-300 mt-4 mb-8 w-full ${loading?'loading':''} `}>{t('auth.login')}</button>
                </form>
            </div>
        </Page>
    )
}