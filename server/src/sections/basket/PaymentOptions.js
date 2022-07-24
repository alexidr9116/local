import { t } from "i18next";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { strPrice } from "../../utils/uFormatter";
import useAuth from '../../hook/useAuth';
import PayPalDlg from "../../pages/dialogs/PayPalDlg";
import { API_PAYMENT, SEND_GET_REQUEST, SEND_POST_REQUEST, SEND_PUT_REQUEST } from "../../utils/API";
import toast from "react-hot-toast";
import CustomDrawer from "../../components/CustomDrawer";
import { clearBasketFromStore } from "../../store/action/basketAction";


PaymentOptions.propTypes = {
    billingAddress: PropTypes.object,
    orderInfo: PropTypes.object,
}

const DELIVERY_OPTIONS = [
    { key: 'Free', title: 'shopping.standard-delivery', desc: 'shopping.standard-delivery-desc' },
    { key: 'Fast', title: 'shopping.fast-delivery', desc: 'shopping.fast-delivery-desc' },
]
const PAYMENT_OPTIONS = [
    { key: 'Crypto', title: 'shopping.crypto', desc: 'shopping.crypto-desc', support: 'global' },
    { key: 'PayPal', title: 'shopping.paypal', desc: 'shopping.paypal-desc', support: 'global' },
    { key: 'QPay', title: 'shopping.qpay', desc: 'shopping.qpay-desc', support: 'local' },

]
const OrderSummary = ({ orderInfo, deliveryOption, paymentOption }) => {

    return (
        <>
            <label className="text-lg font-bold mb-4">{t('shopping.order-summary')}</label>
            <div className="flex flex-col w-full gap-2 border-b border-base-300 pb-4">
                <div className="flex justify-between">
                    <label className="">{t('shopping.sub-total')}</label>
                    <label className="">{strPrice(orderInfo.total, orderInfo.currency)}</label>
                </div>
                <div className="flex justify-between">
                    <label className="">{t('shopping.shipping')}</label>
                    <label className="">{deliveryOption}</label>
                </div>
                <div className="flex justify-between">
                    <label className="">{t('shopping.payment-option')}</label>
                    <label className="">{paymentOption}</label>
                </div>
            </div>
        </>
    )
}
export default function PaymentOptions({ billingAddress, orderInfo }) {
    const { user } = useAuth();
    const { language } = useSelector((state) => state.setting);
    const { carts } = useSelector((state) => state.basket);
    const [deliveryOption, setDeliveryOption] = useState('Free');
    const [paymentOption, setPaymentOption] = useState('Crypto');
    const [visiblePay, setVisiblePay] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [qpaylist, setQpaylist] = useState([]);
    const [qpayInvoiceId, setQpayInvoiceId] = useState('');
    const navigate = useNavigate();

    const handlePaymentOption = (option) => {
        setVisiblePay(false);
        setPaymentOption(option.key);
    }
    const createQPayInvoice = () => {
        SEND_POST_REQUEST(API_PAYMENT.createQpayInvoice, { total: orderInfo.total }).then(res => {
            if (res.status === 200) {
                setQpaylist(res.data.qpay.urls);
                setQpayInvoiceId(res.data.qpay.invoice_id);

                //
                const transation = {
                    transactionId: res.data.qpay.invoice_id,
                    carts: JSON.stringify(carts),
                    status: "PENDING",
                    billingAddress: JSON.stringify(billingAddress),
                    result: JSON.stringify(res.data.qpay),
                    deliveryType: deliveryOption,
                    mode: 'qpay',
                    currency: 'MNT',
                    total: orderInfo.total,
                }
                // complete transaction
                SEND_PUT_REQUEST(API_PAYMENT.putTransaction, transation).then(res1 => {

                }).catch(err1 => {
                    console.log(err1)
                })
            }
            else {
                toast.error(res?.message || "Whoops! can not get qpay invoice data");
            }

        }).catch(err => {
            console.log(err)
        });
    }
    const handleOrder = () => {
        if (!user || !user?.active) {
            navigate('/auth/verify-email', { replace: true });
        }
        else {
            setVisiblePay(true)
            if (paymentOption.toLowerCase() === 'qpay') {
                createQPayInvoice();
            }
        }
    }

    const checkQpayInvoice = () => {
        setCompleted(true);
        toast.success(`Wait a moment, now checking transaction id ${qpayInvoiceId}`);
        setTimeout(() => {

            SEND_GET_REQUEST(`${API_PAYMENT.getTransaction}${qpayInvoiceId}`).then(res => {
                if (res.status === 200) {
                    if (res.data && res.data.status.toLowerCase() === ("completed")) {
                        clearBasketFromStore();
                    }
                    else {
                        setCompleted(false);
                    }
                    console.log(res.data);
                }
                else {
                    setCompleted(false);
                }
            }).catch(err => {
                console.log(err);
                setCompleted(false);
                toast.error('Whoops!, Intenal Server Error');
            })
        }, 2000);
    }
    return (
        <div className="flex w-full flex-col sm:flex-row max-w-4xl gap-2 justify-between p-4">
            <div className="flex flex-col gap-8 flex-1">
                {/* Delivery Option */}
                <label className="font-bold">{t('shopping.delivery-option')}</label>
                <div className="flex gap-2 w-full flex-col sm:flex-row justify-between mb-8">
                    {DELIVERY_OPTIONS.map((option, index) => (
                        <div onClick={() => (setDeliveryOption(option.key))} key={index} className={` bg-base-200 rounded-lg flex gap-4 p-4 items-center sm:w-1/2 cursor-pointer`}>
                            <input onChange={() => { }} checked={option.key === deliveryOption}
                                value={option.key} type="radio" className="radio radio-accent" name="delivery-option"></input>
                            <div className="flex-col flex ">
                                <label className="font-bold">
                                    {t(option.title)}
                                </label>
                                <label className="text-sm">
                                    {t(option.desc)}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Payment Method Option */}
                <label className="font-bold">{t('shopping.payment-option')}</label>
                <div className="flex gap-2 w-full flex-col mb-4">
                    {PAYMENT_OPTIONS.map((option, index) => {
                        if (option.support === 'global' || (option.support === 'local' && language.key === 'mn')) {
                            return (
                                <div onClick={() => handlePaymentOption(option)} key={index} className={`bg-base-200 rounded-lg flex gap-4 p-4 items-center cursor-pointer`}>
                                    <input value={option.key} checked={option.key === paymentOption} onChange={() => { }} type="radio" className="radio radio-accent" name="payment-option"></input>
                                    <div className="flex-col flex">
                                        <label className="font-bold">
                                            {t(option.title)}
                                        </label>
                                        <label className="text-sm">
                                            {t(option.desc)}
                                        </label>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return null;
                        }
                    }
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-72 pl-2">
                {/* billing info */}
                <label className="text-lg font-bold mb-4">{t('shopping.billing-address')}</label>
                <label className="">{billingAddress?.fullName}({billingAddress?.type})</label>
                <label className="">{billingAddress?.address}{billingAddress?.pair?.value}</label>
                <label className="">{billingAddress?.phoneNumber}</label>

                <div className="w-full border-b border-base-300 h-4 mb-12"></div>
                {/* order summary */}
                <OrderSummary deliveryOption={deliveryOption} orderInfo={orderInfo} paymentOption={paymentOption} />

                <div className="flex justify-between mb-4">
                    <label className="">{t('shopping.total')}</label>
                    <div className="flex flex-col gap-2">
                        <label className="text-right">{strPrice(orderInfo.total, orderInfo.currency)}</label>
                        {deliveryOption.toLocaleLowerCase() !== "free" &&
                            <label className="italic text-xs">
                                need money for shipping
                            </label>
                        }
                    </div>

                </div>
                <div className="flex w-full justify-center py-4">
                    <button onClick={handleOrder} className="btn btn-accent text-white" disabled={completed}>{t('shopping.complete-order')}</button>
                </div>
            </div>
            {/* paypal */}
            {visiblePay && paymentOption.toLocaleLowerCase() === 'paypal' &&
                <PayPalDlg
                    orderInfo={orderInfo}
                    onSuccess={() => { setVisiblePay(false); setCompleted(true); }}
                    onCancel={() => setVisiblePay(false)}
                    billingAddress={billingAddress}
                    deliveryOption={deliveryOption}
                >
                    <OrderSummary
                        deliveryOption={deliveryOption}
                        orderInfo={orderInfo}
                        paymentOption={paymentOption} />
                </PayPalDlg>
            }
            {visiblePay && paymentOption.toLocaleLowerCase() === 'qpay' && qpaylist.length > 0 &&
                <CustomDrawer
                    onClose={() => {
                        if (qpayInvoiceId !== "") {
                            setVisiblePay(false);
                            checkQpayInvoice();
                        }
                        else {

                        }
                    }}
                    open={visiblePay}
                    side="bottom"
                    className="bg-base-100 p-8 h-2/3 "
                >
                    {qpaylist.map((item, index) =>
                        <div className={`flex gap-5 items-center mb-3 border-b border-base-300 cursor-pointer}`}
                            key={index}
                        >
                            <div>
                                <img alt='logo' src={item.logo}
                                    width={50} height={50}
                                />
                            </div>
                            <a className="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap" href={item.link}>

                                <label>{item.name}</label><br />
                                <label className="text-sm">{item.description}</label>
                            </a>
                        </div>
                    )}
                </CustomDrawer>
            }
        </div>
    )
}