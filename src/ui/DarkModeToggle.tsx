import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import Button from './Button'
import { useDarkMode } from '../context/DarkModeContext'

export default function DarkModeToggle() {
    const {
        isDarkMode,
        toggleDarkMode,
    }: { isDarkMode: boolean; toggleDarkMode: () => void } = useDarkMode()

    return (
        <Button $variation="secondary" onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Button>
    )
}
