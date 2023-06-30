import Comment from "./Comment"
export default function Comments({comms}) {
    return(<>
        {console.log(comms)}
        {/* <div className="w-full h-screen bg-gray-500/50 fixed top-0 left-0 ">
            
            <div className="w-full h-5/6 rounded-t-md bg-slate-700 absolute bottom-0 overflow-y-scroll  flex flex-wrap items-center justify-center gap-2">
                <div className="w-full bg-slate-700 z-10 h-10 flex items-center justify-center sticky top-0 rounded-t-md">
                    <div className="w-16 h-1 bg-white rounded-lg"></div>
                </div>
                {comms.map(comm => 
                    <Comment user={comm.user} text={comm.text}/>
                )}
            </div>
        </div> */}
        

        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal z-50">
            <div className="modal-box px-0 pb-0 bg-slate-700">
            <h3 className="font-bold text-lg mb-4 ml-8">Comments</h3>
            <div className="overflow-y-scroll w-full h-72 flex flex-wrap justify-center gap-2">
                {comms.map(comm => 
                    <Comment user={comm.user} text={comm.text}/>
                )}
            </div>
            <div className="modal-action">
                <label htmlFor="my_modal_6" onClick={()=>document.body.style.overflow = 'unset'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            </div>
            </div>
        </div>
    </>)
}