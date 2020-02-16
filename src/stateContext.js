import React,{useState, useEffect, createContext} from 'react'
import api from './api'
export const StateContext = createContext();

export const ContextProvider = props => {
    
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(api)
        .then(res => res.json())
        .then(res => {
            setData(res)
        })
    }, [])

    return (
        <StateContext.Provider value={[data, setData]}>
            {props.children}
        </StateContext.Provider>
    )
}
 