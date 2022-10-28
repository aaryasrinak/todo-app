import React, { useState } from "react";

const ColorModeContext = React.createContext({
    colorMode: "light",
    setColorMode: () => {}
});

const ColorModeContextProvider = ({ children }) => {
    const [colorMode, setColorMode] = useState("light");

    return (
        <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
            {children}
        </ColorModeContext.Provider>
    );
}

export { ColorModeContext, ColorModeContextProvider };