import logo from '../assets/logo.svg';
import { SidebarLinks } from '.';

const DesktopSidebar = () => {
    return (
        <aside className='z-0 hidden min-h-screen w-72 border-r lg:block'>
            <div className='sticky'>
                <div className='flex h-20 items-center gap-2 px-8 py-4'>
                    <img src={logo} alt='logo' className='h-10 w-10' />
                    <h1 className='text-xl font-semibold text-emerald-800'>PixelBug</h1>
                </div>
                <div className='h-full px-4 py-8'>
                    <SidebarLinks />
                </div>
            </div>
        </aside>
    );
};

export default DesktopSidebar;
