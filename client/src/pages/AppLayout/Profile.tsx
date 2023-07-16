import { ChangePassword, PersonalInformation } from '@/components';

const Profile = () => {
    return (
        <main>
            <PersonalInformation />
            <hr className='m-4' />
            <ChangePassword />
        </main>
    );
};

export default Profile;
