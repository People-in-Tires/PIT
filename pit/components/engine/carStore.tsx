"use client";

import { create } from "zustand";
import useItemStore, { Item, useItemsState } from "./itemStore";
import { ItemType } from "./RenderItem";
import { Car, Wheel } from "@/lib/wasm/simulation";
import { EWheelType } from "@/lib/wasm/simulation";
import { createLitter } from "../items/GrillLitter";

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
  litter: number;
  fueltank: IFuel;
  car_number: number;
}

export function createDefaultCar(id: number): ICar {
  const create = useItemStore.getState().create;
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
    litter: 20,
    fueltank: { max: 20000, milliliters: 0.0, tightenedPer: 1.0 },
    car_number: -1,
  };
}

interface CarStore {
  in_stop: ICar | undefined;
  tag: string;
  setCarSim: (car: Car) => void;
  resetCar: () => void;
  setLitter: (litter: number) => void;
  setWheel: (wheelIndex: number, wheel: number) => void;
  setBackflap: (backflap: IWing) => void;
  setFueltank: (fueltank: IFuel) => void;
  addLitter: (litter: number) => void;
  addFuel: (fuel: number) => void;
}

const useCarStore = create<CarStore>((set) => ({
  in_stop: undefined,
  tag: "carstore",

  setCarSim: (car) => {
    for (let i = 0; i < car.chassis.naughtiness * 10; i++) {
      createLitter();
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
        litter: car.chassis.naughtiness * 10,
        backflap: { angle: car.chassis.stickiness * 45 - 90, tightenedPer: 1 },
        fueltank: {
          max: car.chassis.tenderness,
          milliliters: car.chassis.fuel,
          tightenedPer: 1,
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

  setLitter: (litter) =>
    set((state) => ({
      in_stop: { ...state.in_stop!, litter },
    })),

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
  addLitter: (litter: number) =>
    set((state) => ({
      in_stop: { ...state.in_stop!, litter: (state.in_stop!.litter += litter) },
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
  const items = useItemStore.getState().items;
  if (state == undefined) return undefined;
  const chassis = car.chassis;
  const wheels = car.wheels;
  if (items[state.wheels[0]])
    translateWheeltoSim(wheels.sinistral_posterior,items[state.wheels[0]]);
  if (items[state.wheels[1]])
    translateWheeltoSim(wheels.sinistral_anterior,items[state.wheels[1]]);
  if (items[state.wheels[2]])
    translateWheeltoSim(wheels.dextral_posterior, items[state.wheels[2]]);
  if (items[state.wheels[3]])
    translateWheeltoSim(wheels.dextral_anterior, items[state.wheels[3]]);
  chassis.stickiness = (state.backflap.angle + 90) / 45;
  chassis.naughtiness = state.litter / 10;
  chassis.fuel = state.fueltank.milliliters;
  car.chassis = chassis;
  car.wheels = wheels;
  return car;
}

export default useCarStore;
