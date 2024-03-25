import React, { useContext, useReducer } from 'react'
import useLocalStorage, { clearStorage } from '../Utils/useLocalStorag'
import { useNavigate } from "react-router-dom";
import { DarkMode } from '@mui/icons-material';

const LoginInfoContext = React.createContext()
const UpdateLoginInfoContext = React.createContext()

const LangInfoContext = React.createContext()
const UpdateLangInfoContext = React.createContext()

const DarkModeContext = React.createContext()
const UpdateDarkModeContext = React.createContext()

export function useLangInfo() {
    return useContext(LangInfoContext)
}

export function useUpdateLangInfo() {
    return useContext(UpdateLangInfoContext)
}

export function useDarkMode() {
    return useContext(DarkModeContext)
}

export function useUpdateDarkMode() {
    return useContext(UpdateDarkModeContext)
}
export const ACTIONS = {
    SIGN_IN: 'sign-in',
    SIGN_OUT: 'sign-out',
    CHNG_LANG: 'Change-Language',
    CHNG_MODE: 'Change-Mode',
}

export function useLoginInfo() {
    return useContext(LoginInfoContext)
}

export function useUpdateLoginInfo() {
    return useContext(UpdateLoginInfoContext)
}
export function LoginInfoProvider({ children }) {
    const lang = !localStorage.getItem('lang') ? 'English' : localStorage.getItem('lang')
    const darkMode = !localStorage.getItem('DarkMode') ? false : localStorage.getItem('DarkMode')
    const userInfo = !localStorage.getItem('userInfo') ? '' : localStorage.getItem('userInfo')
    const authorization = !localStorage.getItem('authorization') ? '' : localStorage.getItem('authorization')
    const [darkModeStorage, setDarkModeStorage] = useLocalStorage('DarkMode', darkMode)
    const [langStorage, setLangStorage] = useLocalStorage('lang', lang)
    const [userStorage, setUserStorage] = useLocalStorage('userInfo', userInfo)
    const [authStorage, setAuthStorage] = useLocalStorage('authorization', authorization)
    const navigate = useNavigate();

    function newLangMode(langInfo) {
        if (!!langInfo) {
            setLangStorage(langInfo)
        }

        return { langInfo: langInfo }
    }
    function newDarkMode(darkMode) {
        console.log("newDarkMode ==> ", darkMode)
        setDarkModeStorage(darkMode)
        return { darkMode: darkMode }
    }

    function newLogin(userInfo, authorization) {
        setUserStorage(userInfo)
        setAuthStorage(authorization)
        navigate("/")

        return { userInfo: userInfo, authorization: authorization, login: true, date: Date.now() }
    }

    function reducer(loginData, action) {
        switch (action.type) {
            case ACTIONS.SIGN_IN:
                return newLogin(action.payload.userInfo, action.payload.authorization)
            case ACTIONS.SIGN_OUT:
                clearStorage()
                return ''
            default:
                return loginData
        }
    }
    function reducerLang(langData, action) {
        console.log("reducerLang langData, ", langData)
        console.log("reducerLang action, ", action)
        switch (action.type) {
            case ACTIONS.CHNG_LANG:
                return newLangMode(action.payload.langInfo)
            default:
                return langData
        }
    }
    function reducerMode(modeData, action) {
        console.log("reducerLang modeData, ", modeData)
        console.log("reducerLang action, ", action)
        switch (action.type) {
            case ACTIONS.CHNG_MODE:
                return newDarkMode(action.payload.darkMode)
            default:
                return modeData
        }
    }
    const [loginData, dispatch] = useReducer(reducer, { userInfo: userStorage, authorization: authStorage, login: !!userStorage && !!authStorage })
    const [langData, dispatchLang] = useReducer(reducerLang, { langStorage: langStorage })
    const [darkModeData, dispatchMode] = useReducer(reducerMode, { darkModeStorage: darkModeStorage })

    return (
        <DarkModeContext.Provider value={darkModeData}>
            <UpdateDarkModeContext.Provider value={dispatchMode}>
                <LangInfoContext.Provider value={langData}>
                    <UpdateLangInfoContext.Provider value={dispatchLang}>
                        <LoginInfoContext.Provider value={loginData}>
                            <UpdateLoginInfoContext.Provider value={dispatch}>
                                {children}
                            </UpdateLoginInfoContext.Provider >
                        </LoginInfoContext.Provider >
                    </UpdateLangInfoContext.Provider>
                </LangInfoContext.Provider>
            </UpdateDarkModeContext.Provider>
        </DarkModeContext.Provider>
    )
}