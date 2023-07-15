// import { z } from "zod";

//@ts-ignore
export default function StatBox({ number, name }) {
  return (
    <div className="capitalize text-sm">
      <p className="font-semibold">
        {Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(number)}
      </p>
      <p className="font-light">{name}</p>
    </div>
  );
}
