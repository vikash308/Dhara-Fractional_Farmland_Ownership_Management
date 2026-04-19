import { NavLink } from "react-router";
import Faqs from "../components/Faqs";

function Home() {
  return <>
    <div className="bg-[url('\Home-bgImg.jpg')] bg-cover bg-bottom h-100 mb-5">
      <div className="bg-green-950/80 w-full h-full flex flex-col items-center pt-20">
        <h1 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-4">Grow Your Own Food, Without Farming</h1>
        <h2 className="text-white text-xs md:text-sm mb-4">Rent a plot, choose crop and track your farm digitally</h2>
        <h2 className="text-white text-xs md:text-sm mb-4">Own a piece of land and grow your own food</h2>
        <NavLink to="/farms" className="text-sm md:text-base bg-orange-600 p-2 text-white rounded-lg hover:bg-orange-700">Explore Farm</NavLink>


      </div>
    </div>
    <hr />

    <div className="flex flex-col items-center mt-5 mb-5">
      <h1 className="text-xl md:text-2xl text-green-900 font-bold mb-5 text-shadow-green-950 shadow-lg underline">How Dhara Work</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-60 h-30 rounded-lg bg-green-300 hover:bg-green-400 hover:scale-105 transition-transform duration-600 text-base md:text-lg flex flex-col pt-4 md:pt-4 pb-2 items-center font-bold">Explore Farms <p className="text-xs font-light flex text-center">Explore different farms and their offerings</p></div>
        <div className="w-60 h-30 rounded-lg bg-green-300 hover:bg-green-400 hover:scale-105 transition-transform duration-600 text-base md:text-lg flex flex-col pt-4 md:pt-4 pb-2 items-center font-bold">Select Your Plot <p className="text-xs font-light flex text-center">Choose a small piece of land
          See size and cost</p></div>
        <div className="w-60 h-30 rounded-lg bg-green-300 hover:bg-green-400 hover:scale-105 transition-transform duration-600 text-base md:text-lg flex flex-col pt-4 md:pt-4 pb-2 items-center font-bold">Choose What to Grow <p className="text-xs font-light flex text-center">Select the crops you want to grow on your plot like wheat, rice, vegetables</p></div>
        <div className="w-60 h-30 rounded-lg bg-green-300 hover:bg-green-400 hover:scale-105 transition-transform duration-600 text-base md:text-lg flex flex-col pt-4 md:pt-4 pb-2 items-center font-bold">Track Your Farm <p className="text-xs font-light flex text-center">Monitor crop progress <br /> Get updates: Watering ,Growth and Harvest status </p></div>
        <div className="w-60 h-30 rounded-lg bg-green-300 hover:bg-green-400 hover:scale-105 transition-transform duration-600 text-base md:text-lg flex flex-col pt-4 md:pt-4 pb-2 items-center font-bold">Harvest <p className="text-xs font-light flex text-center">Collect your produce when it's ready</p></div>
      </div>
    </div>

    <hr />

      <h1 className="text-lg md:text-xl text-green-900 mb-3 mt-3 text-center">Frequently Asked Questions  </h1>
    <div className="mt-3 flex flex-col">
      <Faqs Ques ="What is Dhara?" Ans="Dhara is a digital farming platform where users can rent a plot, grow crops, and track farming activities online without owning land." />
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
      <Faqs  Ques ="Do I need to own land to use Dhara?" Ans="No. You can rent a small plot from available farms and start farming digitally."/>
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
      <Faqs Ques="How does the booking process work?" Ans="You select a farm, choose a plot, pick a crop, and confirm your booking through the platform." />
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
      <Faqs Ques="Why is it named 'Dhara'?" Ans="“Dhara” means earth or land, which directly represents agriculture and farming. Since our platform is based on digital access to farmland and farming activities, the name ‘Dhara’ reflects the core idea of connecting users with land in a virtual way." />
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
      <Faqs Ques="Can I cancel my booking?" Ans="This depends on platform policies, but basic cancellation features can be provided." />
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
      <Faqs Ques="Can I choose what crops to grow?" Ans="Yes. You can select from available crop options provided by the farmer." />
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
      <Faqs Ques="How can I track my crops?" Ans="You can monitor growth, activities, and progress through your dashboard in real time." />
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
      <Faqs Ques="What happens after the crop is ready?" Ans="You can view the harvest details and may have options like delivery or reporting of yield." />
      <hr className="ml-2 mr-2 mb-2 md:mr-25 md:ml-25"/>
    </div>

  
  </>
};

export default Home;