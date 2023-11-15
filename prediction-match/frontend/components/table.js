import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useUser } from "@/context/UserContext";
import axios from "axios"

import { ArrowRight, Trash2 } from 'lucide-react'


export default function LeaderShip({ users }) {
    const { setUser } = useUser();


    const changeAuthentication = (user) => {
        setUser(user)
    }

    const deleteUser = (userId) => {
        axios.delete(`http://localhost:8000/api/users/${userId}`)
    }


    return (
        <>
            <div className='text-xl font-semibold mb-4 text-center text-white underline'>Leadership Table</div>
            <Table className='text-xs'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Total Point</TableHead>
                        <TableHead>Change User</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map(user => (
                        <TableRow key={user._id} className='text-white  rounded-lg border-b'>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.totalPoint}</TableCell>
                            <TableCell>
                                <ArrowRight
                                    onClick={() => changeAuthentication(user)}
                                    className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-colors duration-300 cursor-pointer" />
                            </TableCell>
                            {/* <TableCell className="w-fit ">
                            <Trash2
                                onClick={() => deleteUser(user._id)}
                                color="red" />
                        </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
