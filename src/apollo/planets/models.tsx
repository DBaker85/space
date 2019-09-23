export interface Planet {
  size: number;
  type: number;
  color: string;
  orbit: number;
}

export interface PlanetState {
  planets: Planet[];
}
