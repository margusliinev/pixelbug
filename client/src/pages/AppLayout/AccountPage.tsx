import { AccountInfo, AccountPassword, AccountProfile } from '@/components';

const AccountPage = () => {
    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-gray-100'>
            <AccountInfo />
            <AccountPassword />
            <AccountProfile />
        </main>
    );
};

export default AccountPage;
