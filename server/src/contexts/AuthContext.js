import { createContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { isValidToken, setSession } from "../utils/jwt";
import { API_AUTH, SEND_GET_REQUEST, SEND_POST_REQUEST } from "../utils/API";

// -----------------------------------------

const initialState = {
    isAuthenticated:false,
    isInitialized:false,
    user:null,
}
const handlers = {
    INITIALIZE:(state,action)=>{
        
        const {isAuthenticated,user} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized:true,
            user,
        }
    },
    LOGIN:(state,action)=>{
        const {user} = action.payload;
        return {
            ...state,
            isAuthenticated:true,
            user
        }
    },
    LOGOUT:(state)=>{
        return{
            ...state,
            isAuthenticated:false,
            user:null,
        }
    }
}

const reducer = (state,action)=>(handlers[action.type]?handlers[action.type](state,action):state);

const AuthContext = createContext({
    ...initialState,
});

// -----------------------------------------

AuthProvider.propTypes = {
    children:PropTypes.node,
}
function AuthProvider({children}){
    const [state,dispatch] = useReducer(reducer,initialState);
    const login = async(email,password)=>{
        try{
            const response = await SEND_POST_REQUEST(API_AUTH.login,{email,password});
            if(response.status === 200){
                const {token,user} = response.data;
                setSession(token);
                dispatch({
                    type:'LOGIN',
                    payload:{user,}
                });
            }
            return response;
        }
        catch(err){
            console.log(err);
            return {status:500, message:'Context Error', data:err};
        }
    }
    const logout = async()=>{
        try{
            setSession(null);
            dispatch({type:'LOGOUT'});
        }
        catch(err){

            console.log(err);
        }
    }
    const signup = async(data)=>{
        try{
            const response = await SEND_POST_REQUEST(API_AUTH.register,data);
            if(response.status === 200){
                const {token,user} = response.data;
                setSession(token);
                dispatch({
                    type:'LOGIN',
                    payload:{user,}
                });
            }
            return response;
            
        }
        catch(err){
            console.log(err);
            return {status:500, message:'Context Error', data:err};
        }
    }
    const initialize = async()=>{
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            
            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);
                
                const response = await SEND_GET_REQUEST(API_AUTH.account);
                const { user } = response.data;
                
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                });
            } else {
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: 'INITIALIZE',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }

    useEffect(()=>{
        console.log("----------initialize auth context---------");
        initialize();
    },[]);

    return(
        <AuthContext.Provider value = {
            {
                ...state,
                method:'jwt',
                login,
                logout,
                signup,
                initialize,
            }
        }>
            {children}
        </AuthContext.Provider>    
    )
}
export {AuthContext,AuthProvider}