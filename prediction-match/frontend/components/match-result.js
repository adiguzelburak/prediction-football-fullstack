"use client"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, Loader } from "lucide-react"
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from "./ui/badge"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const statuses = [
    {
        value: "waiting",
        label: "Waiting",
    },
    {
        value: "finished",
        label: "Finished",
    },
]

export default function MatchResult({ matchData }) {
    const [homeScore, setHomeScore] = useState(0);
    const [guestScore, setGuestScore] = useState(0);
    const [isChanged, setIsChanged] = useState(false)

    const guessScoreHandler = (e, state) => {
        let score = parseInt(e.target.value);

        score < 12 ? state(score) : alert('cannot be bigger than 12');
    }

    const enterMatchResult = async () => {
        setIsChanged(true);
        await axios.put(`http://localhost:8000/api/finish-match?id=${matchData._id}`,
            {
                homeTeamScore: homeScore,
                guestTeamScore: guestScore,
                status: 'finished'
            })
        setIsChanged(false);
    }


    return (
        <div className="flex items-center gap-4 text-white">
            <div className="flex items-center">
                <div className='flex items-center justify-end text-right w-2/5'>
                    <div>
                        <p className="lg:block hidden text-sm mr-1 font-medium leading-none">{matchData.homeTeam.shortName}</p>
                        <p className="lg:hidden block text-sm mr-1 font-medium leading-none">{matchData.homeTeam.tla}</p>
                    </div>
                    <Avatar>
                        <AvatarImage className='scale-90 rounded-none' src={matchData.homeTeam.crest} />
                        <AvatarFallback>{matchData.homeTeam.tla}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center justify-around w-1/5">
                    <Input
                        id="home-team-score"
                        defaultValue={matchData.score.home && matchData.score.home}
                        className="col-span-3 w-full pl-1.5 px-0"
                        onChange={(e) => guessScoreHandler(e, setHomeScore)}
                    />
                    <Input
                        id="guess-team-score"
                        defaultValue={matchData.score.away && matchData.score.away}
                        className="col-span-3 w-full pl-1.5 px-0"
                        onChange={(e) => guessScoreHandler(e, setGuestScore)}
                    />
                </div>
                <div className='flex flex-row-reverse justify-end items-center w-2/5'>
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



            <Button className='w-[150px]' onClick={() => {
                enterMatchResult();
            }}>
                {isChanged
                    ? <span className="animate-spin"><Loader /></span>
                    : 'Change'
                }
            </Button>

        </div>
    )


}
