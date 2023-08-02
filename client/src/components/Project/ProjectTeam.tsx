import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { ProjectAPIResponse, User } from '@/utils/types';

const ProjectTeam = ({ data }: { data: ProjectAPIResponse }) => {
    return (
        <section className='grid gap-4 my-2 px-2'>
            <header className='mb-2'>
                <h1 className='text-2xl font-semibold mb-2 capitalize'>Project Team</h1>
                <hr />
            </header>
            <h2 className='text-xl font-semibold mb-2'>Manager:</h2>
            <div className='flex items-center gap-2'>
                <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                    <AvatarImage src={data.project.manager.profile_picture} />
                    <AvatarFallback className='text-2xl bg-neutral-200'>
                        {data.project.manager.first_name && data.project.manager.last_name
                            ? data.project.manager.first_name.charAt(0).toUpperCase()
                            : data.project.manager.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className='font-medium'>
                        {data.project.manager.first_name && data.project.manager.last_name
                            ? `${data.project.manager.first_name} ${data.project.manager.last_name}`
                            : data.project.manager.username}
                    </p>
                    <div className='hidden xs-500:block'>{data.project.manager.email}</div>
                </div>
            </div>
            <section>
                {data.project.users.length < 1 ? null : (
                    <>
                        <h2 className='text-xl font-semibold mb-2'>Developers:</h2>
                        <div className='grid md:grid-cols-2 2xl:grid-cols-3 gap-6'>
                            {data.project.users.map((user: User) => {
                                return (
                                    <article key={user.user_id}>
                                        <div className='flex items-center gap-2'>
                                            <Avatar className='w-12 h-12 xs-550:w-16 xs-550:h-16 rounded-full'>
                                                <AvatarImage src={user.profile_picture} />
                                                <AvatarFallback className='text-2xl bg-neutral-200'>
                                                    {user.first_name && user.last_name
                                                        ? user.first_name.charAt(0).toUpperCase()
                                                        : user.username.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className='font-medium mb-1'>
                                                    {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
                                                </div>
                                                <div className='hidden xs-500:block'>{user.email}</div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </>
                )}
            </section>
        </section>
    );
};

export default ProjectTeam;
