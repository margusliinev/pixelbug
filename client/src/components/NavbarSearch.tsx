const NavbarSearch = () => {
    return (
        <div className='flex w-full gap-2 ring-1 ring-border py-2 px-3 sm:py-2 sm:px-2 rounded-full'>
            <label htmlFor='search' className='text-gray-500  hidden xs:block'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' className='h-5 w-5'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                </svg>
            </label>
            <input type='text' name='search' id='search' placeholder='Search...' className='w-full text-sm focus:outline-none' />
        </div>
    );
};

export default NavbarSearch;
