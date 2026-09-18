import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}




function App() {
  const [user, setUser] = React.useState(() => JSON.parse(localStorage.getItem('imsUser') || 'null'));

  const logout = () => {
    localStorage.removeItem('imsToken');
    localStorage.removeItem('imsUser');
    setUser(null);
  };

  return (
    <div className="App">
      {user && <Navbar title="IMS" user={user} onLogout={logout}></Navbar>}

      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/products" element={<ProtectedRoute user={user}><Products /></ProtectedRoute>} />
          <Route path="/insertproduct" element={<ProtectedRoute user={user}><InsertProduct /></ProtectedRoute>} />
          <Route path="/updateproduct/:id" element={<ProtectedRoute user={user}><UpdateProduct /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register onLogin={setUser} />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;
