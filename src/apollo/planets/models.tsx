export interface Planet {
  size: number;
  type: number;
  color: string;
  orbit: number;
  orbit2: number;
}

export interface PlanetState {
  planets: Planet[];
}
