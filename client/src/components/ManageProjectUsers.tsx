import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import z from 'zod';

import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    FormLabel,
} from '@/components/ui';
import { useGetProjectUsersQuery } from '@/features/api/apiSlice';
import { User } from '@/utils/types';
import { manageProjectUsersFormSchema } from '@/utils/zodSchemas';

interface Users {
    project_users: User[];
    other_users: User[];
}

const usersState: Users = {
    project_users: [],
    other_users: [],
};

const searchState = {
    searchTerm: '',
};

const ManageProjectUsers = () => {
    const { project_id } = useParams();
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState(usersState);
    const [search, setSearch] = useState(searchState);
    const { data } = useGetProjectUsersQuery(project_id || '');
    const filteredUsers = users.other_users.filter((user) => {
        const searchTerm = search.searchTerm.toLowerCase();
        return (
            user.job_title.toLowerCase().includes(searchTerm) ||
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    });

    useEffect(() => {
        if (data) {
            setUsers({ project_users: data.projectUsers, other_users: data.otherUsers });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch({ searchTerm: searchValue });
    };

    const addUser = (user_id: number) => {
        const user = users.other_users.find((user) => user.user_id === user_id);
        if (user) {
            setUsers({
                project_users: [...users.project_users, user],
                other_users: users.other_users.filter((user) => user.user_id !== user_id),
            });
        }
    };

    const removeUser = (user_id: number) => {
        const user = users.project_users.find((user) => user.user_id === user_id);
        if (user) {
            setUsers({
                project_users: users.project_users.filter((user) => user.user_id !== user_id),
                other_users: [...users.other_users, user],
            });
        }
    };

    const form = useForm<z.infer<typeof manageProjectUsersFormSchema>>({
        resolver: zodResolver(manageProjectUsersFormSchema),
    });

    const submitForm = (values: z.infer<typeof manageProjectUsersFormSchema>) => {
        if (manageProjectUsersFormSchema.safeParse(values).success) {
            console.log(values);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='bg-primary text-white transition-colors w-fit h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover-dark'>
                Manage Users
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Users</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
                        <Command>
                            <FormLabel className='mb-1 px-1'>Developers</FormLabel>
                            <div className='flex items-center border-b px-2'>
                                <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                                <input
                                    placeholder='Find by name, email, or job title'
                                    type='text'
                                    className='flex h-10 w-full rounded-md py-3 text-sm outline-none placeholder:text-neutral-500'
                                    value={search.searchTerm}
                                    onChange={handleChange}
                                />
                            </div>
                            <CommandList className={users && 'rounded-md bg-white z-50 mt-2 w-full border h-[500px]'}>
                                {users && users.project_users.length < 1 ? null : (
                                    <section>
                                        <CommandGroup heading='Project Users' className='px-3'>
                                            {users &&
                                                users.project_users.map((user) => {
                                                    return (
                                                        <article
                                                            key={user.user_id}
                                                            className='border-b cursor-pointer last-of-type:border-none last-of-type:mb-2'
                                                        >
                                                            <CommandItem className='h-20'>
                                                                <div className='grid items-center gap-2 justify-between w-full pr-6 sm:flex'>
                                                                    <div>
                                                                        <div className='font-medium mb-1'>
                                                                            {user.first_name && user.last_name
                                                                                ? `${user.first_name} ${user.last_name}`
                                                                                : user.username}
                                                                        </div>
                                                                        <div>{user.email}</div>
                                                                    </div>
                                                                    <div className='flex items-center gap-2'>
                                                                        <div>{user.job_title}</div>
                                                                        <button
                                                                            className='text-destructive rounded-md transition-all hover:shadow-button-hover hover:shadow-destructive'
                                                                            onClick={() => removeUser(user.user_id)}
                                                                        >
                                                                            <svg
                                                                                xmlns='http://www.w3.org/2000/svg'
                                                                                fill='none'
                                                                                viewBox='0 0 24 24'
                                                                                strokeWidth='2'
                                                                                stroke='currentColor'
                                                                                className='w-6 h-6'
                                                                            >
                                                                                <path
                                                                                    strokeLinecap='round'
                                                                                    strokeLinejoin='round'
                                                                                    d='M6 18L18 6M6 6l12 12'
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </CommandItem>
                                                        </article>
                                                    );
                                                })}
                                        </CommandGroup>
                                        <CommandGroup heading='Add developers to project' className='px-3'>
                                            {users &&
                                                filteredUsers.map((user) => {
                                                    return (
                                                        <article
                                                            key={user.user_id}
                                                            className='border-b cursor-pointer last-of-type:border-none last-of-type:mb-2'
                                                        >
                                                            <CommandItem className='h-20'>
                                                                <div className='grid items-center gap-2 justify-between w-full pr-6 sm:flex'>
                                                                    <div>
                                                                        <div className='font-medium mb-1'>
                                                                            {user.first_name && user.last_name
                                                                                ? `${user.first_name} ${user.last_name}`
                                                                                : user.username}
                                                                        </div>
                                                                        <div>{user.email}</div>
                                                                    </div>
                                                                    <div className='flex items-center gap-2'>
                                                                        <div>{user.job_title}</div>
                                                                        <button
                                                                            className='text-primary rounded-md transition-all hover:shadow-button-hover hover:shadow-primary'
                                                                            onClick={() => addUser(user.user_id)}
                                                                        >
                                                                            <svg
                                                                                xmlns='http://www.w3.org/2000/svg'
                                                                                fill='none'
                                                                                viewBox='0 0 24 24'
                                                                                strokeWidth='2'
                                                                                stroke='currentColor'
                                                                                className='w-6 h-6'
                                                                            >
                                                                                <path
                                                                                    strokeLinecap='round'
                                                                                    strokeLinejoin='round'
                                                                                    d='M12 4.5v15m7.5-7.5h-15'
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </CommandItem>
                                                        </article>
                                                    );
                                                })}
                                        </CommandGroup>
                                    </section>
                                )}
                            </CommandList>
                        </Command>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ManageProjectUsers;
