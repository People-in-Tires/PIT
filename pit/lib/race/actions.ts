"use server";

import { prisma } from "@/app/lib/prisma";
import {
  ConcreteManufacturer,
  ConcreteSponsor,
  EManufacturer,
  ESponsor,
  EWeather,
  Point,
  Race,
  Racer,
} from "@/lib/wasm/simulation";

export async function pullRaceState(i: number = 0) {
  const data = await prisma.raceState.findFirst({
    orderBy: { timestamp: "desc" },
    where: { raceid: i },
  });
  if (data) {
    return {
      timestamp: data.timestamp,
      state: data.state ? data.state.toString() : "",
    };
  }
  return {
    timestamp: new Date(0),
    state: "",
  };
}

export async function pushRaceState(race_json: string, i: number = 0) {
  if (
    !(await prisma.raceState.create({
      data: {
        state: JSON.parse(race_json),
        raceid: i,
      },
    }))
  ) {
    throw Error("could not push to db");
  }
}

export interface IRacerMeta {
  manufacturer: EManufacturer;
  sponsor: ESponsor;
  forename: string;
  surname: string;
  cpu: boolean;
}

export type IPoint = { x: number; y: number } | Point;

export interface IRaceCreation {
  track: IPoint[];
  racers: IRacerMeta[];
  weather: EWeather;
}

export async function createRace(json: string): Promise<number> {
  const [{ count }]: [{ count: string }] =
    await prisma.$queryRaw`SELECT COUNT(DISTINCT raceid) FROM racestate`;
  const result = await prisma.raceState.create({
    data: {
      state: JSON.parse(json),
      raceid: parseInt(count),
    },
  });
  return result.raceid;
}
