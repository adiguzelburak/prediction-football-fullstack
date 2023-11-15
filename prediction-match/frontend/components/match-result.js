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

        score < 12 ? state(score) : console.log('cannot be bigger than 12');
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
        <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right w-1/3">
                {matchData.homeTeam}
            </Label>
            <Input
                id="home-team-score"
                defaultValue={matchData.homeTeamScore}
                className="col-span-3 w-1/5"
                onChange={(e) => guessScoreHandler(e, setHomeScore)}
            />
            <Input
                id="guess-team-score"
                defaultValue={matchData.guestTeamScore}
                className="col-span-3 w-1/5"
                onChange={(e) => guessScoreHandler(e, setGuestScore)}
            />
            <Label htmlFor="username" className="text-left w-1/3">
                {matchData.guestTeam}
            </Label>

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
