import { ReactNode, createContext, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

interface DarkModeProviderProps {
    children: ReactNode
}

interface DarkModeContextType {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType>({
    isDarkMode: false,
    toggleDarkMode: () => {},
})

function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
        false,
        'isDarkMode'
    )

    useEffect(
        function () {
            if (isDarkMode) {
                document.documentElement.classList.add('dark-mode')
                document.documentElement.classList.remove('light-mode')
            } else {
                document.documentElement.classList.add('light-mode')
                document.documentElement.classList.remove('dark-mode')
            }
        },
        [isDarkMode]
    )

    function toggleDarkMode() {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode(): DarkModeContextType {
    const context = useContext(DarkModeContext)
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
}

export { DarkModeProvider, useDarkMode }
