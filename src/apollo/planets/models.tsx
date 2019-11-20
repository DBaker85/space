export interface Planet {
  size: number;
  type: number;
  color: string;
  orbit: number;
  orbit2: number;
  rotation: number;
}

export interface PlanetState {
  planets: Planet[];
}
