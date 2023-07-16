import { Button } from './ui/button';

const DeleteAccount = () => {
    return (
        <form className='grid gap-1 px-6 py-4 xs:px-8 lg:px-12 xl:px-16 mb-4'>
            <h1 className='mb-1 text-2xl font-semibold'>Delete account</h1>
            <p className='text-sm text-gray-600 mb-4 max-w-sm'>
                No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this
                account will be deleted permanently.
            </p>
            <Button type='submit' variant='destructive' className='max-w-fit'>
                Yes, delete my account
            </Button>
        </form>
    );
};

export default DeleteAccount;
