import { t } from 'i18next';
import PropTypes from 'prop-types';
import { Link,useNavigate } from 'react-router-dom';

AccountMenu.propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    onClose:PropTypes.func,
    logout:PropTypes.func,
}
export default function AccountMenu({ user, isAuthenticated,logout,onClose }) {
    const navigate = useNavigate();
    return (
        <div className="grid gap-2 w-full ">
            {isAuthenticated && user &&
                <>
                    {/* profile */}
                    <Link onClick={onClose} to = {`/user/profile`} className = {`btn btn-ghost btn-sm flex justify-start`}>{t('menu.profile')}</Link>
                    <Link onClick={onClose} to = {`/user/billing-address`} className = {`btn btn-ghost btn-sm flex justify-start`}>{t('menu.billing-address')}</Link>
                    {/* logout */}
                    <button onClick={()=>{onClose(); logout(); navigate('/',{replace:true});}} className = {`btn btn-ghost btn-sm flex justify-start`}>{t('menu.logout')}</button>
                </>
            }
        </div>
    )
}