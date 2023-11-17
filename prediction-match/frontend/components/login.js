import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Cookies from "js-cookie";
import Link from "next/link";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();

    const login = async () => {
        setIsloading(true)
        try {

            let getToken = await axios.post('http://localhost:8000/api/login', {
                username,
                password
            })

            setIsloading(false);
            Cookies.set('token', getToken.data.token)
            router.push('/');
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
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your information below to login account
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
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => onChangeHandler(e, setPassword)} id="password" type="password" placeholder="******" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">
                        <Link href='/register' className="underline">Do you have account already?</Link>
                    </Label>
                </div>

            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => login()}>
                    {isLoading
                        ? <span className="animate-spin"><Loader /></span>
                        : 'Login'
                    }
                </Button>
            </CardFooter>
        </Card>
    )
}