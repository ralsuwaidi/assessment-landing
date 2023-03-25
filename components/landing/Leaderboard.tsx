import { UserProfileType } from "@/lib/utils/sort-experts";

type ExpertsProps = {
    experts: UserProfileType[];
};


export default function Leaderboard({ experts }: ExpertsProps) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <svg
                            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                            viewBox="0 0 1155 678"
                        >
                            <path
                                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                                fillOpacity=".3"
                                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                            />
                            <defs>
                                <linearGradient
                                    id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                                    x1="1155.49"
                                    x2="-78.208"
                                    y1=".177"
                                    y2="474.645"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#9089FC" />
                                    <stop offset={1} stopColor="#c480ff" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className=" max-w-4xl mx-auto py-12 sm:py-24">
                        <p className=" text-center  text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-500 sm:text-6xl">Leaderboard</p>

                        <div className="flex flex-col mt-12">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className=" text-white font-medium  ">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4 text-lg">Name</th>
                                                    <th scope="col" className="px-6 py-4 text-lg">Skill</th>
                                                    <th scope="col" className="px-6 py-4 text-lg">Level</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {experts.map((expert) => (
                                                    <tr key={expert.id} className="border-t border-slate-500">
                                                        <td className="whitespace-nowrap text-white px-6 py-4 font-medium">{expert.firstName + ' ' + expert.lastName}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-slate-300">{expert.skillName}</td>
                                                        <td colSpan={2} className="whitespace-nowrap px-6 py-4 text-slate-300">Expert</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}