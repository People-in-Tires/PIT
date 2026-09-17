"use client";

import { create } from "zustand";

export interface IBoltable {
  boltPercentage: number;
}

export interface IWing extends IBoltable {
  angle: number;
}

export interface IWheel extends IBoltable {
  type: "normalWheel"; //fill in with other wheel item names
}

export interface IFuel extends IBoltable {
  milliliters: number;
}

export interface ICar {
  id: number;
  wheels: (IWheel | null)[];
  backflap: IWing;
  litter: number;
  fueltank: IFuel;
}

export function createDefaultCar(id: number): ICar {
  return {
    id,
    wheels: [
      { type: "normalWheel", boltPercentage: 1.0 },
      { type: "normalWheel", boltPercentage: 1.0 },
      { type: "normalWheel", boltPercentage: 1.0 },
      { type: "normalWheel", boltPercentage: 1.0 },
    ],
    backflap: { angle: 0, boltPercentage: 1.0 },
    litter: 20,
    fueltank: { milliliters: 0.0, boltPercentage: 1.0 },
  };
}

interface CarStore {
  cars: ICar[];
  setLitter: (id: number, litter: number) => void;
  setWheel: (id: number, wheelIndex: number, wheel: IWheel | null) => void;
  setBackflap: (id: number, backflap: IWing) => void;
  setFueltank: (id: number, fueltank: IFuel) => void;
  addLitter: (id: number, litter: number) => number;
  addFuel: (id: number, fuel: number) => number;
}

const useCarStore = create<CarStore>((set) => ({
  cars: [createDefaultCar(0), createDefaultCar(1)],

  setLitter: (id, litter) =>
    set((state) => ({
      cars: state.cars.map((car) => (car.id === id ? { ...car, litter } : car)),
    })),

  setWheel: (id, wheelIndex, wheel) =>
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id
          ? {
              ...car,
              wheels: car.wheels.map((w, i) => (i === wheelIndex ? wheel : w)),
            }
          : car,
      ),
    })),

  setBackflap: (id, backflap) =>
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id ? { ...car, backflap } : car,
      ),
    })),

  setFueltank: (id, fueltank) =>
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id ? { ...car, fueltank } : car,
      ),
    })),
  addLitter: (id: number, litter: number) => {
    let newLitter = 0;
    set((state) => ({
      cars: state.cars.map((car) => {
        if (car.id === id) {
          newLitter = car.litter;
          newLitter += litter;
          return { ...car, newLitter };
        }
        return car;
      }),
    }));
    return litter;
  },
  addFuel: (id: number, fuel: number) => {
    let newFuel: IFuel = { milliliters: 0, boltPercentage: 0.0 };
    set((state) => ({
      cars: state.cars.map((car) => {
        if (car.id === id) {
          newFuel = car.fueltank;
          newFuel.milliliters += fuel;
          return { ...car, ...newFuel };
        }
        return car;
      }),
    }));
    return fuel;
  },
}));

export function useCar(id: number) {
  return useCarStore((state) => state.cars.find((car) => car.id === id));
}

export function getCar(id: number) {
  return useCarStore.getState().cars.find((car) => car.id === id);
}

export default useCarStore;
