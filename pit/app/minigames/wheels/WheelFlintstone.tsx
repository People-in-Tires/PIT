import { Bolt } from "./page";
import styles from "../../Index.module.css";
export default function WheelFlintstone() {
  return (
    <div>
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Abandoned_millstone_-_geograph.org.uk_-_1099201.jpg/960px-Abandoned_millstone_-_geograph.org.uk_-_1099201.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
        }
      ></img>
      <Bolt x={50} y={50} />
    </div>
  );
}
