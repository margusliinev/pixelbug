import { ProfileAccount, ProfileInfo, ProfilePassword } from '@/components';

const ProfilePage = () => {
    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <ProfileInfo />
            <ProfilePassword />
            <ProfileAccount />
        </main>
    );
};

export default ProfilePage;
