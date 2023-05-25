import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import useStore from './store';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';


function App() {
  // getting user info from useStore
  const userInfo = useStore((state) => state.userInf)
  

  return (
    <Router>
          <div className="app ">
            <Routes>
              
          
              <Route path="/" element={<HomePage/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/product/:id" element={<ProductListPage/>}/>
              {/* show admin oage if use risAmin is true */}
              {userInfo.isAdmin && <Route path="/admin" element={<AdminPage/>}/>}
              
              
            </Routes>
          </div>
        </Router>
  );
}

export default App;
