// import MiniMap from "@/components/MiniMap";
import RaceProvider from "@/components/raceProvider";
// import Simulation from "@/context/simulation";

export default async function page() {
  const data = await RaceProvider();
  console.log(data);
  return <>race last updated at {data.state}</>;
}
