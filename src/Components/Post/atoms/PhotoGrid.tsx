export default function PhotoGrid({ images }: { images: string[] }) {
  console.log("photo grid images", images);

  if (!images) return null;

  function imageStyles(index: number) {
    if (index === 0 && images.length === 1) {
      return "col-span-2 row-span-6";
    } else if (index === 0) {
      return "col-span-1 row-span-6";
    }

    if (images.length === 2) {
      return "col-span-1 row-span-6 col-start-2 row-start-1";
    } else if (images.length === 3) {
      switch (index) {
        case 1:
          return "col-span-1 row-span-3 col-start-2 row-start-1";
        case 2:
          return "col-span-1 row-span-3 col-start-2 row-start-4";
      }
    } else if (images.length >= 4) {
      switch (index) {
        case 1:
          return "col-span-1 row-span-2 col-start-2 row-start-1";
        case 2:
          return "col-span-1 row-span-2 col-start-2 row-start-3";
        case 3:
          return "col-span-1 row-span-2 col-start-2 row-start-5";
      }
    }
  }

  return (
    <>
      <div className=" px-2 mb-3 grid grid-cols-2 grid-rows-6 gap-2 h-[400px] relative">
        {images.slice(0, 4).map((image: string, index: number) => (
          <div key={image} className={`${imageStyles(index)}`}>
            <img src={image} className={`object-cover w-full h-full`} />
          </div>
        ))}
        {images.length > 4 && (
          <div className="flex items-center bottom-0 right-0 justify-center absolute w-1/2 h-1/3 bg-slate-800 bg-opacity-30">
            {" "}
            + {images.length - 4}
          </div>
        )}
      </div>
    </>
  );
}
