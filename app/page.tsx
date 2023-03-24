'use client'

import Hero from "@/components/Hero";
import NavigationBar from "@/components/NavigationBar";
import LandingApi from "@/lib/api/landing";
import PluralSight from "@/lib/api/pluralSight";
import { LandingType, IntialLandingData } from "@/lib/utils/landing-type";
import { useEffect, useState } from "react";



export default function Home() {
  const [landingData, setLandingData] = useState<LandingType>(IntialLandingData)


  useEffect(() => {
    LandingApi.get().then((response) => {
      console.log(response)
      setLandingData(response.data.data.attributes)
    }).catch((error) => {
      console.error(error);
    });

  }, []);


  useEffect(() => {
    PluralSight.getAllData().then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error(error);
    });

  }, []);



  return (
    <main className="">
      <NavigationBar />
      <Hero
        title={landingData.title}
        description={"Get assessed and show the world your skillset"}
        primaryButton={{
          text: "get assessed",
          url: "dw"
        }}
        secondaryButton={{
          text: "Learn More",
          url: "dw"
        }}
      />
    </main>
  )
}
