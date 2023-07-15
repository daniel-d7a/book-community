import { type } from "os";
import { z } from "zod";

//TODO: check time value
const singleNotificationPropsSchema = z.object({
  image: z.string(),
  person: z.string(),
  action: z.string(),
  text: z.string(),
  time: z.tuple([z.number(), z.any()]),
});

type SingleNotificationProps = z.infer<typeof singleNotificationPropsSchema>;

export default function SingleNotification({
  image,
  person,
  action,
  text,
  time,
}: SingleNotificationProps) {
  return (
    <>
      <div className="flex px-6 gap-4 justify-start items-start">
        <div className="avatar">
          <div className="w-12 md:w-16 rounded-full">
            <img
              src={image}
              // src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="md:text-lg md:mt-2">
          <p className="text-white">
            <span className="font-semibold mr-1">{person}</span>
            <span>{action}</span>:
            {text !== "" && <span className="mx-1">"{text}"</span>}
          </p>
          <p className="font-light text-gray-300 text-sm">
            {new Intl.RelativeTimeFormat("en", { style: "short" }).format(
              ...time
            )}
          </p>
        </div>
      </div>
    </>
  );
}
