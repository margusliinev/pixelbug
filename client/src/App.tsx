import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import {
    AdminPage,
    AppLayout,
    DashboardPage,
    ErrorPage,
    HomeLayout,
    HomePage,
    LoginPage,
    ProfilePage,
    ProjectPage,
    ProjectsPage,
    RegisterPage,
    TicketPage,
    TicketsPage,
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
                    path: 'auth/register',
                    element: <RegisterPage />,
                },
                {
                    path: 'auth/login',
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
                            path: 'projects/:project_id',
                            element: <ProjectPage />,
                            errorElement: <Navigate to='/app/projects' />,
                        },
                        {
                            path: 'tickets',
                            element: <TicketsPage />,
                        },
                        {
                            path: 'tickets/:ticket_id',
                            element: <TicketPage />,
                            errorElement: <Navigate to='/app/tickets' />,
                        },
                        {
                            path: 'profile',
                            element: <ProfilePage />,
                        },
                        {
                            path: 'admin',
                            element: <AdminPage />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
