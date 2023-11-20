import { useUser } from '@/context/UserContext'
import { cn } from '@/lib/utils'
import { Disclosure } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Button } from './ui/button'
import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'


export default function Navbar() {
    const { user, isAuth, setIsAuth } = useUser();

    const router = useRouter();

    const logout = () => {
        setIsAuth(false);
        Cookies.remove('token')
        Cookies.remove('user')
        router.push('/login')
    }

    const login = () => {
        router.push('/login')
    }

    return (
        <Disclosure as="nav" className="bg-gray-800 ">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:mb-6">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex  items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden lg:flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="sm:ml-6 block">
                                    <div className="flex space-x-4">
                                        <div className={cn('text-lime-300',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}>
                                            {isAuth ? user?.username : 'Visitor'}
                                        </div>
                                        <div className={cn('text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}>
                                            {isAuth && <div>Point: {user?.totalPoint}</div>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Button
                                onClick={isAuth ? () => logout() : () => login()}
                                className='text-white bg-blue-500 space-x-2'
                            >
                                <div><LogOut className='w-5 h-5' /></div>
                                <div>{isAuth ? 'Logout' : 'Login'}</div>
                            </Button>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <div className={cn('text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                            )}>
                                Welcome {isAuth ? user?.username : 'Visitor'}
                            </div>
                            <div className={cn('text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                            )}>
                                {isAuth && <div>Point: {user?.totalPoint}</div>}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}
