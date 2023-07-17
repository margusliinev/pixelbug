import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLogoutMutation, useUpdateUserPictureMutation } from '@/features/api/apiSlice';
import { setUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { DefaultAPIError, User } from '@/utils/types';

import { Spinner } from '.';
import { Button } from './ui/button';

const ChangeAvatar = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAppSelector((store) => store.user);
    const [logout] = useLogoutMutation();
    const [updateUserPicture, { isLoading }] = useUpdateUserPictureMutation();
    const dispatch = useAppDispatch();
    const { profile_picture, username } = user as User;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef(null);

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
                        setSelectedFile(null);
                        dispatch(setUser(res.user));
                        toast({
                            title: 'Profile picture successfully updated',
                        });
                    }
                })
                .catch((error: DefaultAPIError) => {
                    if (error.status === 401) {
                        dispatch(setUser(null));
                        logout(undefined).finally(() => {
                            navigate('/');
                        });
                    }
                });
        }
    };

    return (
        <form className='flex items-center gap-6 mt-3 mb-6' onSubmit={handleSubmit}>
            <Avatar className='w-24 h-24'>
                <AvatarImage src={profile_picture} />
                <AvatarFallback className='text-2xl bg-neutral-200'>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className='tracking-tight text-sm mb-2 text-neutral-600'>JPG or PNG. 0.5 MB max.</p>
                <div className='flex items-center gap-2'>
                    <Input
                        ref={inputRef}
                        type='file'
                        name='profile_picture'
                        id='profile_picture'
                        accept='image/*'
                        className='w-56'
                        onChange={handleFileChange}
                    />
                    <Button type='submit' className='w-16 p-5'>
                        {isLoading ? <Spinner /> : 'Save'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ChangeAvatar;
