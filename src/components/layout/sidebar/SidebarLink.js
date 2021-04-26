import { Link } from "react-router-dom"
import style from "styled-components"

const StyleLink = style(Link)`
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    padding: 0 .9rem;
    margin: .25rem .25rem;
    font-size: var(--fsize-4);
    font-weight: 500;
    color: #ffffff;
    border-radius: .65rem;
    transition: all .15s ease;
    background-color: #467bef;
    ion-icon {
        min-height: 24px;
        min-width: 24px;
        display: flex;
        align-items: center;
    }
    span {
        font-size: .938rem;
        font-weight: var(--font-medium);
        padding-left: 1.1rem; 
        line-height: 19px;
        white-space: nowrap;
        opacity: ${(p) => Number(!p.collapse)};
        transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
    }
    &:hover{
        text-decoration: none;
        background-color: #ffffff;
        color: #4361ee;
    }
    &.active {
        color: #4361ee;
    }
`;


function SidebarLink({ children, iconName, label, ...rest }) {
    return (
        <StyleLink to="/" {...rest}>
            {children || (
                <>
                    <ion-icon name={iconName}></ion-icon>
                    <span className="label">{label}</span>
                </>
            )} 
        </StyleLink>
    )
}

export default SidebarLink
