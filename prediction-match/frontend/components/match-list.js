import { useUser } from '@/context/UserContext';
import Match from './match';

export default function MatchList({ matches, predictions }) {
    const { user } = useUser();

    return (
        <div className=''>
            {user && <div className='text-xl font-semibold mb-4 text-center text-white underline'>{user.username} Match List</div>}
            <div className='space-y-3'>
                {matches.map(match => (
                    <Match
                        predictions={predictions}
                        matchData={match}
                        key={match._id} />
                ))}
            </div>
        </div>
    )
}



