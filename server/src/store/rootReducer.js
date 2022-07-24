import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";
import settingReducer from './slice/setting';
import notificationReducer from './slice/notification';
import shoppingReducer from './slice/shopping';
import filterReducer from './slice/filter';
import basketReducer from './slice/basket';

const rootPersistConfig = {
    key:'root',
    storage,
    keyPrefix:'redux-',
    whitelist:['setting','basket'],
}

const rootReducer = combineReducers({
    notification:notificationReducer,
    setting:settingReducer,
    shopping:shoppingReducer,
    filter:filterReducer,
    basket:basketReducer,
});
export {rootPersistConfig, rootReducer};