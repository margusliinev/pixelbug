import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage, Button, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateUserPictureMutation } from '@/features/api/apiSlice';
import { logoutUser, setUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { DefaultAPIError, User } from '@/utils/types';

import { SpinnerButton } from '..';

const AccountAvatar = () => {
    const [updateUserPicture, { isLoading }] = useUpdateUserPictureMutation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAppSelector((store) => store.user);
    const { profile_picture, username, first_name, last_name } = user as User;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('profile_picture', selectedFile);
            await updateUserPicture(formData)
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        dispatch(setUser(res.user));
                        toast({
                            title: 'Profile picture successfully updated',
                        });
                    }
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
                    } else {
                        toast({
                            title: 'Failed to update profile picture',
                            description: `${error.data.msg}`,
                            variant: 'destructive',
                        });
                    }
                })
                .finally(() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                });
        }
    };

    return (
        <form className='grid items-center gap-6 sm:flex' onSubmit={handleSubmit}>
            <Avatar className='w-24 h-24'>
                <AvatarImage src={profile_picture} />
                <AvatarFallback className='text-2xl bg-neutral-200'>
                    {first_name && last_name ? first_name.charAt(0).toUpperCase() : username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div>
                <p className='tracking-tight text-sm mb-2 text-neutral-600'>JPG or PNG. 0.5 MB max.</p>
                <div className='flex items-center gap-2'>
                    <Input
                        type='file'
                        name='profile_picture'
                        id='profile_picture'
                        accept='image/*'
                        className='w-56'
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    <Button type='submit' size={'sm'} className='w-16 p-5'>
                        {isLoading ? <SpinnerButton /> : 'Save'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AccountAvatar;
