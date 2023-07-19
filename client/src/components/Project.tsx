import moment from 'moment';

import { User } from '@/utils/types';

const Project = ({
    title,
    description,
    start_date,
    end_date,
    manager,
}: {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    manager: User;
}) => {
    const start = moment(start_date).format('DD/MM/YYYY');
    const end = moment(end_date).format('DD/MM/YYYY');
    return (
        <article>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{start}</p>
            <p>{end}</p>
            <p>{manager.username}</p>
        </article>
    );
};

export default Project;
