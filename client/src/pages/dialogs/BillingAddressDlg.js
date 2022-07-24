import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import { API_CLIENT, SEND_PUT_REQUEST } from "../../utils/API";


export default function BillingAddressDlg({ onCancel,address,onSuccess }) {
    
    const {pairModels} = useSelector((state)=>state.shopping);
    const [supportCountries, setSupportCountries] = useState([]);

    const defaultValues = useMemo(()=>({
        type:address?.type||"home",
        fullName:address?.fullName||"",
        phoneNumber:address?.phoneNumber||"",
        address:address?.address||"",
        town:address?.town||"",
        state:address?.state||"",
        zip:address?.zip||"",
        country:address?.country||"all",
        isDefault:address?.isDefault||false,
    }),[address]); 
    const {handleSubmit, register} = useForm(defaultValues);
    const onSubmit = async (data)=>{
      
        SEND_PUT_REQUEST(API_CLIENT.user.putBillingAddress,data).then(res=>{
            if(res.status === 200){
                onSuccess();
                toast.success(res?.message);
            }
            else{
                toast.error(res?.message)
            }
            
        }).catch(err=>{
            console.log(err)
            toast.error('Server Error');
        })
    }
    useEffect(() => {
        setSupportCountries(pairModels?.filter(pair=>pair.type === 'support-country'));
    }, [pairModels]);
    return (
        <Modal title={'Billing Address'} onCancel={onCancel}  >
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <label className="label cursor-pointer">
                        <input type="radio" className="radio" defaultChecked  value = 'home' {...register('type')} ></input>
                        <span className="label-text ml-2">{t('words.home')}</span>
                    </label>
                    <label className="label cursor-pointer">
                        <input type="radio" className="radio" value = 'office' {...register('type')} ></input>
                        <span className="label-text ml-2" >{t('words.office')}</span>
                    </label>
                </div>
                <div className="flex gap-2 justify-between w-72 sm:w-96">
                    <input required className="input input-bordered w-1/2" placeholder="Full Name"  {...register('fullName')}></input>
                    <input required className="input input-bordered w-1/2" placeholder="Phone Number"  {...register('phoneNumber')}></input>
                </div>
                <input className="input input-bordered" placeholder="Address" required {...register('address')}></input>
                <div className="flex gap-2 justify-between w-72 sm:w-96">
                    <input className="input input-bordered w-1/3" required placeholder="Town/City"  {...register('town')}></input>
                    <input className="input input-bordered  w-1/3"  placeholder="State"  {...register('state')}></input>
                    <input className="input input-bordered  w-1/3" placeholder="Zip/Postal Code"  {...register('zip')}></input>
                </div>
                <select className="select select-bordered"  {...register('country')}>
                    <option value='all' disabled>{t('select.country')}</option>
                    {supportCountries.map((country, index) => (
                        <option key={index} value={country.id}>{country.value}</option>
                    ))}
                </select>
                <label className="label justify-start gap-2 mb-4">
                    <input type='checkbox' className = 'checkbox checkbox-accent'  {...register('isDefault')}></input>
                    <span className="label-text">{t('checkbox.default-address')}</span>
                </label>
                <div className="flex justify-center gap-2">
                    <button type = 'submit' className="btn btn-accent btn-sm px-6">{t('words.save')}</button>
                    <button type = 'button' className="btn btn-ghost  btn-sm px-6" onClick={onCancel}>{t('words.cancel')}</button>
                </div>
            </div>
            </form>
        </Modal>
    )
}