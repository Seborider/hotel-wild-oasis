import styled from 'styled-components'
import React, {
    cloneElement,
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useState,
} from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import { useOutsideClick } from '../hooks/useOutsideClick'

interface ModalProps {
    children: ReactNode
    onClose?: () => void
    name?: string
}

interface OpenProps {
    children: ReactElement
    opens?: string
}

interface ContextProps {
    openName: string
    close: () => void
    open: (opensWindowName: string) => void
}

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-500);
    }
`

const ModalContext = createContext<ContextProps>({
    openName: '',
    close: () => {},
    open: () => {},
})

function Modal({ children }: ModalProps) {
    const [openName, setOpenName] = useState('')
    const close = () => setOpenName('')
    const open = (opensWindowName: string) => setOpenName(opensWindowName)

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    )
}

function Open({ children, opens }: OpenProps) {
    const { open } = useContext(ModalContext)
    return cloneElement(children, { onClick: () => open(opens!) })
}

function isReactElement(child: ReactNode): child is ReactElement {
    return React.isValidElement(child)
}

function Window({ children, name }: ModalProps) {
    const { openName, close } = useContext(ModalContext)
    const ref = useOutsideClick(close)

    if (name !== openName) return null

    const content = isReactElement(children)
        ? cloneElement(children, { onCloseModal: close })
        : children

    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>
                <div>{content}</div>
            </StyledModal>
        </Overlay>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
