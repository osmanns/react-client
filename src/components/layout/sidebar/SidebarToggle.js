import style from "styled-components"

const ButtonToggle = style.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border: none;
    box-shadow: 0 -1px 0 0 rgba(255, 255, 255 / 10%);
    color: var(--color-primary);
    cursor: pointer;
`; 

function SidebarToggle(props) {
    return (
        <ButtonToggle {...props} onClick={() => props.setCompact(Number(!props.compact))} >
             <ion-icon name="chevron-forward-outline"></ion-icon>
        </ButtonToggle>
    )
}

export default SidebarToggle
