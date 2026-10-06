"use client";

import { create } from "zustand";
import useItemStore, { Item } from "./itemStore";
import { ItemType } from "./RenderItem";
import { Car } from "@/lib/wasm/simulation";
import { useState } from "react";
import { EWheelType } from "@/lib/wasm/simulation";

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
}

export function createDefaultCar(id: number): ICar {
  const add = useItemStore.getState().add;
  return {
    wheels: [
      add({
        type: "normalwheel",
        container: `${id} car`,
        attachedTo: true,
        invSlot: 3,
        height: 10,
        width: 10,
        x: 150,
        y: 100,
      }),
      add({
        type: "normalwheel",
        container: `${id} car`,
        attachedTo: true,
        invSlot: 3 + 1,
        height: 10,
        width: 10,
        x: 150,
        y: 100,
      }),
      add({
        type: "normalwheel",
        container: `${id} car`,
        attachedTo: true,
        invSlot: 3 + 2,
        height: 10,
        width: 10,
        x: 150,
        y: 100,
      }),
      add({
        type: "normalwheel",
        container: `${id} car`,
        attachedTo: true,
        invSlot: 3 + 3,
        height: 10,
        width: 10,
        x: 150,
        y: 100,
      }),
    ],
    backflap: { angle: 0, tightenedPer: 1.0 },
    litter: 20,
    fueltank: { max: 20000, milliliters: 0.0, tightenedPer: 1.0 },
  };
}

interface CarStore {
  in_stop: ICar | undefined;
  sim_value: Car | undefined;
  tag: string;
  setCarSim: (car: Car) => void;
  setLitter: (litter: number) => void;
  setWheel: (wheelIndex: number, wheel: number) => void;
  setBackflap: (backflap: IWing) => void;
  setFueltank: (fueltank: IFuel) => void;
  addLitter: (litter: number) => void;
  addFuel: (fuel: number) => void;
}

const useCarStore = create<CarStore>((set) => ({
  in_stop: undefined,
  sim_value: undefined,
  tag: "carstore",

  setCarSim: (car) =>
    set((state) => ({
      in_stop: {
        ...state.in_stop,
        wheels: [
          car.wheels.sinistral_posterior.type
            ? useItemStore.getState().create({
                type: `${car.wheels.sinistral_posterior.type}wheel`,
                container: state.tag,
                invSlot: 3 + 0,
              })
            : -1,
          car.wheels.sinistral_anterior.type
            ? useItemStore.getState().create({
                type: `${car.wheels.sinistral_anterior.type}wheel`,
                container: state.tag,
                invSlot: 3 + 1,
              })
            : -1,
          car.wheels.dextral_posterior.type
            ? useItemStore.getState().create({
                type: `${car.wheels.dextral_posterior.type}wheel`,
                container: state.tag,
                invSlot: 3 + 2,
              })
            : -1,
          car.wheels.dextral_anterior.type
            ? useItemStore.getState().create({
                type: `${car.wheels.dextral_anterior.type}wheel`,
                container: state.tag,
                invSlot: 3 + 3,
              })
            : -1,
        ],
        litter: car.chassis.naughtiness * 10,
        backflap: { angle: car.chassis.stickiness * 45, tightenedPer: 1 },
        fueltank: {
          max: car.chassis.tenderness,
          milliliters: car.chassis.fuel,
          tightenedPer: 1,
        },
      },
      sim_value: car,
    })),

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

export function getCarSim() {
  const value: Car | undefined = useCarStore.getState().sim_value;
  const state = useCarStore.getState().in_stop;
  const items = useItemStore.getState().items;
  if (!value || !state) return undefined;
  value.chassis.stickiness = state.backflap.angle / 45;
  value.wheels.sinistral_posterior.type = items[state.wheels[0]].type.replace(
    "wheel",
    "",
  ) as EWheelType;
  value.wheels.sinistral_anterior.type = items[state.wheels[1]].type.replace(
    "wheel",
    "",
  ) as EWheelType;
  value.wheels.dextral_posterior.type = items[state.wheels[2]].type.replace(
    "wheel",
    "",
  ) as EWheelType;
  value.wheels.dextral_anterior.type = items[state.wheels[3]].type.replace(
    "wheel",
    "",
  ) as EWheelType;
  value.chassis.naughtiness = state.litter / 10;
  value.chassis.fuel = state.fueltank.milliliters;
  return value;
}

export default useCarStore;
