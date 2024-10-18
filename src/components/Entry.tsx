import dayjs from "dayjs";
import { BurritoEntry } from "../lib/types";
import { BurritoPeer } from "../features/peers";

const colors = ["#C700D1", "#E4028C", "#FF0066", "#FF9B16"];

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const Entry = ({ entry, peer }: { entry: BurritoEntry; peer: BurritoPeer }) => {
  const color = randomColor();

  return (
    <div
      className="flex flex-col gap-2 rounded-2xl p-2"
      // style={{ boxShadow: `0px 0px 18px 32px ${color}`, background: color }}
    >
      <a
        href={`${peer.url}/${entry.hash}`}
        className="font-lucky text-center text-3xl font-bold hover:underline"
        // className="font-bold text-3xl hover:underline font-lucky underline"
        style={{
          letterSpacing: "0.075em",
          // textShadow: "0px 0px 16px rgba(0,0,0,.5)",
        }}
      >
        {entry.title ? entry.title.replaceAll('"', "") : "Untitled"}
      </a>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 text-xl">
          <a href={peer.url} className="text-burrito-link hover:underline">
            {peer.display}
          </a>
          <p>•</p>
          <p>{dayjs(entry.created * 1000).format("MMM D, YYYY - h:mma")}</p>
        </div>
        <p>{entry.location}</p>
      </div>
      {/* <p>{entry.hash}</p> */}
      {entry.type === "video" && (
        <video
          src={`${peer.url}/v/${entry.hash}`}
          controls
          className="mt-4 rounded-3xl shadow-xl"
          // className="h-96 w-fit self-center"
          style={
            {
              // boxShadow: "0px 0px 18px 4px rgba(0,0,0,.35)",
            }
          }
        />
      )}
      {entry.type === "image" && (
        <img
          src={`${peer.url}/i/${entry.hash}`}
          alt={entry.description}
          className="mt-2 rounded-3xl shadow-xl"
          style={
            {
              // boxShadow: "0px 0px 35px 4px rgba(0,0,0,.5)",
            }
          }
        />
      )}
      {(entry.type === "audio" || entry.type === "text") && (
        <p>{entry.summary}</p>
      )}
      {entry.description && (
        <p className="text-sm italic">{entry.description}</p>
      )}
    </div>
  );
};

export default Entry;
