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
import { useDeleteProjectMutation } from '@/features/api/apiSlice';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { DefaultAPIError } from '@/utils/types';

const ProjectDeleteModal = () => {
    const { project_id } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [deleteProject] = useDeleteProjectMutation();

    const handleDeleteProject = async () => {
        await deleteProject({ project_id: Number(project_id) })
            .unwrap()
            .then(() => {
                navigate('/app/projects');
                toast({
                    title: 'Project deleted',
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
                        title: 'You are not authorized to delete this project',
                        variant: 'destructive',
                    });
                    navigate('/app/projects');
                } else {
                    toast({
                        title: 'Failed to delete the project',
                        description: 'Please try again later',
                        variant: 'destructive',
                    });
                }
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='bg-destructive text-white transition-colors w-fit px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600'>
                Delete Project
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-neutral-600'>
                        This action cannot be undone. This will permanently delete the project and all the tickets associated with it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-destructive hover:bg-destructive/90' onClick={handleDeleteProject}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ProjectDeleteModal;
