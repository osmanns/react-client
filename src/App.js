import { BrowserRouter as Router, Switch, Route  } from "react-router-dom"

// ================================================================= Pages
import Layout from './components/layout/Layout';
import Home from './pages/Home'
import SearchProduct from './pages/SearchProduct'
import ProductList from './pages/ProductList'
import CreateProduct from './pages/CreateProduct'
import About from './pages/About'

// ================================================================= CSS
import GlobalStyle from './GlobalStyle';

function App() {
  return (
      <Router>
        <GlobalStyle />
          {/* <Layout> */}
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/searchProduct' component={SearchProduct}/>
              <Route path='/productList' component={ProductList}/>
              <Route path='/createProduct' component={CreateProduct}/>    
              <Route path='/about' component={About}/>    
            </Switch>
          {/* </Layout> */}
      </Router>
  );
}

export default App;
