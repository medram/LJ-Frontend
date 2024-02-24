import { ReactNode } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

type CustomOffCanvasProps = {
    title: string,
    children: ReactNode,
    isOpen: boolean,
    setOpen: (status: boolean) => void,
    [rest: string]: unknown
}

export default function CustomOffCanvas({ title="", children, isOpen, setOpen, ...rest }: CustomOffCanvasProps)
{
    return (
        <Offcanvas show={isOpen} onHide={() => setOpen(false)} {...rest}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
