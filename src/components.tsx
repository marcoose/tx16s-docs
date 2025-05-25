import { useState, useRef } from "react";
import Konva from "konva";
import { Text, Tag, Label, Arrow } from "react-konva";

import type {
  Switch,
  SwitchPosition,
  Coord,
  Pot,
  Trim,
  TrimPosition,
  SixPos,
} from "./types";
import { POS_ICON } from "./constants";

export const InputLabel: React.FC<{
  label: string;
  initialX: number;
  initialY: number;
  onMoved: (newPos: Coord) => void;
  onMoving?: (newPos: Coord) => void;
}> = ({ label, initialX, initialY, onMoving, onMoved }) => {
  const lblRef = useRef<Konva.Label>(null);
  const sizer = new Konva.Text();
  sizer.setText(label);
  const xOffs = sizer.width() / 2;
  const yOffs = sizer.height() / 2;

  return (
    <Label
      x={initialX}
      y={initialY}
      offsetX={xOffs}
      offsetY={yOffs}
      ref={lblRef}
      onDragMove={(e) => {
        if (onMoving) {
          onMoving({ x: e.evt.offsetX, y: e.evt.offsetY });
        }
      }}
      onDragEnd={(e) => {
        onMoved(
          lblRef.current
            ? (lblRef.current._lastPos as Coord)
            : { x: e.evt.layerX, y: e.evt.layerY }
        );
      }}
      draggable
    >
      <Tag fill="white" />
      <Text text={label} padding={5} fill="black" />
    </Label>
  );
};

const InputLabelWithArrow: React.FC<{
  label: string;
  initialX: number;
  initialY: number;
  arrowX: number;
  arrowY: number;
  onMoved: (newPos: Coord) => void;
}> = ({ label, initialX, initialY, arrowX, arrowY, onMoved }) => {
  const [lblCoords, setLblCoords] = useState({
    x: initialX,
    y: initialY,
  });

  return (
    <>
      <Arrow
        points={[lblCoords.x, lblCoords.y, arrowX, arrowY]}
        stroke="red"
        strokeWidth={2}
        fill={"red"}
        opacity={0.75}
      />
      <InputLabel
        label={label}
        initialX={initialX}
        initialY={initialY}
        onMoved={(newPos) => {
          onMoved(newPos);
        }}
        onMoving={(newPos) => {
          setLblCoords(newPos);
        }}
      />
    </>
  );
};

export const SwitchLabelWithArrow: React.FC<{
  switchDef: Switch;
  arrowX: number;
  arrowY: number;
  onMoved: (newPos: Coord) => void;
}> = ({ switchDef, arrowX, arrowY, onMoved }) => {
  const strings = ["    " + switchDef.title];
  for (const pos of Object.keys(POS_ICON) as SwitchPosition[]) {
    if (switchDef[pos]) {
      strings.push(`${POS_ICON[pos]} ${switchDef[pos]}`);
    }
  }
  const label = strings.join("\n");

  return (
    <InputLabelWithArrow
      label={label}
      initialX={switchDef.x}
      initialY={switchDef.y}
      arrowX={arrowX}
      arrowY={arrowY}
      onMoved={onMoved}
    />
  );
};

export const TrimLabelWithArrow: React.FC<{
  trimDef: Trim;
  arrowX: number;
  arrowY: number;
  onMoved: (newPos: Coord) => void;
}> = ({ trimDef, arrowX, arrowY, onMoved }) => {
  const strings = ["    " + trimDef.title];
  for (const pos of Object.keys(POS_ICON) as TrimPosition[]) {
    if (trimDef[pos]) {
      strings.push(`${POS_ICON[pos]} ${trimDef[pos]}`);
    }
  }
  const label = strings.join("\n");

  return (
    <InputLabelWithArrow
      label={label}
      initialX={trimDef.x}
      initialY={trimDef.y}
      arrowX={arrowX}
      arrowY={arrowY}
      onMoved={onMoved}
    />
  );
};

export const PotLabelWithArrow: React.FC<{
  potDef: Pot;
  arrowX: number;
  arrowY: number;
  onMoved: (newPos: Coord) => void;
}> = ({ potDef, arrowX, arrowY, onMoved }) => (
  <InputLabelWithArrow
    label={potDef.title}
    initialX={potDef.x}
    initialY={potDef.y}
    arrowX={arrowX}
    arrowY={arrowY}
    onMoved={onMoved}
  />
);

export const SixPosLabelWithArrow: React.FC<{
  sixPosDef: SixPos;
  arrowX: number;
  arrowY: number;
  onMoved: (newPos: Coord) => void;
}> = ({ sixPosDef, arrowX, arrowY, onMoved }) => {
  const label = [sixPosDef.title, ...sixPosDef.positions].join("\n");
  return (
    <InputLabelWithArrow
      label={label}
      initialX={sixPosDef.x}
      initialY={sixPosDef.y}
      arrowX={arrowX}
      arrowY={arrowY}
      onMoved={onMoved}
    />
  );
};
