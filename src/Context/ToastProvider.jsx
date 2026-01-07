import { createContext, useState, useRef } from "react"
import Toast from "../components/Toast/Toast"

export  const ToastContext = createContext(null)

export default function ToastProvider({ children }) {

    const [toasts, setToasts] = useState([])
    const timeoutRef = useRef(null)


    const showToasts = (msg) => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setToasts(msg)
        timeoutRef.current = setTimeout(() => {
        showToasts(null)
    }, 3700)
    }
   
    return (
       < ToastContext.Provider value={{showToasts}}>
       {children}
       {typeof toasts === "string" && <Toast msg={toasts} />}

        </ToastContext.Provider>
       

    )
}