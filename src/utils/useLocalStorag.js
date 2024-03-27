import { useState, useEffect } from 'react'

function getSavedValue(key, initialValue) {
    let savedValue = localStorage.getItem(key)
    console.log("localStorage.getItem(key) ===> ", typeof (savedValue), savedValue)
    try {
        if (key === 'userInfo') {
            savedValue = JSON.parse(localStorage.getItem(key))
        }

    }
    catch (e) {

    }

    if (savedValue) return savedValue

    //if the intial state value maybe it was a function ()=>{}
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}
export function clearStorage() {
    localStorage.clear()
}

export default function useLocalStorage(key, initialValue = localStorage.getItem(key)) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })
    let newValue = ''
    if (typeof (value) == "object") {
        newValue = JSON.stringify(value)
    } else {
        newValue = value
    }

    useEffect(() => {
        localStorage.setItem(key, newValue)
    }, [key, value, newValue])

    return [value, setValue]
}