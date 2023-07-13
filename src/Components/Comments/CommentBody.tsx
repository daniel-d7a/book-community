import {BiBookReader,BiEditAlt} from "react-icons/bi"
export default function CommentBody({profile,state,username,text, type}) {
    return(<div className="flex gap-2 rounded-md w-full bg-slate-600 px-2 py-2">
        <div className="relative shrink-0 h-8 w-fit">
            <img src={profile} alt="Shoes" className={`${type === 'c'?"w-10":"w-8"} ${type === 'c'?"h-10":"h-8"} rounded-full object-cover`} />
            <div className={`absolute ${type === 'c'?"-bottom-2 right-0 w-4 h-4 text-[8px]":"-bottom-1 right-0 w-3 h-3 text-[6px]"}  rounded-full ${state ==="r"? "bg-teal-500": "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center`}>
                {state === "r"? <BiBookReader/> : <BiEditAlt/>}
            </div>
        </div> 
        <div>
        <div className={`text-${type === 'c'?"sm":"xs"} font-bold`}>
            <a href="#">{username || "user"} </a>
        </div>
            <div className="text-xs">{text}</div>
        </div>
    </div>)
}