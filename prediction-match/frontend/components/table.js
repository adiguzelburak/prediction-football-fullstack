import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"

import { ArrowRight, Trash2 } from 'lucide-react'


export default function LeaderShip({ users }) {

    const changeAuthentication = (user) => {
        const userJson = JSON.stringify(user)
        localStorage.setItem('user', userJson)
    }

    const deleteUser = (userId) => {
        axios.delete(`http://localhost:8000/api/users/${userId}`)
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
                    <TableHead>Total Point</TableHead>
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
                        <TableCell>{user.totalPoint}</TableCell>
                        <TableCell className="w-fit ">
                            <ArrowRight
                                onClick={() => changeAuthentication(user)}
                                className="mx-auto hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-colors duration-300 w-fit cursor-pointer" />
                        </TableCell>
                        <TableCell className="w-fit ">
                            <Trash2
                                onClick={() => deleteUser(user._id)}
                                color="red" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
