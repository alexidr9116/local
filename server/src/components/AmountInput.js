import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

AmountInput.propTypes = {
    minValue:PropTypes.number,
    maxValue:PropTypes.number,
    onChangeValue:PropTypes.func,
    defaultValue:PropTypes.number,
}

export default function AmountInput({minValue = 0, maxValue = 100, onChangeValue, defaultValue = 0}){
    
    const [value,setValue] = useState(defaultValue);
    const { themeMode } = useSelector((state) => state.setting);
    const borderColor = ((themeMode === 'light') ? 'border-stone-300' : 'border-gray-800');
    const decrease = ()=>{
        setValue(Math.max(0, value-1));
    }
    const increase = ()=>{
        if(value<maxValue)
            setValue(Math.max(0, value+1));
    }
    const handleValue = (e)=>{
        const v = parseInt(e.target.value);
        if(v >= minValue && v<=maxValue){
            setValue(v);
        }
    }
    useEffect(()=>{
        if(onChangeValue)
            onChangeValue(value)
    },[value,onChangeValue])
    return (
        <div className={`input-group  ` }>
            <button className={`btn btn-ghost ${borderColor} btn-square btn-sm md:btn-md`} onClick={decrease}>-</button>
            <input className={`input input-bordered border-l-0 border-r-0 w-16 text-right input-sm md:input-md`} value={value} onChange={handleValue}></input>
            <button className={`btn  btn-ghost ${borderColor} btn-square  btn-sm md:btn-md`} onClick={increase}>+</button>
        </div>
    )
}