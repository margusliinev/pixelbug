import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import {
    AppLayout,
    DashboardPage,
    ErrorPage,
    HomeLayout,
    HomePage,
    LoginPage,
    ProfilePage,
    ProjectsPage,
    RegisterPage,
    TicketsPage,
    UsersPage,
} from './pages';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomeLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'register',
                    element: <RegisterPage />,
                },
                {
                    path: 'login',
                    element: <LoginPage />,
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
                            element: <DashboardPage />,
                        },
                        {
                            path: 'projects',
                            element: <ProjectsPage />,
                        },
                        {
                            path: 'tickets',
                            element: <TicketsPage />,
                        },
                        {
                            path: 'profile',
                            element: <ProfilePage />,
                        },
                        {
                            path: 'users',
                            element: <UsersPage />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
