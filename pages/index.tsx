'use client'

import NavigationBar from "@/components/common/NavigationBar";
import LoadingTable from "@/components/common/LoadingTable";
import CallToAction from "@/components/landing/CallToAction";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Leaderboard from "@/components/landing/Leaderboard";
import PluralSight from "@/lib/api/pluralSight";
import { GetExperts, UserProfileType } from "@/lib/utils/sort-experts";
import { useEffect, useState } from "react";
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
