import { EWeather } from "@/lib/wasm/simulation";
import { useContext, createContext } from "react";
import { SimulationContext } from "./simulation";

const initial = 0;
export const WeatherContext = createContext<EWeather>(initial);

export default function WeatherCon({ children }: React.PropsWithChildren) {
  const { weather } = useContext(SimulationContext);

  return <WeatherContext value={weather}>{children}</WeatherContext>;
}
