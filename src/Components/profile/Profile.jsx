import DummyCard from "./atoms/dummycard";
import StatBox from "./atoms/statBox";

import { BsThreeDots } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";

export default function Profile() {
  const [tab, setTab] = useState(0);
  const user_items = useRef(null);

  function scrollUserItems() {
    user_items.current.scrollTo({
      top: 0,
      left: tab * 400,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    scrollUserItems();
  }, [tab]);

  return (
    <>
      <div className="relative ">
        <div className="h-[85vh] z-0">
          <div className="fixed">
            <img
              className="absolute grayscale-[50%] z-[-1] top-0 left-0 w-full"
              src="https://thumbs.dreamstime.com/b/beautiful-male-model-shoot-studio-man-professional-make-up-hair-style-89501857.jpg"
            />

            <span className="absolute top-4 right-6 text-xl">
              <BsThreeDots />
            </span>

            <div className="ml-8 pt-60 flex flex-col gap-2">
              <p className="font-bold text-3xl">Danny Douglas</p>
              <p className="font-thin text-gray-300 text-lg">@dannie647</p>
              <p className="font-light text-sm capitalize text-gray-300 pr-20">
                product designer, entrepreneur, co-founder of digital software
              </p>
            </div>

            <div className="flex gap-9 justify-center items-center mt-8">
              <StatBox name="posts" number={125} />
              <StatBox name="photos" number={458} />
              <StatBox name="followers" number={12453} />
              <StatBox name="following" number={328} />
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
              <button className="bg-gradient-to-tr font-bold from-red-600 to-red-500 w-2/5 py-1 rounded-md">
                Follow
              </button>
              <button className="bg-white text-black font-bold w-2/5 py-1 rounded-md">
                Message
              </button>
            </div>

            <div className="flex relative mt-8 ml-8 gap-4 capitalize justify-start">
              <span
                className={`absolute transition-all bg-red-600 w-5 h-1 bottom-[-2px] ${
                  tab === 0
                    ? "left-[-1px]"
                    : tab === 1
                    ? "left-[57px]"
                    : "left-[126px]"
                }`}
              ></span>
              <p onClick={() => setTab(0)}>posts</p>
              <p onClick={() => setTab(1)}>photos</p>
              <p onClick={() => setTab(2)}>videos</p>
            </div>
          </div>
        </div>

        {/* just used as a demo of the feature
            TODO:replace with actual posts

         */}
        <div ref={user_items} className="flex overflow-scroll snap-x">
          <div className="snap-start snap-mandatory">
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
          </div>
          <div className="snap-start snap-mandatory">
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
          </div>
          <div className="snap-start snap-mandatory">
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
          </div>
        </div>
      </div>
    </>
  );
}
