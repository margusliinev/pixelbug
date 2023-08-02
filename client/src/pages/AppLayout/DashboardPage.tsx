import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { useGetStatsQuery } from '@/features/api/apiSlice';
import { useAppSelector } from '@/utils/hooks';

const DashboardPage = () => {
    const { data } = useGetStatsQuery(undefined);
    const { user } = useAppSelector((store) => store.user);

    console.log(data);

    const getStatsFormSchema = z.object({
        project: z.string(),
    });

    const form = useForm<z.infer<typeof getStatsFormSchema>>({
        resolver: zodResolver(getStatsFormSchema),
        defaultValues: {
            project: data?.projects[0].project_id ? data?.projects[0].project_id.toString() : '',
        },
    });

    const submitForm = (values: z.infer<typeof getStatsFormSchema>) => {
        if (getStatsFormSchema.safeParse(values).success) {
            console.log(values);
        }
    };

    if (!user) {
        return;
    }

    return (
        <main className='px-6 py-10 xs:px-8 lg:px-12 xl:px-16 min-h-screen-minus-nav bg-emerald-50'>
            <header>
                <h1 className='font-medium mb-1'>Good Morning, {user.first_name}!</h1>
                <h2 className='text-sm text-neutral-600'>Here&apos;s what&apos;s happening with your projects today.</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className='grid space-y-6' noValidate>
                        <FormField
                            control={form.control}
                            name='project'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Developer</FormLabel>
                                    <Select
                                        onValueChange={(value: string | ChangeEvent<Element>) => field.onChange(value)}
                                        defaultValue={field.value}
                                        disabled={data && data.projects.length < 1}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        data && data.projects.length < 1
                                                            ? 'There are no developers in your project'
                                                            : 'Assign ticket to a developer'
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='max-h-40 overflow-y-auto'>
                                            {/* {data &&
                                                data.projects.map((project, index) => {
                                                    return (
                                                        <SelectItem key={index} value={`${project.project_id}`} className='capitalize'>
                                                            {project.title}
                                                        </SelectItem>
                                                    );
                                                })} */}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </header>
        </main>
    );
};

export default DashboardPage;
