
import { breakpoints as bp } from "../../GlobalStyle"
import styled from "styled-components"

const Grid = styled.div`
    height: 40px;
    top: 0;
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    align-items: stretch;
    position: sticky;
    overflow: hidden;
    padding: 0 20px;
    border-bottom: 1px solid silver;
    background-color: #ffffff;
    > div {
        display: flex;
        align-items: center;
    }
    &:first-child {
        ion-icon {
            font-size: 1.5rem;
            display: none;
            cursor: pointer;
            @media(max-width: ${bp.desktop}) {
                display: inline;
            }
        }
    }
`;

function Header({ toggle }) {
    return (
        <Grid>
            <div>
                <ion-icon name="grid-outline" onClick={toggle}></ion-icon>
            </div>
            <div></div>
            <div>User</div>
        </Grid>
    )
}

export default Header;