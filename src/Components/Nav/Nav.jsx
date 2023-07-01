import { useState } from 'react'
import {BiHomeAlt,BiSearch,BiUser} from 'react-icons/bi'
export default function Nav() {

    const [activeIdx, setActiveIdx] = useState(1)
    


    return(<>
        <div className="btm-nav text-xl h-14 btm-nav-lg">
        <span className={`transition-all duration-150 absolute top-0 ${activeIdx === 1? "left-0":activeIdx === 2? "left-1/3": "left-2/3"} w-1/3 h-1 bg-warning`}></span>
        <button className={`transition-all duration-150 ${activeIdx === 1 && "text-warning"}`}  onClick={()=>{
            setActiveIdx(1)
            console.log(activeIdx)
        }}>
            <BiHomeAlt/>
        </button>
        <button className={`transition-all duration-150 ${activeIdx === 2 && "text-warning"}`} onClick={()=>{
            setActiveIdx(2)
            console.log(activeIdx)
        }}>
            <BiSearch/>
        </button>
        <button className={`transition-all duration-150 ${activeIdx === 3 && "text-warning"}`}  onClick={()=>{
            setActiveIdx(3)
            console.log(activeIdx)
        }}>
            <BiUser/>
        </button>
        </div>
    </>)
}