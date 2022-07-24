import { PayPalButton } from "react-paypal-button-v2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import useCurrencyRate from "../../hook/useCurrencyRate";
import { t } from "i18next";
import { fShortDate, strNumber } from "../../utils/uFormatter";
import { API_PAYMENT, SEND_PUT_REQUEST } from "../../utils/API";
import { clearBasketFromStore } from "../../store/action/basketAction";

PayPalDlg.propTypes = {
    orderInfo: PropTypes.object,
    children: PropTypes.node,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    deliveryOption: PropTypes.string,
    billingAddress: PropTypes.object,
}
export default function PayPalDlg({ orderInfo, onCancel, billingAddress, onSuccess, deliveryOption,children }) {
    const currencyRate = useCurrencyRate();
    const [option, setOption] = useState();
    const [total, setTotal] = useState(parseFloat(orderInfo.total).toFixed(2));
    const [complete, setComplete] = useState(false);
    const [invoice, setInvoice] = useState({});
    const { carts } = useSelector((state) => state.basket);
    const [loading, setLoading] = useState(false);
    const [buttonReady, setButtonReady] = useState(false);
    const handleApprove = async (details, data) => {

        const transation = {
            transactionId: details.id,
            carts: JSON.stringify(carts),
            status: details.status,
            billingAddress: JSON.stringify(billingAddress),
            result: JSON.stringify(details),
            deliveryType: deliveryOption,
            mode: 'paypal',
            total:details?.purchase_units[0]?.amount?.value,
            currency:details?.purchase_units[0]?.amount?.currency_code
        }
        console.log(details)
        setInvoice(details);
        setComplete(true);
        setOption(null);
        clearBasketFromStore();

        // return;
        SEND_PUT_REQUEST(API_PAYMENT.putTransaction, transation).then(res => {
            setLoading(false)
            // onSuccess();
            
        }).catch(err => {
            // onSuccess();
            setLoading(false)
        });

        // const captured = await actions.order.capture();
        // console.log(captured);
        // if (captured.payer.name) {
        //     console.log(captured?.payer?.name.given_name)
        //     onSuccess();
        // }
    }
    useEffect(() => {
        if (currencyRate?.paypalCurrency) {
            if (currencyRate.paypalCurrency === "MNT") {
                setTotal(parseFloat((orderInfo.total / currencyRate.time)).toFixed(2));
            }
            const _option = {
                "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                currency: ((currencyRate.paypalCurrency === "MNT") ? "USD" : currencyRate.paypalCurrency),
                intent: "capture",
                "data-client-token": process.env.REACT_APP_PAYPAL_CLIENT_TOKEN,
            };
            setOption(_option)
        }

    }, [currencyRate, orderInfo]);
    return (
        <Modal title={'Pay With PayPal'} onCancel={complete?onSuccess:onCancel} >
            <div className="flex flex-col gap-4 min-h-[400px]">
                <div className="w-[340px] sm:w-[400px]">
                    {children}
                </div>
                {
                    complete && invoice &&
                    <div className="flex flex-col p-2 gap-2">
                        <h3 className="font-bold">
                            Status:{invoice.status}, Created: {fShortDate(new Date(invoice.create_time))}
                        </h3>
                        <div className="flex justify-between w-full flex-col gap-4 border-b border-base-300 pb-2">
                            <label className="text-stone-500">Transaction ID:{invoice?.id}</label>
                            <label className="text-stone-500">Payer:{invoice?.payer?.email_address}</label>
                        </div>
                        {invoice?.purchase_units?.length > 0 &&

                            <div className="flex justify-between w-full flex-col gap-1"  >
                                <label className="text-stone-500">Amount:{invoice?.purchase_units[0]?.amount?.currency_code} {strNumber(parseFloat(invoice?.purchase_units[0]?.amount?.value))}</label>
                                <label className="text-stone-500">Payee:{invoice?.purchase_units[0]?.payee?.email_address}</label>
                            </div>

                        }
                    </div>

                }
                {!complete && option !== null &&
                    <PayPalButton shippingPreference="NO_SHIPPING"
                        onError={(err)=>{toast.error('Whoops!! payment error'); console.log(err)}}
                        amount={total}
                        options={option}
                        onSuccess={handleApprove}
                        onButtonReady = {()=>{setButtonReady(true)}}
                    />
                }
                {!buttonReady &&
                <div className="w-full flex flex-col justify-center gap-2 p-8">
                    <h3 className="text-base-300">Loading PayPal Script</h3>
                    <div  className="h-16 w-full animate-pulse bg-base-300" />
                </div>
                }
                <div className="w-full flex justify-center">
                    <button className={`btn btn-ghost btn-sm h-10 px-10 ${loading ? 'loading' : ''}`} onClick={!complete?onCancel:onSuccess}>Close</button>
                </div>
            </div>
        </Modal>
    )
}