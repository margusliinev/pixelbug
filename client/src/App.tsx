import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import {
    AccountPage,
    AppLayout,
    DashboardPage,
    DevelopersPage,
    ErrorPage,
    HomeLayout,
    HomePage,
    LoginPage,
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
                            path: 'projects/:project_id/ticket/:ticket_id',
                            element: <TicketPage />,
                            errorElement: <Navigate to='/app/projects/:project_id' />,
                        },
                        {
                            path: 'account',
                            element: <AccountPage />,
                        },
                        {
                            path: 'developers',
                            element: <DevelopersPage />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
