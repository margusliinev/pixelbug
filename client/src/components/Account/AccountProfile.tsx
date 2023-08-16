import { useNavigate } from 'react-router-dom';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { deleteUser, logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError } from '@/utils/types';

const AccountProfile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleDeleteUser = async () => {
        await dispatch(deleteUser())
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast({
                        title: 'Your account was successfully deleted',
                    });
                    navigate('/auth/login');
                } else if (res.msg.startsWith('Demo')) {
                    toast({
                        title: `${res.msg}`,
                        description: 'Please create an account',
                        variant: 'destructive',
                    });
                }
            })
            .catch(async (error: DefaultAPIError) => {
                if (error.status === 400 && error.data.type === 'demo') {
                    toast({
                        title: `${error.data.msg}`,
                        description: 'Please create an account',
                        variant: 'destructive',
                    });
                } else if (error.status === 401) {
                    await dispatch(logoutUser());
                    navigate('/auth/login');
                } else {
                    toast({
                        title: `Something went wrong`,
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <form className='shadow-project-card px-6 pt-4 pb-6 grid gap-4 my-4 rounded-md bg-white'>
            <h1 className='mb-1 text-2xl font-semibold'>Delete account</h1>
            <p className='text-sm text-gray-600 mb-4 max-w-sm'>
                No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this
                account will be deleted permanently.
            </p>
            <AlertDialog>
                <AlertDialogTrigger className='bg-destructive hover:bg-destructive/90 text-white max-w-fit text-sm py-3 px-4 rounded-md'>
                    Yes, Delete my account
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className='text-neutral-600'>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className='bg-destructive hover:bg-destructive/90' onClick={handleDeleteUser}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    );
};

export default AccountProfile;
