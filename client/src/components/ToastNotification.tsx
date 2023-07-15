import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/toaster';

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <main>{children}</main>
            <Toaster />
        </>
    );
}
