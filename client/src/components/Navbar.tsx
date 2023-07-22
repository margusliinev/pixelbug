import { NavbarMobileMenu, NavbarSearch, NavbarUserButton } from '.';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean; setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <nav className='sticky top-0 z-20 grid h-20 w-full border-b bg-white shadow-sm'>
            <div className='flex items-center justify-between gap-4 px-6 xs:px-8 lg:px-12 xl:px-16'>
                <div className='flex items-center gap-4 w-full max-w-md'>
                    <NavbarMobileMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    <div className='h-6 w-px bg-neutral-300 lg:hidden'></div>
                    <NavbarSearch />
                </div>
                <NavbarUserButton />
            </div>
        </nav>
    );
};

export default Navbar;
