import { Table } from 'lucide-react'
import MatchResult from './match-result'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'


export default function Result({ data }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Table />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] text-white ">
                <DialogHeader>
                    <DialogTitle className='text-center'>Enter the Results</DialogTitle>
                    <DialogDescription className='text-center'>
                        *** ONLY ADMIN ***
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {data?.map((match, index) => (
                        <MatchResult key={index} matchData={match} />
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
