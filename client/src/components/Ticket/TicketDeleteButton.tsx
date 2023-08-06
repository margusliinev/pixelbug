import { useNavigate, useParams } from 'react-router-dom';

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
import { useDeleteTicketMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError } from '@/utils/types';

const TicketDeleteButton = () => {
    const { project_id = '', ticket_id } = useParams<{ project_id?: string; ticket_id?: string }>();
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [deleteTicket] = useDeleteTicketMutation();

    const handleDeleteTicket = async () => {
        await deleteTicket({ ticket_id: Number(ticket_id) })
            .unwrap()
            .then(() => {
                navigate(`/app/projects/${project_id}`);
                toast({
                    title: 'Ticket was successfully deleted',
                });
            })
            .catch(async (error: DefaultAPIError) => {
                if (error.status === 401) {
                    await dispatch(logoutUser());
                    navigate('/auth/login');
                } else if (error.status === 403) {
                    toast({
                        title: 'You are not authorized to delete this ticket',
                        variant: 'destructive',
                    });
                    navigate(`/app/projects/${project_id}`);
                } else {
                    toast({
                        title: 'Failed to delete the ticket',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='bg-destructive text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600'>
                Delete Ticket
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-neutral-600'>
                        This action cannot be undone. This will permanently delete the ticket and all of its data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-destructive hover:bg-destructive/90' onClick={handleDeleteTicket}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TicketDeleteButton;
