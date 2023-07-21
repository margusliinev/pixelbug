import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { useAppSelector } from '@/utils/hooks';
import { ProjectAPIResponse, User } from '@/utils/types';

import { ManageProjectUsers } from '../components';

const ProjectTeam = ({ data }: { data: ProjectAPIResponse }) => {
    const { user } = useAppSelector((store) => store.user);
    return (
        <div className='shadow-project-card p-4 grid gap-4 my-4 rounded-md max-w-xl'>
            <div className='flex justify-between'>
                <h1 className='text-4xl font-semibold'>Project Team</h1>
                {user?.user_id === data.project.manager.user_id && <ManageProjectUsers />}
            </div>
            <hr />
            <section>
                <h2 className='font-semibold text-xl'>Manager:</h2>
                <div className='flex items-center gap-4 py-2'>
                    <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                        <AvatarImage src={data.project.manager.profile_picture} />
                        <AvatarFallback className='text-2xl bg-neutral-200'>{data.project.manager.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className='font-medium'>{`${data.project.manager.first_name} ${data.project.manager.last_name}`}</p>
                </div>
            </section>
            <section>
                {data.project.users.length < 1 ? null : (
                    <>
                        <h2 className='font-semibold text-xl'>Developers:</h2>
                        <div className='grid gap-4'>
                            {data.project.users.map((user: User) => {
                                return (
                                    <article key={user.user_id}>
                                        <div className='flex gap-2 xs:gap-4 items-center justify-between'>
                                            <div className='flex items-center gap-2 py-2'>
                                                <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                                                    <AvatarImage src={user.profile_picture} />
                                                    <AvatarFallback className='text-2xl bg-neutral-200'>{user.username.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className='font-medium mb-1'>
                                                        {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
                                                    </div>
                                                    <div className='hidden xs-500:block'>{user.email}</div>
                                                </div>
                                            </div>
                                            <div className='hidden sm:block'>{user.job_title}</div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default ProjectTeam;
