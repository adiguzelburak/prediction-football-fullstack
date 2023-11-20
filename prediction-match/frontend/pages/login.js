import { Login } from '@/components/login'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function LoginPage() {
    return (
        <div className={`mx-auto h-screen w-full items-center justify-center flex ${inter.className}`}>
            <Login />
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
        return { props: { message: '' } }
    }
}