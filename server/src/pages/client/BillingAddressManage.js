import { t } from "i18next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import BillingAddress from "../../sections/basket/BillingAddress";
import { API_CLIENT, SEND_DELETE_REQUEST, SEND_GET_REQUEST } from "../../utils/API";
import BillingAddressDlg from "../dialogs/BillingAddressDlg";

export default function BillingAddressManage() {
    const [visibleBillingDialog, setVisibleBillingDialog] = useState(false);
    const [billingAddress, setBillingAddress] = useState([]);
    const [updated, setUpdated] = useState(true);
    const onUpdateAddress = () => {
        setVisibleBillingDialog(false)
        setUpdated(true);
    }
    const onDeleteAddress = async(id)=>{
        const result = await SEND_DELETE_REQUEST(API_CLIENT.user.deleteBillingAddress,id);
        if(!result.status === 200){
            toast.error(result?.message || "Server Error")
        }
        setUpdated(true)
    }
    useEffect(() => {
        const load = async () => {
            SEND_GET_REQUEST(API_CLIENT.user.getBillingAddress).then(res => {
                setUpdated(false)
                if (res.status === 200) {
                    setBillingAddress(res.data);
                }
                else {
                    toast.error(res.message);
                }
            }).catch(err => {
                setUpdated(false)
                console.log(err)
            })
        }
        if (updated)
            load();
    }, [updated]);

    return (
        <Page title="billing & address" className="mt-24 flex w-full flex-col mb-10">
            {/* breadcrumbs */}
            <div className="breadcrumbs  bg-base-300 absolute w-full left-0 px-6 ">
                <ul>
                    <li>
                        <Link to="/" >{t('words.home')}</Link>
                    </li>
                    <li>
                        <Link to="/user/profile" >{t('menu.profile')}</Link>
                    </li>
                    <li>
                        <label>{t('menu.billing-address')}</label>
                    </li>
                </ul>
            </div>
            <div className="w-full flex justify-center mt-12">
                <BillingAddress BILLING_ADDRESS = {billingAddress} onSuccess = {onUpdateAddress} onDelete={onDeleteAddress} >
                </BillingAddress>
            </div>
            <div className="flex justify-center w-full">
                <button className="btn btn-ghost btn-sm btn-wide" onClick={() => setVisibleBillingDialog(true)}>
                    + {t('shopping.add-billing-address')}
                </button>
            </div>
            {visibleBillingDialog &&
                <BillingAddressDlg onSuccess={onUpdateAddress} onCancel={() => setVisibleBillingDialog(false)}></BillingAddressDlg>
            }
        </Page>
    )
}