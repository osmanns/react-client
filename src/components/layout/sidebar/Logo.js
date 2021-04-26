import { Link } from "react-router-dom"
import style from "styled-components"

const StyleLink = style(Link)`
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding: 0 20px 0 20px;
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    color: #ffffff;
    background-color: #467bef;

    span {
        opacity: ${p => Number(!p.compact)};
        transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
    }
    span:nth-child(2) {
        padding-left: .75rem;
    }
`;

function Logo(props) {
    return (
        <StyleLink {...props} to="/home">
            F<span>OOD</span><span>CHOICE</span>
        </StyleLink>
    )
}

export default Logo
