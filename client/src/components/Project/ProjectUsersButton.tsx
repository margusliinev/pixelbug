import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import z from 'zod';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
} from '@/components/ui';
import { useGetProjectUsersQuery, useUpdateProjectUsersMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError, User } from '@/utils/types';
import { manageProjectUsersFormSchema } from '@/utils/zodSchemas';

import { SpinnerButton } from '../../components';
import { useToast } from '../ui/use-toast';

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

const ProjectUsersButton = () => {
    const { project_id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [updateProjectUsers, { isLoading }] = useUpdateProjectUsersMutation();
    const { data } = useGetProjectUsersQuery(project_id || '');
    const [search, setSearch] = useState(searchState);
    const [users, setUsers] = useState(usersState);
    const [open, setOpen] = useState(false);

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

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updated_users = users.project_users.map((user) => user.user_id).filter((user_id) => user_id !== data?.manager_id);
        await updateProjectUsers({ updated_users, project_id: project_id || '' })
            .unwrap()
            .then((res) => {
                if (res.success) {
                    form.reset();
                    toast({
                        title: 'Successfully updated project users',
                    });
                    setOpen(false);
                }
            })
            .catch(async (error: DefaultAPIError) => {
                if (error.status === 401) {
                    await dispatch(logoutUser());
                    navigate('/auth/login');
                }
                toast({
                    title: 'Failed to update the users',
                    description: 'Please try again later',
                    variant: 'destructive',
                });
            });
    };

    if (!data) {
        return <main>No data</main>;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='bg-neutral-700 text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-800'>
                Manage Users
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Users</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={submitForm} className='grid space-y-6' noValidate>
                        <Command>
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
                            <CommandList className={users && 'rounded-md bg-white z-50 mt-2 w-full border'}>
                                {!data ? (
                                    <CommandEmpty>No users found</CommandEmpty>
                                ) : (
                                    <>
                                        <CommandGroup heading='Project Members' className='px-3'>
                                            {users.project_users.length < 1 ? (
                                                <h2 className='text-sm text-center font-normal text-muted-foreground my-1 px-2'>
                                                    No members added to the project
                                                </h2>
                                            ) : (
                                                [...users.project_users]
                                                    .sort((userA, userB) => {
                                                        if (userA.user_id === data.manager_id) {
                                                            return -1;
                                                        } else if (userB.user_id === data.manager_id) {
                                                            return 1;
                                                        }
                                                        return 0;
                                                    })
                                                    .map((user) => {
                                                        return (
                                                            <article
                                                                key={user.user_id}
                                                                className='border-b cursor-pointer last-of-type:border-none last-of-type:mb-2 hover:bg-muted'
                                                            >
                                                                <CommandItem className='h-20'>
                                                                    <div className='flex items-center gap-2 justify-between w-full pr-6'>
                                                                        <div className='flex gap-2 xs:gap-4 items-center'>
                                                                            <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                                                                                <AvatarImage src={user.profile_picture} />
                                                                                <AvatarFallback className='text-2xl bg-neutral-200'>
                                                                                    {user.first_name && user.last_name
                                                                                        ? user.first_name.charAt(0).toUpperCase()
                                                                                        : user.username.charAt(0).toUpperCase()}
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <div>
                                                                                <div className='font-medium mb-1'>
                                                                                    {user.first_name && user.last_name
                                                                                        ? `${user.first_name} ${user.last_name}`
                                                                                        : user.username}
                                                                                </div>
                                                                                <div className='hidden xs-500:block'>{user.email}</div>
                                                                            </div>
                                                                        </div>
                                                                        {user.user_id === data.manager_id ? (
                                                                            <div className='flex items-center gap-2'>
                                                                                <div className='hidden sm:block'>Project Manager</div>
                                                                                <div className='text-white bg-orange-600 py-1 px-2 rounded-md transition-colors'>
                                                                                    <svg
                                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                                        fill='none'
                                                                                        viewBox='0 0 24 24'
                                                                                        strokeWidth='1.5'
                                                                                        stroke='currentColor'
                                                                                        className='w-6 h-6'
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap='round'
                                                                                            strokeLinejoin='round'
                                                                                            d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
                                                                                        />
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className='flex items-center gap-2'>
                                                                                <div className='hidden sm:block'>{user.job_title}</div>
                                                                                <button
                                                                                    className='text-white bg-destructive py-1 px-2 rounded-md transition-colors'
                                                                                    onClick={() => removeUser(user.user_id)}
                                                                                >
                                                                                    Del
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </CommandItem>
                                                            </article>
                                                        );
                                                    })
                                            )}
                                        </CommandGroup>
                                        <CommandGroup heading='Available Users' className='px-3'>
                                            {filteredUsers && filteredUsers.length < 1 ? (
                                                <h2 className='text-sm text-center font-normal text-muted-foreground my-1 px-2'>No users found</h2>
                                            ) : (
                                                filteredUsers.map((user) => {
                                                    return (
                                                        <article
                                                            key={user.user_id}
                                                            className='border-b cursor-pointer last-of-type:border-none last-of-type:mb-2 hover:bg-muted'
                                                        >
                                                            <CommandItem className='h-20'>
                                                                <div className='flex items-center gap-2 justify-between w-full pr-6'>
                                                                    <div className='flex gap-2 xs:gap-4 items-center'>
                                                                        <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                                                                            <AvatarImage src={user.profile_picture} />
                                                                            <AvatarFallback className='text-2xl bg-neutral-200'>
                                                                                {user.first_name && user.last_name
                                                                                    ? user.first_name.charAt(0).toUpperCase()
                                                                                    : user.username.charAt(0).toUpperCase()}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                            <div className='font-medium mb-1'>
                                                                                {user.first_name && user.last_name
                                                                                    ? `${user.first_name} ${user.last_name}`
                                                                                    : user.username}
                                                                            </div>
                                                                            <div className='hidden xs-500:block'>{user.email}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex items-center gap-2'>
                                                                        <div className='hidden sm:block'>{user.job_title}</div>
                                                                        <button
                                                                            className='text-white bg-primary py-1 px-2 rounded-md transition-colors hover:bg-primary-hover-dark'
                                                                            onClick={() => addUser(user.user_id)}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </CommandItem>
                                                        </article>
                                                    );
                                                })
                                            )}
                                        </CommandGroup>
                                    </>
                                )}
                            </CommandList>
                        </Command>
                        <div className='grid mt-4'>
                            <Button type='submit' className='w-full xs-550:w-32 justify-self-end'>
                                {isLoading ? <SpinnerButton /> : 'Update Users'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectUsersButton;
