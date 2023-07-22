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

const ProjectDeleteButton = () => {
    const handleDeleteProject = () => {
        console.log('delete project');
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

export default ProjectDeleteButton;
