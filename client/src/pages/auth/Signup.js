import { useState } from "react";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Page from "../../components/Page";
import useAuth from "../../hook/useAuth";

export default function Signup() {
    const {signup} = useAuth();
    const navigate = useNavigate();
    const [loading,setLoading ] = useState(false);
    const defaultValues = {
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        password:"",
        passwordConfirm:"",
    }
    const {register, handleSubmit,setValue} = useForm(defaultValues);

    const onSubmit = async(data)=>{
        setLoading(true)
        if(data.password!==data.passwordConfirm){
            setValue('password','');
            setValue('passwordConfirm','');
            return;
        }
        signup(data).then(response=>{
            setLoading(false)
            if(response.status === 200){
                toast.success(response.message);
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
        <Page className="flex w-full justify-center mt-20 pb-10" title="Register">
            <div className="flex rounded-lg border border-base-300 w-11/12 sm:w-[450px]  flex-col items-center ">
                {/* avatar */}
                <div className="rounded-full w-32 h-32 -mt-14 overflow-hidden mb-10 shadow-lg ">
                    <img alt="avatar" className="w-32 h-32" src={`/assets/avatar.jpg`}></img>
                </div>
                <label className="text-3xl font-bold mb-10">
                    {t('auth.signup-title')}
                </label>
                <form className="w-full px-4 sm:px-10 grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between gap-4 w-full">
                        <input {...register('firstName')} required className="input input-bordered w-1/2" placeholder={`${t('auth.first-name')}`}></input>
                        <input {...register('lastName')} required className="input input-bordered w-1/2" placeholder={`${t('auth.last-name')}`}></input>
                    </div>
                    <input className="input input-bordered" required placeholder={`${t('auth.mobile-placeholder')}`} {...register('phone')}>
                    </input>
                    <input className="input input-bordered" type={'email'}  required  {...register('email')} placeholder={`${t('auth.email')}`}>
                    </input>
                    <div className="flex justify-between gap-4 w-full">
                        <input {...register('password')}  required minLength={4} type = "password" className="input input-bordered w-1/2" placeholder={`${t('auth.password-placeholder')}`}></input>
                        <input {...register('passwordConfirm')} required minLength={4} type = "password" className="input input-bordered w-1/2" placeholder={`${t('auth.confirm-placeholder')}`}></input>
                    </div>
                    <div className="flex justify-between">
                        <Link to ='/auth/login'>{t('auth.already-registered')}</Link>
                    </div>
                    <button className={`btn btn-ghost bg-base-300 mb-8 w-full mt-4 ${loading?'loading':''} `}>{t('auth.register')}</button>
                </form>
            </div>
        </Page>
    )
}