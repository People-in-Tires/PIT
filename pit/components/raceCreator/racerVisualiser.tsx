"use client";

import { IRacerMeta } from "@/lib/race/actions";
import { EManufacturer, ESponsor } from "@/lib/wasm/simulation";
import { Fragment } from "react/jsx-runtime";

export type racerProps = {
  racers: IRacerMeta[];
  index: number;
  setRacers(r: IRacerMeta[]): void;
};
type nameRacerProps = {
  surname: boolean;
  racers: IRacerMeta[];
  index: number;
  setRacers(r: IRacerMeta[]): void;
};

function RacerManufacturerSelector({ racers, index, setRacers }: racerProps) {
  function updateManufacturer(man: string) {
    const next = racers.slice();
    next[index].manufacturer = EManufacturer[man as keyof typeof EManufacturer];
    setRacers(next);
  }
  return (
    <select
      name="racerManufacturer"
      id="racerManufacturer"
      value={EManufacturer[racers[index].manufacturer]}
      onChange={(e) => updateManufacturer(e.target.value)}
    >
      {Object.keys(EManufacturer)
        .filter((k) => !isFinite(+k))
        .map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
    </select>
  );
}

function RacerSponsorSelector({ racers, index, setRacers }: racerProps) {
  function updateSponsor(sponsor: string) {
    const next = racers.slice();
    next[index].sponsor = ESponsor[sponsor as keyof typeof ESponsor];
    setRacers(next);
  }
  return (
    <select
      name="racerSponsor"
      id="racerSponsor"
      value={ESponsor[racers[index].sponsor]}
      onChange={(e) => updateSponsor(e.target.value)}
    >
      {Object.keys(ESponsor)
        .filter((k) => !isFinite(+k))
        .map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
    </select>
  );
}

function RacerNameInput(p: nameRacerProps) {
  const { racers, index, setRacers, surname } = p;
  function updateRacerName(name: string) {
    const next = [...racers];
    const replace = next[index];
    if (surname) {
      replace.surname = name;
    } else {
      replace.forename = name;
    }
    next[index] = replace;
    setRacers(next);
  }

  return (
    <input
      id={`racer${surname ? "Surname" : "Forename"}`}
      type="text"
      value={surname ? racers[index].surname : racers[index].forename}
      placeholder="leave empty to randomize"
      maxLength={64}
      onChange={(e) => updateRacerName(e.target.value)}
    />
  );
}

function RacerCpu(p: racerProps) {
  const { racers, index, setRacers } = p;
  function setCpu(b: string) {
    const next = racers.slice();
    next[index].cpu = b == "true";
    setRacers(next);
  }

  return (
    <select
      name="racerCPU"
      id="racerCPU"
      value={racers[index].cpu.toString()}
      onChange={(e) => setCpu(e.target.value)}
    >
      <option key="true" value="true">
        true
      </option>
      <option key="false" value="false">
        false
      </option>
    </select>
  );
}

export function RacerSetter(p: racerProps) {
  return (
    <Fragment>
      forename: <RacerNameInput surname={false} {...p} />
      surname: <RacerNameInput surname={true} {...p} />
      sponsor: <RacerSponsorSelector {...p} />
      manufacturer: <RacerManufacturerSelector {...p} />
      CPU PIT crew: <RacerCpu {...p} />
    </Fragment>
  );
}

export function InlineRacerVisualiser({ racers, index }: racerProps) {
  return (
    <Fragment>
      &quot;{racers[index].forename}&nbsp;
      {racers[index].surname}&quot;,
      {ESponsor[racers[index].sponsor]},
      {EManufacturer[racers[index].manufacturer]},{racers[index].cpu}
    </Fragment>
  );
}

export function RacerVisualiser({ racers, index }: racerProps) {
  return (
    <Fragment>
      racer #{index}: <br />
      forename: {racers[index].forename}
      <br />
      surname: {racers[index].surname}
      <br />
      sponsor: {ESponsor[racers[index].sponsor]}
      <br />
      manufacturer: {EManufacturer[racers[index].manufacturer]}
      <br />
    </Fragment>
  );
}
