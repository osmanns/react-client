import Layout from "../components/layout/Layout"
import style from "styled-components"

const Main = style.main`
    height: 100%;
`;

function Home() {
    return (
        <Layout className="home">
            <Main>
                <h4>Welcome to Home page</h4>

            </Main>
        </Layout>
    )
        
}

export default Home;