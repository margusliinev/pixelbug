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
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteUserMutation, useLogoutMutation } from '@/features/api/apiSlice';

const DeleteAccount = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [deleteUser] = useDeleteUserMutation();
    const [logout] = useLogoutMutation();

    const handleDeleteUser = async () => {
        await deleteUser(undefined).unwrap();
        toast({
            title: 'Account Successfully Deleted!',
        });
        await logout(undefined);
        navigate('/');
    };

    return (
        <form className='grid gap-1 px-6 py-6 xs:px-8 lg:px-12 xl:px-16 pb-12'>
            <h1 className='mb-1 text-2xl font-semibold'>Delete account</h1>
            <p className='text-sm text-gray-600 mb-4 max-w-sm'>
                No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this
                account will be deleted permanently.
            </p>
            <AlertDialog>
                <AlertDialogTrigger className='bg-destructive hover:bg-destructive/90 text-white max-w-fit text-sm py-3 px-4 rounded-md'>
                    Yes, delete my account
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

export default DeleteAccount;
