import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { DesktopSidebar, MobileSidebar, Navbar } from '@/components';
import { getUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            console.log('1');
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

    if (!isAuthenticated) return <Navigate to='/login' />;

    return (
        <div className='grid lg:grid-cols-sidebar-layout'>
            <DesktopSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <MobileSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
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
