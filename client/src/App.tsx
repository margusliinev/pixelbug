import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AppLayout, Dashboard, Home, HomeLayout, Login, Profile, Projects, Register, Tickets, Users } from './pages';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomeLayout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: 'register',
                    element: <Register />,
                },
                {
                    path: 'login',
                    element: <Login />,
                },
                {
                    path: 'app',
                    element: <AppLayout />,
                    children: [
                        {
                            index: true,
                            element: <Navigate to='dashboard' />,
                        },
                        {
                            path: 'dashboard',
                            element: <Dashboard />,
                        },
                        {
                            path: 'projects',
                            element: <Projects />,
                        },
                        {
                            path: 'tickets',
                            element: <Tickets />,
                        },
                        {
                            path: 'profile',
                            element: <Profile />,
                        },
                        {
                            path: 'users',
                            element: <Users />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
