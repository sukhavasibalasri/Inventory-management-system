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
  Route
} from 'react-router-dom';




function App() {
  const [user, setUser] = React.useState(() => JSON.parse(localStorage.getItem('imsUser') || 'null'));

  const logout = () => {
    localStorage.removeItem('imsToken');
    localStorage.removeItem('imsUser');
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar title="IMS" user={user} onLogout={logout}></Navbar>

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onLogin={setUser} />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;
