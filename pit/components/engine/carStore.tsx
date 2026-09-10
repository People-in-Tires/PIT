"use client";

import { create } from "zustand";

interface Car {
  id: number;
  wheels: (string | null)[];
  backflap: number;
  litter: number;
}

export function createDefaultCar(id: number): Car {
  return {
    id,
    wheels: ["normalWheel", "normalWheel", "normalWheel", "normalWheel"],
    backflap: 0,
    litter: 20,
  };
}

interface CarStore {
  cars: Car[];
  setLitter: (id: number, litter: number) => void;
  setWheel: (id: number, wheelIndex: number, wheel: string | null) => void;
  setBackflap: (id: number, backflap: number) => void;
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
}));

export function useCar(id: number) {
  return useCarStore((state) => state.cars.find((car) => car.id === id));
}

export function getCar(id: number) {
  return useCarStore.getState().cars.find((car) => car.id === id);
}

export default useCarStore;
