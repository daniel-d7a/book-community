export default function Carousel({pics}:{pics:string[]}) {

    return(<div className="w-full h-96 carousel rounded-none">
        {pics.map((pic,index) => <div key={index} className="carousel-item w-full">
            <img src={pic} className="w-full" alt="Tailwind CSS Carousel component" />
            </div> )}
        </div>)
}