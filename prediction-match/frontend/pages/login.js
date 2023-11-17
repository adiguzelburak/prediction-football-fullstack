import { Login } from '@/components/login'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Register() {
    return (
        <div className={`mx-auto h-screen w-full items-center justify-center flex ${inter.className}`}>
            <Login />
        </div>
    )
}
