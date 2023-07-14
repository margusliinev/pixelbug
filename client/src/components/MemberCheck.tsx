import { Link } from 'react-router-dom';

const MemberCheck = ({ to, question, text }: { to: string; question: string; text: string }) => {
    return (
        <div className='mt-4 flex justify-center gap-2'>
            <p>{question}</p>
            <Link to={to} className='transition-color hover:text-primary-hover-dark text-base font-semibold text-primary'>
                {text}
            </Link>
        </div>
    );
};

export default MemberCheck;
