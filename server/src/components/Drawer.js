import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  side: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  className: PropTypes.string,
  children: PropTypes.node,
}

export default function Drawer({ open, onClose, side = 'left', className = '', children }) {

  const classes = getClasses(side);
  return (
    <div className={`h-full  inset-0 absolute overflow-x-hidden flex z-40 ${open ? 'fixed' : 'hidden'} `}>
      
      <div className={`transition-all z-50 bg-base-100 overflow-y-auto h-full ${classes} ${className}`}>
       
          {children}
           
      </div>
      <div className='bg-black opacity-80 w-full h-full'onClick={onClose}></div>
    </div>
  )
}

const getClasses = (side) => {
  let classNames = "";
  if (side === 'left')
    classNames = `left-0 top-0 bottom-0 max-w-screen`
  else if (side === 'right')
    classNames = `right-0 top-0 bottom-0 max-w-screen`
  else if (side === 'top')
    classNames = `left-0 top-0 right-0 max-h-screen`
  else if (side === 'bottom')
    classNames = `left-0 right-0 bottom-0 max-h-screen`
  return classNames
}