import logo from '../assets/logo.svg';
import { SidebarLinks } from '.';

const DesktopSidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <aside className='z-0 hidden h-screen w-72 border-r lg:block sticky top-0'>
            <div className=''>
                <div className='flex h-20 items-center gap-2 px-8 py-4'>
                    <img src={logo} alt='logo' className='h-10 w-10' />
                    <h1 className='text-xl font-semibold text-emerald-800'>PixelBug</h1>
                </div>
                <SidebarLinks isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
        </aside>
    );
};

export default DesktopSidebar;
