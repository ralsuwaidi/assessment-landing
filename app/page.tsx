'use client'

import Hero from "@/components/Hero";
import NavigationBar from "@/components/NavigationBar";
import LoadingTable from "@/components/common/LoadingTable";
import CallToAction from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Leaderboard from "@/components/landing/Leaderboard";
import LandingApi from "@/lib/api/landing";
import PluralSight from "@/lib/api/pluralSight";
import { LandingType, IntialLandingData } from "@/lib/utils/landing-type";
import { GetExperts, UserProfileType } from "@/lib/utils/sort-experts";
import { useEffect, useState } from "react";


export default function Home() {
  const [totalContent, setTotalContent] = useState<number>(0)
  const [totalSkills, setTotalSkills] = useState<number>(0)
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [experts, setExperts] = useState<UserProfileType[]>()


  useEffect(() => {
    PluralSight.getTotalContent().then((totalContent) => {
      setTotalContent(totalContent)
    }).catch((error) => {
      console.error(error);
    });

    PluralSight.getTotalSkills().then((response) => {
      setTotalSkills(response)
    }).catch((error) => {
      console.error(error);
    });

    PluralSight.getTotalUsers().then((response) => {
      setTotalUsers(response)
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    GetExperts(400).then((experts) => {
      setExperts(experts)
    }).catch((error) => {
      console.error(error);
    });

    // LandingApi.getProfiles().then((profile) => {
    //   console.log(profile)
    // }).catch((error) => {
    //   console.error(error);
    // });
  }, []);


  return (
    <main className="">
      <NavigationBar />
      <Hero
        title="CodersHQ Assessment"
        description={"Get assessed and show the world your skillset"}
        primaryButton={{
          text: "Get Assessed",
          url: "dw"
        }}
        secondaryButton={{
          text: "Learn More",
          url: "dw"
        }}
      />

      <div className="bg-white py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-y-16 gap-x-8 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Skills to test yourself against</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {totalSkills}
              </dd>
            </div>

            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Coders assessed</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {totalUsers}
              </dd>
            </div>

            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Assessments have been taken</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {totalContent}
              </dd>
            </div>
          </dl>
        </div>
      </div>



      {experts ? < Leaderboard experts={experts.slice(0, 10)} /> :
        <div className=" mx-auto">
          <LoadingTable />
        </div>}

      <div className=" sm:mt-14">
        <Features />
      </div>

      <CallToAction />

      <Footer />

      <br></br>

    </main>
  )
}
