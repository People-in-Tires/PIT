import { SimulationContext } from "@/context/simulation";
import { Race, Point, Racer, Weather } from "@/lib/wasm/simulation";
import { useContext, useState } from "react";

function set_forename(racer: Racer, name: string): void {
  const driver = racer.driver;
  driver.set_forename(name);
  racer.driver = driver;
}
function set_surname(racer: Racer, name: string): void {
  const driver = racer.driver;
  driver.set_surname(name);
  racer.driver = driver;
}
function set_name(racer: Racer, forename: string, surname: string): void {
  set_forename(racer, forename);
  set_surname(racer, surname);
}

export default function ServerRaceManager() {
  const ready = useContext(SimulationContext);
  const [race, setRace] = useState<Race | null>(null);
  const [times, setTimes] = useState<number>(0);
  if (!ready) {
    return <></>;
  }

  function init_race() {
    const initial_points: Point[] = [
      new Point(0.1, 0.1),
      new Point(0.5, 0.1),
      new Point(0.9, 0.1),
      new Point(0.9, 0.5),
      new Point(0.9, 0.9),
      new Point(0.5, 0.9),
      new Point(0.1, 0.9),
      new Point(0.1, 0.5),
    ];
    const racer: Racer = new Racer(0, 0);
    const racer2: Racer = new Racer(0, 0);
    set_name(racer, "Jimmothy", "Beast");
    set_name(racer2, "Chandler", "Breast");
    setRace(
      new Race(
        [racer, racer2],
        [
          ...initial_points,
          ...initial_points.slice(0, 3).map((p) => p.clone()),
        ],
        Weather.Sunny,
      ),
    );
  }
  // init_race()
  return (
    <div>
      this part is coming from the server
      <br />
      <button
        onClick={() => {
          setTimes(times + 1);
          console.log(race);
        }}
      >
        serverButton, its been pressed {times} times!
      </button>
    </div>
  );
}
