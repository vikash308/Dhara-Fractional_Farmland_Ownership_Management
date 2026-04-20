

function FarmCard({FarmDetails}){



    return<>
    {
        FarmDetails.map((val , index)=>(
           <ul key={index} className="mx-4 sm:mx-8 lg:mx-12 mt-5 p-1.5 rounded md:p-2 bg-gradient-to-r from-green-200 via-emerald-200 to-emerald-200">
            <li className="text-xl sm:text-2xl lg:text-3xl">{val.Farm}</li>
            <li className="text-gray-800 text-xs">{val.Location}</li>
            <li className="">${val.Price}</li>
           </ul>
        ))
    }
    </>
}

export default FarmCard;