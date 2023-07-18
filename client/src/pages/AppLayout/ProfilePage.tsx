import { ChangePassword, DeleteAccount, PersonalInformation } from '@/components';

const ProfilePage = () => {
    return (
        <main>
            <PersonalInformation />
            <hr className='m-4' />
            <ChangePassword />
            <hr className='m-4' />
            <DeleteAccount />
        </main>
    );
};

export default ProfilePage;
