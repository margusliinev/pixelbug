import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetAllTicketsQuery } from '@/features/api/apiSlice';

import { SpinnerSearch } from '..';

const NavbarSearch = () => {
    const [isSearchboxOpen, setIsSearchboxOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { data, status } = useGetAllTicketsQuery(debouncedSearchTerm, { refetchOnMountOrArgChange: true, skip: searchTerm === '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(delay);
        };
    }, [searchTerm]);

    return (
        <div className='relative flex w-full gap-2 ring-1 ring-border py-2 px-3 sm:py-2 sm:px-2 rounded-full'>
            <label htmlFor='search' className='text-gray-500 ml-1 hidden xs:flex xs:items-center'>
                <div className='w-4 grid place-items-center'>
                    {status === 'pending' ? (
                        <SpinnerSearch />
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='2'
                            stroke='currentColor'
                            className='h-4 w-4'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>
                    )}
                </div>
            </label>
            <div className='w-full'>
                <input
                    type='text'
                    name='search'
                    id='search'
                    placeholder='Search'
                    className='w-full text-sm focus:outline-none'
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={() => setIsSearchboxOpen(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setIsSearchboxOpen(false);
                        }, 100);
                    }}
                />
                <div
                    className={
                        isSearchboxOpen && debouncedSearchTerm !== ''
                            ? 'absolute bg-white top-12 w-full border rounded-lg right-0 max-h-48 overflow-y-auto'
                            : 'hidden'
                    }
                >
                    {data && data.tickets.length > 0 ? (
                        data.tickets.map((ticket) => {
                            return (
                                <Link
                                    to={`/app/tickets/${ticket.ticket_id}`}
                                    className='block capitalize text-sm p-3 transition-colors hover:bg-gray-100'
                                    key={ticket.ticket_id}
                                >
                                    <span className='text-neutral-500'>Ticket: </span>
                                    {ticket.title}
                                </Link>
                            );
                        })
                    ) : (
                        <article className='capitalize text-sm p-3'>No results</article>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavbarSearch;
