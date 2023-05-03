/* eslint-disable @next/next/no-img-element */
'use client';


import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Avatar, Dropdown } from 'flowbite-react';


const navigation = [
    { name: 'About', href: '/landing' },
]

// after logging in
const profileNavigation = [
    { name: 'Assessment', link: '/' },
    { name: 'Profile', link: '/profile' },
]

export default function NavigationBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user, isLoading } = useUser();


    return (
        <header className=" relative inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                        />
                    </a>
                </div>
                <div className='flex'>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12 items-center justify-center">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm font-semibold  leading-6 text-gray-900 ">
                                {item.name}
                            </a>
                        ))}
                    </div>

                    <div className=" lg:flex lg:flex-1 lg:justify-end ml-5">


                        {user && !isLoading ? (
                            <Dropdown
                                label={<Avatar alt="User settings" img={user.picture ? user.picture : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded={true} />}
                                arrowIcon={false}
                                inline={true}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        {user.name ? user.name : "User"}
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        {user.email ? user.email : "No Email"}
                                    </span>
                                </Dropdown.Header>
                                {profileNavigation.map((item) => (
                                    <Link href={item.link} key={item.name}>
                                        <Dropdown.Item >
                                            {item.name}
                                        </Dropdown.Item>
                                    </Link>
                                ))}
                                <Dropdown.Divider />
                                <Link href="/api/auth/logout" >
                                    <Dropdown.Item>
                                        Sign out
                                    </Dropdown.Item>
                                </Link>
                            </Dropdown>
                        ) : (
                            <Link href="/api/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )
                        }

                    </div>
                </div>

            </nav>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">

                                {!user && (
                                    <Link href="/api/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
                                        Log in
                                    </Link>
                                )
                                }

                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>

    )
}
