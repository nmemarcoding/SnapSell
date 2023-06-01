import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import useStore from './store';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import CartPage from './pages/CartPage/CartPage';
import OrderReview from './pages/OrderReview/OrderReview';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import OrderHistory from './pages/OrderHistory/OrderHistory';


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
              {userInfo.isAdmin ? (<Route path="/admin" element={<AdminPage />} />
                ) : ( <Route path="/admin" element={<Navigate to="/" replace />} />)}
              {/* cartPage */}
              <Route path="/cart" element={<CartPage/>}/>
              {/* <OrderReview page */}
              <Route path="/orderreview" element={<OrderReview/>}/> 
              {/* rout OrderDetails */}
              <Route path="/orderdetails" element={<OrderDetails/>}/> 
              {/* route orderHistory */}
              <Route path="/orderhistory" element={<OrderHistory/>}/>
            </Routes>
          </div>
        </Router>
  );
}

export default App;
