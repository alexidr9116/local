import { t } from "i18next";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { ASSETS_URL } from "../../utils/API";

export default function ForgotPassword() {
    return (
        <Page className="flex w-full justify-center mt-20 pb-10" title="Forgot Password">
            <div className="flex rounded-lg border border-base-300 w-11/12 sm:w-[450px]  flex-col items-center ">
                {/* avatar */}
                <div className="rounded-full w-32 h-32 -mt-14 overflow-hidden mb-10 shadow-lg ">
                    <img alt="avatar" className="w-32 h-32" src={`/assets/avatar.jpg`}></img>
                </div>
                <label className="text-3xl font-bold mb-10">
                    {t('auth.forgot-password')}
                </label>
                <label className="px-6 break-all font-bold mb-8 
                ">
                    <span>{t('auth.forgot-description')}</span>
                </label>
                <form className="w-full px-6 grid gap-6">
                    <input type = 'email' className="input input-bordered" placeholder={`${t('auth.email')}`}>
                    </input>
                    <div className="flex justify-between">
                        <Link to ='/auth/login'>{t('auth.already-registered')}</Link>
                        <Link to ='/auth/signup'>{t('auth.not-registered')}</Link>
                    </div>
                    <button className="btn btn-ghost bg-base-300 mt-4 mb-8 w-full">{t('auth.submit')}</button>
                </form>
            </div>
        </Page>
    )
}