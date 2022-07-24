import axios, { SERVER_ADDRESS } from "./axios";
const API_DASHBOARD = {
}
const API_PAYMENT = {
    putTransaction:'api/e-shop/transaction/put',
    createQpayInvoice:'api/e-shop/transaction/qpay',
    getTransaction:'api/e-shop/transaction/get/',
    getUserTransactions:'api/e-shop/transaction/user',
}
const API_ADMIN = {
}
const API_CLIENT = {
    category:{
        getAll:"api/e-shop/category/get-all"
    },
    product:{
        getHot:"api/e-shop/product/get-hot",
        getAll:"api/e-shop/product/get-all",
        getDetail:"api/e-shop/product/get-detail/",
        getProductsByIds:"api/e-shop/product/gets-by-ids/",
        putReview:"api/e-shop/review/product",
        getDeliveryOrders:"api/e-shop/product/get-orders",
    },
    common:{
        getLastCurrencyRate:"api/e-shop/common/last-currency-rate",
        getPairs:'api/e-shop/common/pair-data',
    },
    user:{
        putBillingAddress:"api/e-shop/user/put-billing-address",
        getBillingAddress:"api/e-shop/user/get-billing-address",
        deleteBillingAddress:"api/e-shop/user/delete-billing-address",
    }
}
const API_WAREHOUSE = {
}
const API_AUTH = {
    register:"api/e-shop/auth/register",
    login:"api/e-shop/auth/login",
    account:"api/e-shop/auth/my-account",
    resendAuthMail:"api/e-shop/auth/send-verify-mail"
}

const ASSETS_URL = {
    root: SERVER_ADDRESS,
    
    image: `${SERVER_ADDRESS}uploads/images/`,
    products:`${SERVER_ADDRESS}uploads/images/products/`,
    ezo:`https://elec.mn/img/products/`,
}
const SEND_PUT_REQUEST = async(url, data) => {
    const response = await axios.put(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
}
const SEND_POST_REQUEST_WITH_FORM_DATA = async(url, data) => {
    const response = await axios.post(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
}
const SEND_DELETE_REQUEST = async(url, id, callback) => {
    const response = await axios.delete(`${url}/${id}`);
    if (response.status === 200) {
        return response.data;
    } else {
        return [];
    }
}
const SEND_POST_REQUEST = async(url, data, callbak) => { 
    const response = await axios.post(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
    // });


}
const SEND_GET_REQUEST = async(url, data) => {
    const response = await axios.get(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
}
export {
    SEND_DELETE_REQUEST,
    SEND_POST_REQUEST,
    SEND_GET_REQUEST,
    SEND_PUT_REQUEST,
    SEND_POST_REQUEST_WITH_FORM_DATA,
    ASSETS_URL, 
    API_AUTH,
    API_ADMIN,
    API_CLIENT,
    API_DASHBOARD,
    API_PAYMENT,
    API_WAREHOUSE
};