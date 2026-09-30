"use server";

import { prisma } from "@/app/lib/prisma";

export async function getRaceState() {
  const data = await prisma.raceState.findFirst({
    orderBy: { timestamp: "asc" },
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

export async function pushRaceState(race_json: string) {
  if (
    !(await prisma.raceState.create({
      data: {
        state: race_json,
      },
    }))
  ) {
    throw Error("could not push to db");
  }
}
