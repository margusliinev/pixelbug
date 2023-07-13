import { Outlet } from 'react-router-dom';

import { DesktopSidebar } from '@/components';

import { Navbar } from '../../components';

const AppLayout = () => {
    return (
        <div className='grid md:grid-cols-sidebar-layout'>
            <DesktopSidebar />
            <div>
                <Navbar />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
