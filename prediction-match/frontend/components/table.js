import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

export default function LeaderShip({ users }) {
    const { user } = useUser();

    return (
        <>
            <div className='text-xl font-semibold mb-4 text-center text-white underline'>Leadership Table</div>
            <Table className='text-xs'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Favourite Team</TableHead>
                        <TableHead>Total Point</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(_user => (
                        <TableRow key={_user._id}
                            className={cn(user._id === _user._id && 'bg-green-700',
                                'text-white  rounded-lg border-b')}>
                            <TableCell className="font-medium">{_user.username}</TableCell>
                            <TableCell>{_user.age}</TableCell>
                            <TableCell className='capitalize'>{_user.favouriteTeam}</TableCell>
                            <TableCell>{_user.totalPoint}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
