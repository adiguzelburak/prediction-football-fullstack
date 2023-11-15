import React, { useEffect, useState } from 'react'
import Match from './match'

export default function MatchList({ matches, predictions }) {
    const [userInfo, setUserInfo] = useState()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUserInfo(user)
    }, [])


    return (
        <div className=''>
            {userInfo && <div className='text-xl font-semibold mb-4 text-center'>{userInfo.username} Match List</div>}
            <div className='font-medium text-center mb-6'>
                <div className='text-blue-500'>*** User's predictions *** </div>
                <div className='text-green-500'>*** Matches Official Result ***</div>
            </div>
            <div className='space-y-5'>
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



