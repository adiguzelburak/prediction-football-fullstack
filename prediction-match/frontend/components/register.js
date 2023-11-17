import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";


export function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [favTeam, setFavTeam] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();

    const register = async () => {
        setIsloading(true)
        try {
            await axios.post('http://localhost:8000/api/register', {
                username: username,
                email: email,
                age: age,
                totalPoint: 0,
                favouriteTeam: favTeam,
                password: password
            })

            setIsloading(false);
            router.push('/login');
        } catch (error) {
            console.log(error);
            setIsloading(false);
        }
    }

    const onChangeHandler = (e, state) => {
        state(e.target.value);
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 ">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Username</Label>
                    <Input onChange={(e) => onChangeHandler(e, setUsername)} id="name" type="text" placeholder="johndoe41" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => onChangeHandler(e, setEmail)} id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => onChangeHandler(e, setPassword)} id="password" type="password" placeholder="******" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input onChange={(e) => onChangeHandler(e, setAge)} id="age" type="text" placeholder="18" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="favourite-team">Favourite Team</Label>
                    <Input onChange={(e) => onChangeHandler(e, setFavTeam)} id="favourite-team" type="text" placeholder="Fenerbahçe" />
                </div>

            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => register()}>
                    {isLoading
                        ? <span className="animate-spin"><Loader /></span>
                        : 'Create account'
                    }
                </Button>
            </CardFooter>
        </Card>
    )
}