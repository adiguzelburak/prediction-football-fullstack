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
import ErrorMessage from "./register";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

export function Login() {
    const [isLoading, setIsloading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const router = useRouter();

    const validSchema = z.object({
        username: z.string().min(5, { message: "Must be 5 or over characters long" }),
        password: z.string().min(6, { message: "Must be 6 or over characters long" }),
    });

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
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        age: '',
                        favouriteTeam: ''
                    }}
                    validationSchema={toFormikValidationSchema(validSchema)}
                    onSubmit={async (values, { setSubmitting }) => {
                        setIsloading(true)
                        try {
                            let getToken = await axios.post('http://localhost:8000/api/login', {
                                username: values.username,
                                password: values.password
                            })
                            setIsloading(false);
                            setSubmitting(false);
                            Cookies.set('token', getToken.data.token)
                            router.push('/');
                        } catch (error) {
                            if (error.response.status === 401) {
                                setErrorMessage('Be sure to correct username or password')
                            }
                            setIsloading(false);
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Username</Label>
                                <Input onBlur={handleBlur} onChange={handleChange} name='username' id="username" type="text" placeholder="johndoe41" />
                            </div>
                            {errors.username && <ErrorMessage message={errors.username && touched.username && errors.username} />}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input onBlur={handleBlur} onChange={handleChange} name='password' id="password" type="password" placeholder="******" />
                            </div>
                            {errors.password && <ErrorMessage message={errors.password && touched.password && errors.password} />}
                            <div className="grid gap-2">
                                <Label htmlFor="register">
                                    <Link href='/register' className="underline">Don't you have an account?</Link>
                                </Label>
                            </div>
                            {errorMessage && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded " role="alert">
                                    <span className="block sm:inline text-sm">{errorMessage}</span>
                                </div>
                            )}
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isLoading
                                    ? <span className="animate-spin"><Loader /></span>
                                    : 'Login'
                                }
                            </Button>
                        </form>
                    )}
                </Formik>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}