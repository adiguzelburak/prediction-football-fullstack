import { Table } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import MatchResult from './match-result'


export default function ({ data }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Table />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Enter the Results</DialogTitle>
                    <DialogDescription>
                        ONLY ADMIN ***
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {data.map((match) => (
                        <MatchResult matchData={match} />
                    ))}
                </div>
                <DialogFooter>
                    {/* <Button onClick={() => {
                        makePrediction(matchData._id)
                    }}>
                        Confirm
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
