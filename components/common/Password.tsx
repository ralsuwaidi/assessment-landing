import { useState } from "react";
import Image from 'next/image'
import Link from "next/link";


export default function Password() {
    const [password, setPassword] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState(false);

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
        console.log(event.target.value);
        if (process.env.NEXT_PUBLIC_PLURALSIGHT_PASSWORD == event.target.value) {
            console.log("Password correct");
            setPasswordCorrect(true);
        }
    };

    return passwordCorrect ? (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Password Correct</h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">You are ready to be assessed. Please click the button below to get started. Good luck!</p>
                    <div className="flex  flex-row justify-center space-y-0 space-x-4">

                        <a href="#">
                            <Image
                                src="/pluralsight_logo.jpeg"
                                width={75}
                                height={75}
                                alt="Pluralsight Logo"
                            />
                        </a>


                    </div>
                </div>
            </section>

        </div >
    ) : (
        <div className="px-2">
            <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Password
            </label>
            <div className="relative mt-2 rounded-md ">
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="block sm:min-w-[70vw] w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <p className="mt-3 text-sm leading-6 text-gray-600 max-w-sm sm:max-w-none">The assessment can only be done at Coders HQ. Please <a href="https://calendly.com/chq-assessment/get-assessed" className="font-medium text-blue-600">book</a> a slot to get assessed</p>
                <p className=" text-sm leading-6 text-gray-600 max-w-sm sm:max-w-none">You can check your <Link href="/profile" className="font-medium text-blue-600">profile</Link> to see your assessment result</p>

            </div>
        </div>
    )

}


