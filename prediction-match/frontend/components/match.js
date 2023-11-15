import { useUser } from '@/context/UserContext'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { Loader, Sparkle } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Image from 'next/image'


export default function Match({ matchData, predictions }) {
    const [homeScore, setHomeScore] = useState(0);
    const [guestScore, setGuestScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();

    const guessScoreHandler = (e, state) => {
        let score = parseInt(e.target.value);

        score < 12 ? state(score) : console.log('cannot be bigger than 12');
    }
    const makePrediction = (matchId) => {
        if (!user._id) {
            return;
        }
        setIsLoading(true)

        axios.post(
            `http://localhost:8000/api/predictions`, {
            homeTeamScore: homeScore,
            guestTeamScore: guestScore,
            userId: user._id,
            matchId: matchId
        })
            .then(() => setIsLoading(false))
            .catch((err) => setTimeout(() => {
                console.log(err)
                setIsLoading(false)
            }, 5000))
    }

    const findItem = (matchId) => {
        let item = predictions?.filter(pred => pred.matchId === matchId);
        return item
    }

    const playedMatches = (arg) => {
        if (findItem(matchData._id)?.length !== 0 && findItem(matchData._id)) {
            return findItem(matchData?._id)[0][arg]
        } else {
            return ''
        }
    }

    console.log(playedMatches('homeTeamScore'), playedMatches('guestTeamScore'))

    return (
        <div className="flex items-center justify-around space-x-2 text-white">
            <div className='grid grid-cols-4 lg:grid-cols-3 gap-3 w-[660px] transition-colors hover:bg-muted/50 h-[70px] shadow-sm shadow-white rounded-lg'>
                <div className='flex items-center justify-end text-right'>
                    <div>
                        <p className="lg:block hidden text-sm mr-1 font-medium leading-none">{matchData.homeTeam.shortName}</p>
                        <p className="lg:hidden block text-sm mr-1 font-medium leading-none">{matchData.homeTeam.tla}</p>
                    </div>
                    <Avatar>
                        <AvatarImage className='scale-90 rounded-none' src={matchData.homeTeam.crest} />
                        <AvatarFallback>{matchData.homeTeam.tla}</AvatarFallback>
                    </Avatar>
                </div>

                <div className='grid grid-cols-2 col-span-2 lg:col-span-1 text-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <div>Prediction</div>

                        <div>
                            {playedMatches('homeTeamScore') && playedMatches('guestTeamScore')
                                ? <Badge variant="outline" className={cn('text-yellow-800 bg-yellow-100 uppercase border-none')}>{`${playedMatches('homeTeamScore')} - ${playedMatches('guestTeamScore')}`}</Badge>
                                : <Dialog>
                                    <DialogTrigger asChild>
                                        <Badge variant="outline" className={cn('text-green-800 bg-green-100 uppercase border-none cursor-pointer')}>Make</Badge>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-gray-800">
                                        <DialogHeader>
                                            <DialogTitle className='text-white'>Do your Score Prediction</DialogTitle>
                                            <DialogDescription>
                                                Try your best.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4 text-white">
                                            <div className="grid grid-cols-2 items-center">
                                                <div className='flex items-center'>
                                                    <Image src={matchData.homeTeam.crest} width={50} height={50} className='rounded-full w-6 h-6' />
                                                    <Label htmlFor="name" className="text-right ml-4">
                                                        {matchData.homeTeam.shortName}
                                                    </Label>
                                                </div>
                                                <Input
                                                    id="home-team-score"
                                                    defaultValue="0"
                                                    onChange={(e) => guessScoreHandler(e, setHomeScore)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 items-center">
                                                <div className='flex items-center'>
                                                    <Image src={matchData.awayTeam.crest} width={50} height={50} className='rounded-full w-6 h-6' />
                                                    <Label htmlFor="username" className="ml-4">
                                                        {matchData.awayTeam.shortName}
                                                    </Label>
                                                </div>
                                                <Input
                                                    id="guess-team-score"
                                                    defaultValue="0"
                                                    onChange={(e) => guessScoreHandler(e, setGuestScore)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                className='bg-green-500'
                                                onClick={() => {
                                                    makePrediction(matchData._id)
                                                }}>
                                                {isLoading
                                                    ? <span className="animate-spin"><Loader /></span>
                                                    : 'Confirm'
                                                }
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <div>Full Time</div>
                        {matchData.status !== 'TIMED'
                            ? <div>{matchData.score.fullTime.home ? matchData.score.fullTime.home : 0} - {matchData.score.fullTime.away ? matchData.score.fullTime.away : 0}</div>
                            : <Badge variant="outline" className={cn('text-blue-800 bg-blue-100 uppercase border-none')}>{moment(matchData.utcDate).endOf('day').fromNow()}</Badge>
                        }

                    </div>
                </div>

                <div className='flex flex-row-reverse justify-end items-center'>
                    <div>
                        <p className="lg:block hidden text-sm ml-1 font-medium leading-none">{matchData.awayTeam.shortName}</p>
                        <p className="lg:hidden block text-sm ml-1 font-medium leading-none">{matchData.awayTeam.tla}</p>
                    </div>
                    <Avatar>
                        <AvatarImage className='scale-90' src={matchData.awayTeam.crest} />
                        <AvatarFallback>{matchData.awayTeam.tla}</AvatarFallback>
                    </Avatar>
                </div>

            </div>
            <div className='flex items-center'>

            </div>
        </div >
    )
}
