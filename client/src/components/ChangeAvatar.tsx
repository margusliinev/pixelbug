import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/utils/hooks';
import { User } from '@/utils/types';
import { avatarFormSchema } from '@/utils/zodSchemas';

const ChangeAvatar = () => {
    const { user } = useAppSelector((store) => store.user);
    const { profile_picture, username } = user as User;

    const form = useForm<z.infer<typeof avatarFormSchema>>({
        resolver: zodResolver(avatarFormSchema),
        defaultValues: {
            profile_picture: '',
        },
    });

    return (
        <Form {...form}>
            <form className='flex items-center gap-6 mt-3 mb-6'>
                <Avatar className='w-24 h-24'>
                    <AvatarImage src={profile_picture} />
                    <AvatarFallback className='text-2xl bg-neutral-200'>{username.charAt(0)}</AvatarFallback>
                </Avatar>
                <FormField
                    name='profile_picture'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                htmlFor='profile_picture'
                                className='bg-primary text-white p-3 rounded-md block w-fit transition-colors hover:bg-primary-hover-dark cursor-pointer'
                            >
                                Change Avatar
                            </FormLabel>
                            <FormDescription className='tracking-tight'>JPG or PNG. 1MB max.</FormDescription>
                            <FormMessage />
                            <Input type='file' id='profile_picture' accept='image/*' {...field} className='hidden' />
                        </FormItem>
                    )}
                ></FormField>
            </form>
        </Form>
    );
};

export default ChangeAvatar;
