import { useState } from 'react'
import {BiHomeAlt,BiSearch,BiUser,BiBell} from 'react-icons/bi'
import { Link } from 'react-router-dom'
export default function Nav() {

    const [activeIdx, setActiveIdx] = useState(1)
    


    return(<>
        <div className="btm-nav text-xl h-14 btm-nav-lg">
        <span className={`transition-all duration-150 absolute top-0 ${activeIdx === 1? "left-0":activeIdx === 2? "left-1/4":activeIdx === 3?"left-2/4":"left-3/4"} w-1/4 h-1 bg-warning`}></span>
        <Link to="/" className={`transition-all duration-150 ${activeIdx === 1 && "text-warning"}`}  onClick={()=>{
            setActiveIdx(1)
            
        }}>
            <BiHomeAlt/>
        </Link>
        <Link to="/notifications" className={`transition-all duration-150 ${activeIdx === 2 && "text-warning"}`} onClick={()=>{
            setActiveIdx(2)
            
        }}>
            <BiBell/>
        </Link>
        <Link to="/search" className={`transition-all duration-150 ${activeIdx === 3 && "text-warning"}`}  onClick={()=>{
            setActiveIdx(3)
        }}>
            <BiSearch/>
        </Link>
        <Link to="/profile" className={`transition-all duration-150 ${activeIdx === 4 && "text-warning"}`}  onClick={()=>{
            setActiveIdx(4)
        }}>
            <BiUser/>
        </Link>
        </div>
    </>)
}