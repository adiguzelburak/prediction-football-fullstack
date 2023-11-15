import axios from 'axios'
import { Pen, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

export default function Match({ matchData, predictions }) {
    const [homeScore, setHomeScore] = useState(0);
    const [guestScore, setGuestScore] = useState(0);
    const [userInfo, setUserInfo] = useState()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUserInfo(user)
    }, [])

    const deleteMatch = (matchId) => {
        axios.delete(`http://localhost:8000/api/match/${matchId}`)
    }

    const guessScoreHandler = (e, state) => {
        let score = parseInt(e.target.value);

        score < 12 ? state(score) : console.log('cannot be bigger than 12');
    }

    const makePrediction = (matchId) => {
        if (!userInfo) {
            return;
        }

        axios.post(
            `http://localhost:8000/api/predictions`, {
            homeTeamScore: homeScore,
            guestTeamScore: guestScore,
            userId: userInfo._id,
            matchId: matchId

        })
    }

    const findItem = (matchId) => {
        let item = predictions?.filter(pred => pred.matchId === matchId);
        return item
    }

    const playedMatches = (arg) => {
        if (findItem(matchData._id)?.length !== 0 && findItem(matchData._id)) {
            // console.log(findItem(matchData._id))
            return findItem(matchData?._id)[0][arg]
        } else {
            return '-'
        }
    }

    return (
        <div className="flex w-full items-center justify-around space-x-2">
            <Badge variant="outline" className={cn(matchData.status === 'waiting'
                ? 'text-yellow-800 bg-yellow-100'
                : 'text-green-800 bg-green-100',
                'uppercase border-none')}>{matchData.status}</Badge>
            <div className='flex items-center'>
                <div className='w-2/5'>
                    <p className="text-lg font-medium leading-none text-right">{matchData.homeTeam}</p>
                </div>
                <div>
                    <span className='text-blue-500'>{`(${playedMatches('homeTeamScore')})`}</span>
                    <span className='text-green-500'>{matchData.homeTeamScore}</span>
                </div>
                <div>-</div>
                <div>
                    <span className='text-blue-500'>{`(${playedMatches('guestTeamScore')})`}</span>
                    <span className='text-green-500'>{matchData.guestTeamScore}</span></div>
                <div className='w-2/5 text-lg'>
                    <p className=" font-medium leading-none">{matchData.guestTeam}</p>
                </div>
            </div>
            <div className='flex items-center'>
                <Trash
                    className='cursor-pointer'
                    color='red'
                    onClick={() => deleteMatch(matchData._id)} />
                <Dialog>
                    <DialogTrigger asChild>
                        <Pen />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Do your Score Prediction</DialogTitle>
                            <DialogDescription>
                                Try your best.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    {matchData.homeTeam}
                                </Label>
                                <Input
                                    id="home-team-score"
                                    defaultValue="0"
                                    className="col-span-3"
                                    onChange={(e) => guessScoreHandler(e, setHomeScore)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    {matchData.guestTeam}
                                </Label>
                                <Input
                                    id="guess-team-score"
                                    defaultValue="0"
                                    className="col-span-3"
                                    onChange={(e) => guessScoreHandler(e, setGuestScore)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => {
                                makePrediction(matchData._id)
                            }}>
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}


{/* <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JL</AvatarFallback>
            </Avatar> */}