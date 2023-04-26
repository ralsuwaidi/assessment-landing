'use client'

import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import DefaultPage from "@/components/layouts/DefaultPage";
import { useUser } from '@auth0/nextjs-auth0/client';
import Password from "@/components/common/Password";


export default function Home() {

  const { user, isLoading } = useUser();


  return (
    <DefaultPage>

      {user ? (
        <div className=" h-max grid content-center">
          <div className="grid h-[60vh] place-items-center">
            <Password />
          </div>
        </div>
      ) : (
        <>
          <Hero
            title="CodersHQ Assessment"
            description={"Book a slot and get your coding skills assesed at our physical space in CodersHQ, Emirates Towers"}
            primaryButton={{
              text: "Book a Slot",
              url: "https://calendly.com/chq-assessment/get-assessed"
            }}
            secondaryButton={{
              text: "Learn More",
              url: "https://ai.gov.ae/hqast/"
            }}
          />
          <Features />
        </>
      )
      }




    </DefaultPage>
  )
}
