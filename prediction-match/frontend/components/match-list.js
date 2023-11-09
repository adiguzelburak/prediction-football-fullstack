import React from 'react'
import Match from './match'

export default function MatchList({ matches }) {
    return (
        <div className=''>
            <div className='text-xl font-semibold mb-8 text-center'>Buraks Match Prediction List</div>
            <div className='space-y-5'>
                {matches.map(match => (
                    <Match matchData={match} key={match._id} />
                ))}
            </div>
        </div>
    )
}
