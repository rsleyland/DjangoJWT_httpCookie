import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.page.js';
import { Login } from './pages/Auth/Login.page.js';
import { PasswordResetChange } from './pages/Auth/PasswordResetChange.page.js';
import { Register } from './pages/Auth/Register.page.js';
import { PasswordResetRequest } from './pages/Auth/RequestPasswordReset.page.js';


function App() {
  return (
    <main>
      <Container fluid className="p-0" >
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<PasswordResetRequest />} />
            <Route path="/reset-password/:code" element={<PasswordResetChange />} />
          </Routes>
        </Router>
      </Container>
    </main>
  );
}

export default App;
