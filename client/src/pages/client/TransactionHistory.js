
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasketTableSkeleton from "../../components/skeleton/BasketSkeleton";
import { strPrice, strNumber, fShortDate } from "../../utils/uFormatter";
import Page from "../../components/Page";

import { API_PAYMENT, SEND_GET_REQUEST, } from "../../utils/API";


export default function TransactionHistory() {

    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        SEND_GET_REQUEST(API_PAYMENT.getUserTransactions).then(res => {
            setLoading(false);
            if (res.status === 200 && res.data) {
                setTransactions(res.data);
            }
        }).catch(err => {
            setLoading(false);
        })

    }, []);

    return (
        <Page title="Favorites" className="flex flex-col w-full gap-2 sm:gap-4 ">
            <div className="breadcrumbs  bg-base-300 absolute w-full left-0 px-6 overflow-x-hidden mt-24">
                <ul>
                    <li>
                        <Link to='/'>{t('words.home')}</Link>
                    </li>
                    <li>
                        <Link to='/shopping'>{t('words.shopping')}</Link>
                    </li>
                    <li>
                        <Link to='/shopping/basket'>{t('shopping.basket')}</Link>
                    </li>
                    <li>
                        <label >{t('transaction.title')}</label>
                    </li>
                </ul>
            </div>
            <div className="mt-40 w-full"></div>
            <div className="flex flex-col w-full p-4 gap-4 items-center">
                <label className="font-bold">
                    {t('shopping.transactions')}&nbsp;({transactions?.length} {t('words.items')})
                </label>
                {transactions.length === 0 &&
                    <div className="w-full sm:w-3/4 flex flex-col gap-4 items-center">
                        <img className="w-full max-w-sm h-full" alt='empty' src='/assets/empty_cart.svg'>

                        </img>
                        <label className="text-lg">No Transaction yet</label>
                    </div>
                }
                {
                    loading && <BasketTableSkeleton></BasketTableSkeleton>
                }
                {/* product list */}
                {!loading && transactions?.length > 0 &&
                    <div className="w-full overflow-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <td>
                                        {t('transaction.id')}
                                    </td>
                                    <td>
                                        {t('transaction.total')}
                                    </td>

                                    <td>
                                        {t('transaction.mode')}
                                    </td>
                                    <td>
                                        {t('transaction.status')}
                                    </td>
                                    <td>
                                        {t('transaction.created')}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className='cursor-pointer hover:text-accent' >
                                                <Link to = {`/shopping/transaction/${transaction?.transactionId}`}>
                                                    #{transaction?.transactionId}
                                                </Link>
                                            </td>
                                            <td>
                                                {strPrice(transaction?.total, transaction?.currency)}
                                            </td>

                                            <td className="uppercase">
                                                {transaction?.mode}
                                            </td>
                                            <td className="uppercase">
                                                {transaction?.status}
                                            </td>
                                            <td>
                                                {fShortDate(transaction?.createdAt)}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <tfoot>
                                <tr>

                                    <td className='text-lg font-bold text-accent text-center ' colSpan={5}>
                                        COMPLETED:{strNumber(transactions.filter(t => t.status.toLowerCase() === "completed").length)},
                                        PENDING:{strNumber(transactions.filter(t => t.status.toLowerCase() === "pending").length)}
                                    </td>

                                </tr>
                            </tfoot>
                        </table>
                    </div>
                }

            </div>
        </Page>
    )
}