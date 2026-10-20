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
        state: race_json,
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

function createRacer({
  manufacturer,
  sponsor,
  forename,
  surname,
  cpu,
}: IRacerMeta): Racer {
  const car = new ConcreteManufacturer(manufacturer).manufacture_car();
  const driver = new ConcreteSponsor(sponsor).scout();
  if (forename != "") driver.set_forename(forename);
  if (surname != "") driver.set_surname(surname);
  const racer = new Racer(0, 0);
  racer.driver = driver;
  racer.car = car;
  racer.cpu_pit = cpu;
  return racer;
}

function createTrack(points: IPoint[]): Point[] {
  if (points.length != 8) throw RangeError;
  const rv: Point[] = points.map((point) => new Point(point.x, point.y));
  rv.concat(points.slice(0, 3).map((point) => new Point(point.x, point.y)));
  return rv;
}

export async function createRace({
  track,
  racers,
  weather,
}: IRaceCreation): Promise<number> {
  const id: number =
    await prisma.$queryRaw`SELECT COUNT(DISTINCT raceid) FROM racestate`;
  const race = new Race(racers.map(createRacer), createTrack(track), weather);
  const result = await prisma.raceState.create({
    data: {
      state: race.to_json(),
      raceid: id,
    },
  });
  return result.raceid;
}
