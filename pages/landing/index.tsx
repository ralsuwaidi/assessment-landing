'use client'

import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import DefaultPage from "@/components/layouts/DefaultPage";


export default function Home() {



    return (
        <DefaultPage>

            <Hero
                title="CodersHQ Assessment"
                description={"Book a slot and get your coding skills assesed at our physical space in CodersHQ, Emirates Towers"}
                primaryButton={{
                    text: "Book a Slot",
                    url: "https://calendly.com/chq-assessment/get-assessed"
                }}
                secondaryButton={{
                    text: "Log in",
                    url: "/api/auth/login"
                }}
            />
            <Features />

        </DefaultPage>
    )
}
