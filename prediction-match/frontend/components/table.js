import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ArrowRight } from 'lucide-react'


export default function LeaderShip({ users }) {
    const changeAuthentication = (id) => {
        localStorage.setItem('id', id)
    }
    return (
        <Table>
            <TableCaption>A list of <span className="font-semibold">users</span>.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Fav Team</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Select</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map(user => (
                    <TableRow key={user._id} >
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.favouriteTeam}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell className="w-fit ">
                            <ArrowRight
                                onClick={() => changeAuthentication(user._id)}
                                className="mx-auto hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-colors duration-300 w-fit cursor-pointer" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
