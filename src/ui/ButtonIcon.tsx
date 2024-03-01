import { ReactNode } from 'react'
import styled from 'styled-components'

interface ButtonIconProps {
    children: ReactNode
    disabled?: boolean
}

const StyledButtonIcon = styled.button`
    background: none;
    border: none;
    padding: 0.6rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-brand-600);
    }
`

export default function ButtonIcon({ children }: ButtonIconProps) {
    return <StyledButtonIcon>{children}</StyledButtonIcon>
}
