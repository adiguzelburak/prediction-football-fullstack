import axios from "axios";
import { Formik } from "formik";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ErrorMessage({ message }) {
    return (
        <>
            {message && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative" role="alert">
                    <span className="block sm:inline text-sm">{message}</span>
                </div>
            )}
        </>
    )
}

export function SignUp() {
    const [isLoading, setIsloading] = useState(false);
    const [isRegisterError, setIsRegisterError] = useState(false);

    const router = useRouter();

    const validSchema = z.object({
        username: z.string().min(5, { message: "Must be 5 or over characters long" }),
        email: z.string().email('email format is wrong'),
        password: z.string().min(6, { message: "Must be 6 or over characters long" }),
    });

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
                            let registerResponse = await axios.post('http://localhost:8000/api/register', {
                                username: values.username,
                                email: values.email,
                                age: values.age,
                                favouriteTeam: values.favouriteTeam,
                                password: values.password
                            })
                            if (registerResponse.data.status !== 200) {
                                setIsRegisterError(true)
                            } else {
                                setIsRegisterError(false)
                                router.push('/login');
                            }
                            setIsloading(false);
                            setSubmitting(false);
                        } catch (error) {
                            // console.log(error)
                            alert('error:', error);
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
                                <Label htmlFor="email">Email</Label>
                                <Input onBlur={handleBlur} onChange={handleChange} name='email' id="email" type="email" placeholder="johndoe41@email.com" />
                            </div>
                            {errors.email && <ErrorMessage message={errors.email && touched.email && errors.email} />}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input onBlur={handleBlur} onChange={handleChange} name='password' id="password" type="password" placeholder="******" />
                            </div>
                            {errors.password && <ErrorMessage message={errors.password && touched.password && errors.password} />}
                            <div className="grid gap-2">
                                <Label htmlFor="age">Age</Label>
                                <Input onBlur={handleBlur} onChange={handleChange} name='age' id="age" type="text" placeholder="18" />
                            </div>
                            {errors.age && <ErrorMessage message={errors.age && touched.age && errors.age} />}
                            <div className="grid gap-2">
                                <Label htmlFor="favourite-team">Favourite Team</Label>
                                <Input onBlur={handleBlur} onChange={handleChange} name='favouriteTeam' id="team" type="text" placeholder="Fenerbahçe" />
                            </div>
                            {errors.favouriteTeam && <ErrorMessage message={errors.favouriteTeam && touched.favouriteTeam && errors.favouriteTeam} />}
                            <div className="grid gap-2">
                                <Label htmlFor="login">
                                    <Link href='/login' className="underline">Do you have an account already?</Link>
                                </Label>
                            </div>
                            {isRegisterError && <ErrorMessage message={'User already exist please try another username'} />}
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isLoading
                                    ? <span className="animate-spin"><Loader /></span>
                                    : 'Create account'
                                }
                            </Button>
                        </form>
                    )}
                </Formik>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card >
    )
}