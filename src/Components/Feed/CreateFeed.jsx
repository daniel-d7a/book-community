import {HiOutlineEmojiHappy} from "react-icons/hi"
import {TfiLocationPin} from "react-icons/tfi"
import {CgPoll} from "react-icons/cg"
import Icon from "./atoms/icon"

export default function CreateFeed() {

    return<>
    <div className="w-full flex flex-col justify-center items-center my-4 bg-base-300 p-4 gap-4">
        <label className="flex justify-center items-center w-full bg-base-100 ">
        <div className="w-10 h-10 ml-4 rounded-full overflow-hidden">

        <img src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg" className="w-full object-cover "/>
        </div>
        <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
        </label>
        <div className="capitalize w-full flex justify-around items-center">
            <Icon icon={<HiOutlineEmojiHappy/>} text={"feeling"} styles="badge-info"/>
            <Icon icon={<TfiLocationPin/>} text={"location"} styles="badge-success"/>
            <Icon icon={<CgPoll/>} text={"poll"} styles="badge-warning"/>
        </div>
    </div>
    </>
}