import { ReactNode } from 'react'

interface EmptyProps {
    resource: ReactNode
}

function Empty({ resource }: EmptyProps) {
    return <p>No {resource} could be found.</p>
}

export default Empty
