import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';

function App() {
  return (
    <Router>
          <div className="app ">
            <Routes>
              
                  
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<Login/>}/>
              
              
              
            </Routes>
          </div>
        </Router>
  );
}

export default App;
