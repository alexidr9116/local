import { forwardRef } from "react";
import PropTypes from 'prop-types';


const Modal = forwardRef(({ children, title = '', onCancel, onSuccess, ...other }, ref) => {
    return (
        <div className={`modal modal-open bg-base-300/0 `} ref={ref} {...other}>
            <div className=" fixed inset-0 bg-base-300/80" onClick={onCancel} />
            <div className='z-50 bg-base-100 rounded-xl py-5 px-3 max-h-screen  overflow-y-auto'>
                <div className="flex flex-col gap-4 h-full">
                <p className="text-center font-bold text-xl mb-4">{title} </p>
                    {children}
                  
                </div>


            </div>
        </div>
    )
});

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
};
export default Modal;