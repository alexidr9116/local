import PropTypes from 'prop-types';
import React, { useState } from 'react';

DropdownMenu.propTypes = {
    items: PropTypes.array,
    content: PropTypes.node,
    header: PropTypes.node,
    direction: PropTypes.string,
    contentClass: PropTypes.string,
    close:PropTypes.bool,
}
export default function DropdownMenu({ direction = '', header, items = [], contentClass, content, close = false }) {
    

    const handleClose=(e)=>{
        e.preventDefault();

    }
    return (
        <div className={`dropdown ${direction}`}>
            {header}
            {items && items.length > 0 && Array.isArray(items) &&
                <ul tabIndex="0" className={`${close?'hidden':''} dropdown-content menu p-2 shadow-lg bg-base-200 rounded-md w-52 ${contentClass}`}>
                    {items.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {item}
                            </React.Fragment>
                        )
                    })}
                </ul>
            }
            {content &&
                <div tabIndex="0" className={`${close?'hidden':''} dropdown-content menu p-2 shadow-lg bg-base-200 rounded-md w-52 ${contentClass}`}>
                    {content}
                </div>
            }
        </div >
    )
}