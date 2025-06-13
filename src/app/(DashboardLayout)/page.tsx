import React from "react";
import EggStock from "../components/dashboard/EggStock";
import SeedStock from "../components/dashboard/SeedStock";
import WeatherInfo from "../components/dashboard/WeatherInfo";
import HoneyStock from "../components/dashboard/HoneyStock";
import OtherStock from "../components/dashboard/OtherStock";
import Link from "next/link";



const page = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {/* First Row */}
        <div className="lg:col-span-8 col-span-12">
          <SeedStock />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
              <EggStock />
            </div>
            <div className="col-span-12">
              <WeatherInfo />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="lg:col-span-8 col-span-12">
          <HoneyStock />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <OtherStock />
        </div>

        {/* Footer */}
        <div className="col-span-12 text-center mt-4">
          <p className="text-sm">
            Developed by{" "}
            <Link
              href="https://www.roblox.com/users/8286257149/profile"
              target="_blank"
              className="pl-1 text-primary underline decoration-primary"
            >
              Sthenos
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
