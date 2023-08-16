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
import { useLeaveProjectMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError } from '@/utils/types';

const ProjectLeaveButton = () => {
    const { project_id } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [leaveProject] = useLeaveProjectMutation();

    const handleLeaveProject = async () => {
        await leaveProject(project_id || '')
            .unwrap()
            .then(() => {
                navigate('/app/projects');
                toast({
                    title: 'You have left the project',
                });
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
                } else if (error.status === 403) {
                    toast({
                        title: 'Manager cannot leave the project',
                        variant: 'destructive',
                    });
                    navigate('/app/projects');
                } else {
                    toast({
                        title: 'Failed to leave the project',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='bg-destructive text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600'>
                Leave Project
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-neutral-600'>
                        All the tickets assigned to you will be unassigned and you lose access to project page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-destructive hover:bg-destructive/90' onClick={handleLeaveProject}>
                        Leave
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ProjectLeaveButton;
