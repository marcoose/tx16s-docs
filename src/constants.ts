import type { Coord, SwitchName, PotName, TrimName } from "./types";

export const switchCoords: Record<SwitchName, Coord> = {
  sa: { x: 152, y: 165 },
  sd: { x: 330, y: 165 },

  sb: { x: 172, y: 153 },
  sc: { x: 307, y: 153 },

  se: { x: 131, y: 150 },
  sg: { x: 350, y: 150 },

  sf: { x: 138, y: 136 },
  sh: { x: 344, y: 136 },
};

export const potCoords: Record<PotName, Coord> = {
  ls: { x: 127, y: 178 },
  rs: { x: 354, y: 178 },
  s1: { x: 215, y: 153 },
  s2: { x: 265, y: 153 },
};

export const trimCoords: Record<TrimName, Coord> = {
  t1: { x: 302, y: 262 },
  t4: { x: 179, y: 262 },

  t2: { x: 265, y: 245 },
  t3: { x: 212, y: 245 },

  t6: { x: 265, y: 200 },
  t5: { x: 212, y: 200 },
};

export const sixPosCoord: Coord = { x: 240, y: 178 };

export const POS_ICON = {
  up: "\u25B2",
  middle: "\u23F9", //"\u25B6", //"\u2014",
  down: "\u25BC",
};

export const getRadioImage = () => {
  const img = new Image();
  img.src = "canvas-back.png";
  return img;
};
