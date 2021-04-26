import React, { useState } from 'react';

// ================================================================= Sidebar Component
import Logo from "./sidebar/Logo";
import SidebarLinkGroup from "./sidebar/SidebarLinkGroup";
import SidebarToggle from "./sidebar/SidebarToggle"

// ================================================================= CSS
import style from "styled-components"
import { breakpoints as bp } from "../../GlobalStyle"

// ================================================================= UI
import Backdrop from "../../ui/Backdrop"

const StyledSidebar = style.nav`
    width: ${p => !p.compact ? "var(--sidebar-width)" : "60px"} ;
    height: 100vh;
    position: sticky;
    top: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    transition-property: width, transform !important;
    transition-duration: 0.3s !important;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1) !important;
    z-index: 1000;
    background-color: #467bef;
    
    &::bofore {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: #ffffff;
    }
    
    @media(max-width: ${bp.desktop}) {
        position: fixed;
        width: var(--sidebar-width);
        transform: translate3d(${(p) => p.visible ? 0 : "calc(var(--sidebar-width) - var(--sidebar-width)*2)"}, 0, 0);
        transition: transform 0.3s ${(p) => p.visible ? "cubic-bezier(0.4, 0, 1, 1)" : "cubic-bezier(0, 0, 0.2, 1)"} !important;
    }
`;

function Sidebar(props) {

    const [compact, setCompact] = useState(0);

    return (
        <>
            <Backdrop visible={props.visible} onClick={props.close} />
            <StyledSidebar compact={compact} {...props}>
                <Logo compact={compact} />
                <SidebarToggle compact={compact} setCompact={setCompact} />
                <SidebarLinkGroup compact={compact} />
            </StyledSidebar>    
        </> 
    )
}

export default Sidebar
