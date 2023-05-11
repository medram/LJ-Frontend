import { useEffect, useRef, useState } from "react"
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function CustomOffCanvas({ title="", children, isOpen, setOpen, ...props })
{
    return (
        <Offcanvas show={isOpen} onHide={() => setOpen(false)} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
