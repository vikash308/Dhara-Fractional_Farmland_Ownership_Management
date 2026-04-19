import { NavLink } from "react-router";
import { RxGithubLogo , RxLinkedinLogo , RxTwitterLogo ,RxInstagramLogo } from "react-icons/rx";

function Footer(){

    return<>
    <div className="pt-5 flex flex-col gap-2 items-center bg-green-900/40">
      <div><h1 className="font-stretch-40% text-[10px] md:text-sm">Start Your Farming Journey with Dhara</h1></div>
      <h2 className="text-[11px] md:text-sm ml-5">Know more about <NavLink to="/about" className="text-sm md:text-base text-green-900 hover:underline">Dhara</NavLink></h2>
      <div className="flex gap-3 mb-1">
      <RxGithubLogo className="size-4 md:size-5"/>
      <RxLinkedinLogo className="size-4 md:size-5"/>
      <RxTwitterLogo className="size-4 md:size-5"/>
      <RxInstagramLogo className="size-4 md:size-5"/>
      </div>
    </div>
    </>
}

export default Footer;