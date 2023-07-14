import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { DesktopSidebar, MobileSidebar, Navbar } from '@/components';

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className='grid lg:grid-cols-sidebar-layout'>
            <DesktopSidebar />
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
