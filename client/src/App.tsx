import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout, Dashboard, Home, HomeLayout, Login, Profile, Projects, Register, Tickets, Users } from './pages';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />
                </Route>
                <Route path='app' element={<AppLayout />}>
                    <Route index element={<Navigate to='dashboard' />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='projects' element={<Projects />} />
                    <Route path='tickets' element={<Tickets />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='users' element={<Users />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
