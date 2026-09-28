"use server";

import { prisma } from "@/app/lib/prisma";

const base_date: Date = new Date();
export default async function RaceProvider() {
  const state = prisma.raceState.findMany().then((states) => {
    const sorted_states = states.sort(
      (a, b) => b.timestamp.valueOf() - a.timestamp.valueOf(),
    );
    if (sorted_states.length == 0) {
      return { timestamp: base_date, state: "" };
    } else {
      const most_recent = states[0];
      let state = "";
      if (most_recent.state) {
        state = most_recent.state.toString();
      }
      return { timestamp: most_recent.timestamp, state: state };
    }
  });
  return state;
}
