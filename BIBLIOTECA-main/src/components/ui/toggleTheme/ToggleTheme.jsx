import { useContext } from "react"
import { Button } from "react-bootstrap"

import { ThemeContext } from "../../../services/themeContext/Theme.context"
import { THEMES } from "../../../services/themeContext/ThemeContextProvider.consts"
import { useTranslate } from "../../../hooks/useTranslate/useTranslate"

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const translate = useTranslate();

    return (
        <Button onClick={toggleTheme} className="me-3 my-3">

            {theme === THEMES.LIGHT ?
                translate("dark_theme_change") :
                translate("light_theme_change")}
        </Button>
    )
}

export default ToggleTheme