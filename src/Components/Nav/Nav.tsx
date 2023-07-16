import { useState } from 'react'
import {BiHomeAlt,BiSearch,BiUser,BiBell, BiBookOpen, BiMenu, BiChat, BiPowerOff, BiSun, BiMoon} from 'react-icons/bi'
import { HiOutlineViewList } from 'react-icons/hi'
import { TfiSettings } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'
export default function Nav() {
    const navigate = useNavigate()
    const [tools, setTools] = useState(false)
    const logOut = () => {
        window.localStorage.removeItem("currentUser");
        window.sessionStorage.removeItem("currentUser");
        navigate("/login");
    };

    return(<>
        <div className="navbar justify-between bg-slate-950 fixed top-0 mb-4 z-30">
            <div onClick={()=>navigate("/")} className="w-9 h-9 flex items-center justify-center text-lg font-bold rounded-sm bg-yellow-500">
                <BiBookOpen/>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex items-center gap-2">
                <div className='w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900'><BiMenu/></div>
                <div className='w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900'><BiChat/></div>
                <div className='w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900'><TfiSettings/></div>
                <div className='w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900'><BiBell/></div>
                <div onClick={()=>setTools(!tools)} className='w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900 overflow-hidden'>
                    <img src={"https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}/>
                </div>
                <div className={`absolute top-14 right-3 w-60 p-4 bg-slate-950 rounded-md ${tools?"":"invisible"}`}>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-4'>
                            <img src={"https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"} className=" w-12 h-12 rounded-full object-cover" />
                            <div className='flex flex-col'>
                                <p className='font-bold'>Ehab Mohammed</p>
                                <p className='text-sm text-gray-400'>Reader</p>
                            </div>
                        </div>
                        <button className='w-full flex items-center justify-center py-2 text-sm bg-yellow-950 text-yellow-500'>View profile</button>
                        <button onClick={logOut} className='w-full flex items-center p-4 '><BiPowerOff/><span className='ml-2'>Sign Out</span></button>
                        <div className='flex gap-4'>
                            <div className='w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900'><BiSun/></div>
                            <div className='w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900'><BiMoon/></div>
                        </div>
                    </div>
                </div>
                {/* <li>
                    <details>
                    <summary>
                        Parent
                    </summary>
                    <ul className="p-2 bg-base-100">
                        <li><a>Link 1</a></li>
                        <li><a>Link 2</a></li>
                    </ul>
                    </details>
                </li> */}
                </ul>
            </div>
        </div>
        {/* <div className="btm-nav text-xl h-14 btm-nav-lg">
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
        </div> */}
    </>)
}