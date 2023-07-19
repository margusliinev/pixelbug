import logo from '../assets/logo.svg';
import { SidebarLinks } from '.';

const MobileSidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <>
            <div
                className={
                    isSidebarOpen
                        ? 'fixed h-screen w-screen transition-opacity duration-700 z-50 bg-gray-900/80 lg:hidden'
                        : 'fixed h-screen w-screen transition-opacity duration-700 -z-50 opacity-0 -ml-96 lg:hidden'
                }
            ></div>
            <aside
                className={
                    isSidebarOpen
                        ? 'min-h-screen fixed bg-white z-50 w-64 inset-0 ml-0 lg:hidden transition-all duration-300 sm:w-72'
                        : 'min-h-screen fixed bg-white z-50 w-64 inset-0 -ml-96 lg:hidden transition-all duration-300 sm:w-72'
                }
            >
                <button
                    type='button'
                    onClick={() => setIsSidebarOpen(false)}
                    className={
                        isSidebarOpen
                            ? 'absolute -right-8 top-7 opacity-100 transition-opacity duration-300 text-white'
                            : 'absolute -right-8 top-7 opacity-0 transition-opacity duration-300 text-white'
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>
                <div>
                    <div className='flex h-20 items-center gap-2 px-8 py-4'>
                        <img src={logo} alt='logo' className='h-10 w-10' />
                        <h1 className='text-xl font-semibold text-emerald-800'>PixelBug</h1>
                    </div>
                    <SidebarLinks isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            </aside>
        </>
    );
};

export default MobileSidebar;
