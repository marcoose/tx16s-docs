import { RadioConfig } from "./types";

export const defaultConfig: RadioConfig = {
  name: "Example Config",
  switches: {
    sa: {
      title: "SA",
      up: "Up",
      middle: "Mid",
      down: "Down",
      x: 24,
      y: 150,
    },
    sb: {
      title: "SB",
      up: "High",
      middle: "Med",
      down: "Low",
      x: 142,
      y: 31,
    },
    sc: {
      title: "SC",
      up: "High",
      middle: "Med",
      down: "Low",
      x: 317,
      y: 28,
    },
    sd: {
      title: "Rates [SD]",
      up: "High",
      middle: "Med",
      down: "Low",
      x: 424,
      y: 149,
    },
    se: {
      title: "SE",
      up: "High",
      middle: "Med",
      down: "Low",
      x: 33,
      y: 84,
    },
    sf: {
      title: "SF",
      up: "High",
      down: "Low",
      x: 74,
      y: 33,
    },
    sg: {
      title: "SG",
      up: "High",
      middle: "Med",
      down: "Low",
      x: 423,
      y: 81,
    },
    sh: {
      title: "SH",
      up: "High",
      middle: "Med",
      down: "Low",
      x: 372,
      y: 34,
    },
  },
  pots: {
    ls: {
      title: "RL",
      x: 17,
      y: 200,
    },
    rs: {
      title: "RS",
      x: 433,
      y: 196,
    },
    s1: {
      title: "S1",
      x: 191,
      y: 35,
    },
    s2: {
      title: "S2",
      x: 265,
      y: 38,
    },
  },
  trims: {
    t1: {
      title: "T1",
      up: "Up",
      down: "Down",

      x: 433,
      y: 246,
    },
    t2: {
      title: "T2",
      up: "Up",
      down: "Down",

      x: 386,
      y: 219,
    },
    t3: {
      title: "T3",
      up: "Up",
      down: "Down",

      x: 68,
      y: 216,
    },
    t4: {
      title: "T4",
      up: "Up",
      down: "Down",

      x: 22,
      y: 243,
    },
    t5: {
      title: "T5",
      up: "Up",
      down: "Down",
      x: 176,
      y: 103,
    },
    t6: {
      title: "T6",
      up: "Up",
      down: "Down",
      x: 284,
      y: 105,
    },
  },
  sixPos: {
    title: "6 Pos",
    positions: ["1: One", "2: Two", "3: Three", "4: Four", "5: Five", "6: Six"],
    x: 232,
    y: 58,
  },
};
