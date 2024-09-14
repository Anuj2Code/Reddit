
import React, { use } from "react";
import Link from "next/link";
import img1 from "../../../public/R.gif"
import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  return (
    <nav className="h-[10vh] w-full flex items-center  px-5 lg:px-14 justify-between bg-black">
      <Link href="/" className="flex items-center gap-x-3">
      <div className="">
          <Image
            className="rounded-full bg-black "
            src={img1}
            alt="Picture of the author"
            width={80}
            height={80}
          />
        </div>
      </Link>
      <div className="flex items-center gap-x-4">
          <div className="flex gap-6 mt-[10px] ">
               {user? <UserDropdown userImage={user.picture} />:<>
                <div>
                    <button className="h-[40px] w-[160px] bg-orange-500 text-white rounded-lg"><RegisterLink>Sign up</RegisterLink></button>
                </div>
                <div>
                  <button className="h-[40px] w-[160px] bg-orange-500 text-white rounded-lg"> 
                    <LoginLink>Log in</LoginLink>
                    </button>
                    </div>
               </>}
            </div>
      </div>
    </nav>
  );
}

export default Navbar

