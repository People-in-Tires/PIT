"use client";

import { create } from "zustand";
import useItemStore, { Item, useItemsState } from "./itemStore";
import { ItemType } from "./RenderItem";
import { Car, Wheel } from "@/lib/wasm/simulation";
import { EWheelType } from "@/lib/wasm/simulation";
import { createLitter } from "../items/GrillLitter";
import { minigame_registry } from "../UI/GameButton";

export interface IBoltable {
  tightenedPer: number;
}

export interface IWing extends IBoltable {
  angle: number;
}

export interface IWheel extends IBoltable {
  type: ItemType; //fill in with other wheel item names
}

export interface IFuel extends IBoltable {
  max: number;
  milliliters: number;
}

export interface ICar {
  wheels: number[];
  backflap: IWing;
  fueltank: IFuel;
  car_number: number;
}

export function createDefaultCar(): ICar {
  const create = useItemStore.getState().create;
  for (let i = 0; i < 10; i++) createLitter(300, 400);
  return {
    wheels: [
      create({
        type: "normalwheel",
        container: `carstore`,
        attachedTo: "spoke-3",
        invSlot: 3,
      }),
      create({
        type: "normalwheel",
        container: `carstore`,
        attachedTo: "spoke-4",
        invSlot: 3 + 1,
      }),
      create({
        type: "normalwheel",
        container: `carstore`,
        attachedTo: "spoke-5",
        invSlot: 3 + 2,
      }),
      create({
        type: "normalwheel",
        container: `carstore`,
        attachedTo: "spoke-6",
        invSlot: 3 + 3,
      }),
    ],
    backflap: { angle: 0, tightenedPer: 1.0 },
    fueltank: { max: 20000, milliliters: 0.0, tightenedPer: 1.0 },
    car_number: -1,
  };
}

interface CarStore {
  in_stop: ICar | undefined;
  tag: string;
  setCarDefault: () => void;
  setCarSim: (car: Car, windowWidth: number, windowHeight: number) => void;
  resetCar: () => void;
  setWheel: (wheelIndex: number, wheel: number) => void;
  setBackflap: (backflap: IWing) => void;
  setFueltank: (fueltank: IFuel) => void;
  addFuel: (fuel: number) => void;
}

const useCarStore = create<CarStore>((set) => ({
  in_stop: undefined,
  tag: "carstore",

  setCarDefault: () => {
    const tmp = createDefaultCar();
    return set((state) => ({ in_stop: { ...tmp } }));
  },
  setCarSim: (car, windowWidth, windowHeight) => {
    for (let i = 0; i < car.chassis.naughtiness * 10; i++) {
      createLitter(windowWidth, windowHeight);
    }
    return set((state) => ({
      in_stop: {
        ...state.in_stop,
        wheels: [
          translateWheeltoGame(car.wheels.sinistral_posterior, 3 + 0),
          translateWheeltoGame(car.wheels.sinistral_anterior, 3 + 1),
          translateWheeltoGame(car.wheels.dextral_posterior, 3 + 2),
          translateWheeltoGame(car.wheels.dextral_anterior, 3 + 3),
        ],
        backflap: {
          angle: -car.chassis.stickiness * 20,
          tightenedPer: car.chassis.tightened_wing,
        },
        fueltank: {
          max: car.chassis.tenderness,
          milliliters: car.chassis.fuel,
          tightenedPer: car.chassis.tightened_cap,
        },
        car_number: car.number,
      },
    }));
  },
  resetCar: () => {
    return set((state) => {
      const remove = useItemStore.getState().remove;
      for (const wheel of useItemsState(state.tag)) remove(wheel.id);
      return {
        in_stop: undefined,
      };
    });
  },

  setWheel: (wheelIndex, wheel) =>
    set((state) => ({
      in_stop: {
        ...state.in_stop!,
        wheels: state.in_stop!.wheels.map((w, i) =>
          i === wheelIndex ? wheel : w,
        ),
      },
    })),

  setBackflap: (backflap) =>
    set((state) => ({
      in_stop: { ...state.in_stop!, backflap },
    })),

  setFueltank: (fueltank) =>
    set((state) => ({
      in_stop: { ...state.in_stop!, fueltank },
    })),

  addFuel: (fuel: number) =>
    set((state) => ({
      in_stop: {
        ...state.in_stop!,
        fueltank: {
          ...state.in_stop!.fueltank,
          fueltank: (state.in_stop!.fueltank.milliliters += fuel),
        },
      },
    })),
}));

export function useCar() {
  return useCarStore((state) => state.in_stop);
}

export function getCar() {
  return useCarStore.getState().in_stop;
}

function translateWheeltoGame(wheel: Wheel | undefined, container: number) {
  if (!wheel) return -1;
  return useItemStore.getState().create({
    type: (wheel.type + "wheel") as ItemType,
    container: useCarStore.getState().tag,
    invSlot: container,
    wear: wheel.wear,
    attachedTo: `spoke-${container}`,
    tightenedPer: wheel.tightened,
  });
}

function translateWheeltoSim(wheel: Wheel, item: Item) {
  wheel.tightened = item.tightenedPer!;
  wheel.wear = item.wear!;
  wheel.type = item.type.replace("wheel", "") as EWheelType;
  return wheel;
}

export function getCarSim(car: Car) {
  const state = useCarStore.getState().in_stop;
  const tag = useCarStore.getState().tag;
  const items = useItemStore.getState().items;
  if (state == undefined) return undefined;
  const chassis = car.chassis;
  const wheels = car.wheels;
  if (items[state.wheels[0]])
    translateWheeltoSim(wheels.sinistral_posterior, items[state.wheels[0]]);
  if (items[state.wheels[1]])
    translateWheeltoSim(wheels.sinistral_anterior, items[state.wheels[1]]);
  if (items[state.wheels[2]])
    translateWheeltoSim(wheels.dextral_posterior, items[state.wheels[2]]);
  if (items[state.wheels[3]])
    translateWheeltoSim(wheels.dextral_anterior, items[state.wheels[3]]);
  chassis.stickiness = -state.backflap.angle / 20;
  chassis.bulletlikeness = 1 - state.backflap.angle / 20;
  chassis.naughtiness = items.filter(
    (value) =>
      value.container == tag &&
      value.invSlot == minigame_registry["grill"].base_index,
  ).length;
  chassis.fuel = state.fueltank.milliliters;
  car.chassis = chassis;
  car.wheels = wheels;
  return car;
}

export default useCarStore;
