import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Schools from './components/Schools';
import School from './components/School';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Header />
      <div className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:id" element={<School />} />
          <Route path="/schools/create" element={<School />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App;
