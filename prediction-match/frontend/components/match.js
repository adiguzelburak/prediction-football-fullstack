import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Pen } from 'lucide-react'

export default function Match({ matchData }) {
    return (
        <div className="flex w-full items-center space-x-2">
            <div className='w-2/5'>
                <p className="text-sm font-medium leading-none text-right">{matchData.homeTeam}</p>
            </div>
            <div>{matchData.homeTeamScore}</div>
            <div>-</div>
            <div>{matchData.guestTeamScore}</div>
            <div className='w-2/5'>
                <p className="text-sm font-medium leading-none">{matchData.guestTeam}</p>
            </div>
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
                                Home Team
                            </Label>
                            <Input
                                id="home-team-score"
                                defaultValue="0"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Guest Team
                            </Label>
                            <Input
                                id="guess-team-score"
                                defaultValue="0"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}


{/* <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JL</AvatarFallback>
            </Avatar> */}