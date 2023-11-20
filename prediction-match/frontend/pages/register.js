import { SignUp } from '@/components/register'
import { Inter } from 'next/font/google'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Register() {
    return (
        <div className={`mx-auto h-screen w-full items-center justify-center flex ${inter.className}`}>
            <SignUp />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { req } = context

    if (req.cookies.token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    else {
        return { props: { message: 'You are already logged.' } }
    }
}