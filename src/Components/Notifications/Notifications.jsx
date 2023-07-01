import SingleNotification from "./SIngleNotification";

export default function Notifications() {
  return (
    <div className="bg-base-200">
      <h2 className="text-center font-bold text-lg md:text-xl py-6">Notifications</h2>
      <div className="space-y-5 md:mx-60 bg-base-300 py-6">
        {[
          {
            image: "https://source.unsplash.com/mEZ3PoFGs_k",
            person: "sara doe",
            action: "reacted your post",
            text: "ha ha",
            time: [-5, "minute"],
          },
          {
            image: "https://source.unsplash.com/AJIqZDAUD7A",
            person: "lily butt",
            action: "commented on your post",
            text: "very nice",
            time: [-3, "hour"],
          },
          {
            image: "https://source.unsplash.com/KBv5dEN3QtY",
            person: "frank morris",
            action: "shared your post",
            text: "",
            time: [-1, "day"],
          },
          {
            image: "https://source.unsplash.com/uyaTT9u6AvI",
            person: "alex stone",
            action: "reacted your photo",
            text: "love",
            time: [-4, "day"],
          },
          {
            image: "https://source.unsplash.com/mEZ3PoFGs_k",
            person: "sara doe",
            action: "reacted your post",
            text: "ha ha",
            time: [-5, "minute"],
          },
          {
            image: "https://source.unsplash.com/AJIqZDAUD7A",
            person: "lily butt",
            action: "commented on your post",
            text: "very nice",
            time: [-3, "hour"],
          },
          {
            image: "https://source.unsplash.com/KBv5dEN3QtY",
            person: "frank morris",
            action: "shared your post",
            text: "",
            time: [-1, "day"],
          },
          {
            image: "https://source.unsplash.com/uyaTT9u6AvI",
            person: "alex stone",
            action: "reacted your photo",
            text: "love",
            time: [-4, "day"],
          },
          {
            image: "https://source.unsplash.com/mEZ3PoFGs_k",
            person: "sara doe",
            action: "reacted your post",
            text: "ha ha",
            time: [-5, "minute"],
          },
          {
            image: "https://source.unsplash.com/AJIqZDAUD7A",
            person: "lily butt",
            action: "commented on your post",
            text: "very nice",
            time: [-3, "hour"],
          },
          {
            image: "https://source.unsplash.com/KBv5dEN3QtY",
            person: "frank morris",
            action: "shared your post",
            text: "",
            time: [-1, "day"],
          },
          {
            image: "https://source.unsplash.com/uyaTT9u6AvI",
            person: "alex stone",
            action: "reacted your photo",
            text: "love",
            time: [-4, "day"],
          },
        ].map(({ image, person, action, text, time }, i) => (
          <SingleNotification
            key={`asdfasdf${i}`}
            image={image}
            person={person}
            action={action}
            text={text}
            time={time}
          />
        ))}
      </div>
    </div>
  );
}
