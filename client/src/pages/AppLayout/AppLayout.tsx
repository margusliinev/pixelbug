import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Navbar, SidebarDesktop, SidebarMobile } from '@/components';
import { getUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            const { isAuth } = await dispatch(getUser()).unwrap();
            if (isAuth) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };
        void fetchUser();
    }, [dispatch]);

    if (isAuthenticated === undefined) return null;

    if (!isAuthenticated) return <Navigate to='/auth/login' />;

    return (
        <div className='grid lg:grid-cols-sidebar-layout'>
            <SidebarDesktop isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <SidebarMobile isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
