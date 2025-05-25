export type Coord = { x: number; y: number };
export type TrimPosition = "up" | "down";
export type SwitchPosition = TrimPosition | "middle";

export type SwitchName = "sa" | "sb" | "sc" | "sd" | "se" | "sf" | "sg" | "sh";
export type PotName = "ls" | "rs" | "s1" | "s2";
export type TrimName = "t1" | "t2" | "t3" | "t4" | "t5" | "t6";

export type Switch = { title: string } & Coord &
  Partial<{ [key in SwitchPosition]: string }>;
export type Trim = { title: string } & Coord & {
    [key in TrimPosition]: string;
  };
export type Pot = { title: string } & Coord;
export type SixPos = { title: string; positions: string[] } & Coord;

export type RadioConfig = {
  name: string;
  switches: { [key in SwitchName]: Switch };
  pots: { [key in PotName]: Pot };
  trims: { [key in TrimName]: Trim };
  sixPos?: SixPos;
  text?: [{ title: string } & Coord];
};
