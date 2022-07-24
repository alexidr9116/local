import { useEffect, useMemo, useRef } from "react"; 
import { useSelector } from "react-redux";


export default function useCurrencyRate() {
    const { language } = useSelector((state) => state.setting);
    const { currencyRates } = useSelector((state) => state.shopping);
    const currencyRate = useMemo(() => ({
        currency: language?.currency || '$',
        paypalCurrency:((language?.key === "en"?"USD":(language?.key ==="ch"?"CNY":"MNT"))),
        time: (language?.key === "en" ? 1 : (language?.key === 'ch' ? currencyRates?.rmb : currencyRates?.mnt)),
    }), [language, currencyRates]);

    return currencyRate;
}