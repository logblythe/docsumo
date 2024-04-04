export type Coordinate = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CoordinateWithColor = Coordinate & {
  color: string;
};
