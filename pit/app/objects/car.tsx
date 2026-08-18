"use client";

export default class Car {
  litter: number;
  setLitter = (litter: MessageEvent<number>) => {
    this.litter = litter.data;
    console.log("setlitter", litter.data);
  };

  constructor() {
    this.litter = 20;
  }
}
