import { useState } from "react"
import { TranslateContext } from "./Translate.context";

const initialLanguage = localStorage.getItem("language");

const TranslateContextProvider = ({ children }) => {
    const [language, setLanguage] = useState(initialLanguage ?? "es");

    console.log(navigator.language)

    const handleChangeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    }

    return (
        <TranslateContext
            value={{ language, handleChangeLanguage }}>
            {children}
        </TranslateContext>
    )
}

export default TranslateContextProvider