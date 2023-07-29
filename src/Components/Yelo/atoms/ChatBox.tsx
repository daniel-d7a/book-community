export default function ChatBox({user}:{user:any}) {
    return(<div className="w-full flex items-center gap-4 cursor-pointer">
        <img
            src={
                user && user.profile_photo
                ? user.profile_photo
                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            className=" w-10 h-10 rounded-full object-cover cursor-pointer"
            />
        <div className="flex flex-col ">
            <p className="font-bold text-sm">{user.username}</p>
            <p className="text-xs">Temp message</p>
        </div>
    </div>)
}