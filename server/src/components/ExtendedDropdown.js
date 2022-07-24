import PropTypes from 'prop-types';
import React, { useState } from 'react';

ExtendedDropdown.propTypes = {
    items: PropTypes.array,
    header: PropTypes.node,
    direction: PropTypes.string,
    contentClass: PropTypes.string,
    subContent: PropTypes.node,
    skeleton: PropTypes.node,
    close:PropTypes.bool,
}
export default function ExtendedDropdown({ direction = '', header, items = [], contentClass, subContent, skeleton, close=false }) {
    return (
        <div className={`dropdown ${direction}`}>
            {header}
            {items && items.length > 0 &&
                <div className={`${close?'hidden':''} dropdown-content menu  shadow-2xl rounded-md ${contentClass} grid grid-cols-4 `}>
                    <ul className={`bg-base-300 rounded-md p-2 ${(subContent && subContent !== null) ? 'rounded-r-none' : ''}`}>
                        {items.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {item}
                                </React.Fragment>
                            )
                        })}
                    </ul>
                    {(!subContent || subContent === null) &&
                        <div className=' border-l border-base-300 col-span-3 h-full bg-base-100 rounded-md rounded-l-none p-2'>{skeleton}</div>
                    }
                
                    {subContent && subContent !== null &&
                        <div className=' border-l border-base-300 col-span-3 h-full bg-base-100 rounded-md rounded-l-none p-2'>{subContent}</div>
                    }
                </div>
            }
        </div >
    )
}