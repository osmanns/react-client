import { useState } from "react"

import style from "styled-components"

import Header from "./Header"
import Sidebar from "./Sidebar"

const Grid = style.div`
  display: grid;
  grid-template:
    "nav header" min-content
    "nav main" 1fr / min-content 1fr;
  min-height: 100vh;
`;

const GridSidebar = style.div`
  grid-area: nav;
  z-index: 2000;
`;

const GridHeader = style.header`
  grid-area: header;
`;

const GridMain = style.main`
  grid-area: main;
`;

function Layout({ children, ...rest }) {

    const [showNav, setShowNav] = useState(0);
    const toggle = () => setShowNav(Number(!showNav));

    return (
        <Grid {...rest}>
            
            <GridSidebar>
                <Sidebar visible={showNav} close={toggle} />
            </GridSidebar>
            
            <GridHeader>
                <Header toggle={toggle} />
            </GridHeader>

            <GridMain>
                {children}
            </GridMain>

        </Grid>
    )
}

export default Layout;
