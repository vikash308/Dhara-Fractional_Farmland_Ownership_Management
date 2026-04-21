import { useEffect } from "react";
import FarmCard from "../components/FarmCard";
import axios from 'axios';
import server from "../api";


function Farms(){
  const FarmDetails = [
    {
      "Farm" : "Green Valley Farm",
      "Location" : "Punjab",
      "Price" : "$200"
    },
  ]

  useEffect(async()=>{
    let Farms = await axios.get(server + "/farms")

  },[]);


  return<>
  <div className="bg-zinc-300">
    <h1 className="p-3 sm:p-5 text-xl sm:text-2xl md:text-3xl text-gray-900  text-center">Farms</h1>
    <span className="flex justify-center gap-2 pb-5">
    <input type="search" name="q" placeholder="Search farms..." className="p-0.5 sm:p-2 border border-gray-500 rounded w-60 sm:w-80 md:w-100 lg:w-120"/>
    <button type="submit" className="p-1 sm:p-2 border border-gray-500 rounded">Search</button>
    </span>
    <section className="pb-5">
      <FarmCard FarmDetails={FarmDetails} />
    </section>
  </div>
  </>
}

export default Farms;