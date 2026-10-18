"use server";

import { prisma } from "@/app/lib/prisma";

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
