import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import useStore from './store';


function App() {
  // getting user info from useStore
  const userInfo = useStore((state) => state.userInf)
  

  return (
    <Router>
          <div className="app ">
            <Routes>
              
                  
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<Login/>}/>
              {/* show admin oage if use risAmin is true */}
              {userInfo.isAdmin && <Route path="/admin" element={<h1>Admin</h1>}/>}
              
              
            </Routes>
          </div>
        </Router>
  );
}

export default App;
