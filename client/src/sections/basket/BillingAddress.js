import { t } from "i18next"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

BillingAddress.propTypes = {
    onSelected: PropTypes.func,
    onDelete:PropTypes.func,
    BILLING_ADDRESS:PropTypes.array
}
export default function BillingAddress({ onSelected,onDelete, BILLING_ADDRESS = [] }) {
    
    return (
        <div className="flex flex-col max-w-xl w-full p-4 gap-4 ">
            {BILLING_ADDRESS.map((address, index) => (
                <div key={index} className="flex flex-col gap-4 border-b border-base-300 pb-4">
                    <label className="text-lg text-bold">{address.fullName}
                        <span className="text-sm text-accent">({address.type})</span>
                        {address.isDefault &&
                            <span className="badge badge-sm badge-accent text-white ml-4">Default</span>
                        }
                    </label>
                    <label >{address.address}&nbsp;{address.town}&nbsp;{address.zip}

                    </label>
                    <div className="flex justify-between w-full flex-col sm:flex-row">
                        <label className="mb-4">{address.phoneNumber}</label>
                        <div className="flex gap-2">
                            {!address.isDefault &&
                                <button className="btn btn-sm btn-outline btn-ghost" onClick={()=>onDelete(address.id)}>{t('words.delete')}</button>
                            }
                            {onSelected && <button onClick={() => (onSelected(address))} className="btn btn-sm btn-outline btn-accent">{t('shopping.delivery-address')}</button>}

                        </div>
                    </div>
                </div>
            ))
            }

            
        </div>
    )
}