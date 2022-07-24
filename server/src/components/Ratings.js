import PropTypes from 'prop-types';
import { useState } from 'react';

Rating.propTypes = {
    value: PropTypes.number,
    readOnly: PropTypes.bool,
    viewText:PropTypes.bool,
    name:PropTypes.string,
    onChanged:PropTypes.func,
    size:PropTypes.string,
}
export default function Rating({ size = "md", value = 0, readOnly = false, name = 'rating-',viewText = true,onChanged }) {
    
    const [val, setVal] = useState(parseFloat(isNaN(value)?0:value));
    
    const handleChange = (e, index) => {
        
        if (!readOnly) {
            const _value = parseFloat(index/2);
            setVal(_value);
            
            if(onChanged){
                onChanged(_value);
            }
        }
    }
    
    return (<div className={`rating rating-half rating-${size}`}>
        <input type="radio" name={`${name}`} className="rating-hidden" onChange={(e) => handleChange(e, (0))}  checked = {(val <=0)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (1))} checked={(val>0 && val<=0.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (2))} checked={(val>0.5 && val<=1)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (3))} checked={(val>1 && val<=1.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (4))} checked={(val>1.5 && val<=2)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (5))} checked={(val>2 && val<=2.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (6))} checked={(val>2.5 && val<=3)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (7))} checked={(val>3 && val<=3.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (8))} checked={(val>3.5 && val<=4)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (9))} checked={(val>4 && val<=4.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (10))} checked={(val>4.5)} />
        {viewText&&<span className='ml-2'>{val}</span>}
    </div>)
}