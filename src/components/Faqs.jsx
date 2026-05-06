import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";


function Faqs({ Ques, Ans }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return <>
        <div className="ml-2 mr-2 md:mr-25 md:ml-25 md:bg-green-100/50 rounded-lg md:px-2 p-0.5 mb-2">
            <div className="flex justify-between" onClick={() => setShowAnswer(!showAnswer)}>
                <h1 className="text-sm md:text-base mb-1 mt-4">{Ques} </h1>
                <p><SlArrowDown className="mt-5 size-3 md:size-4" /></p>
            </div>
            <div className={`${showAnswer ? 'overflow-hidden transition-all duration-1000 max-h-40' : 'overflow-hidden transition-all duration-1000 max-h-0'}`}>
            {showAnswer && <h3 className="text-xs md:text-xs mb-4 ml-3 text-green-800">{Ans}</h3>}
            </div>
        </div>
    </>
}
export default Faqs;