import { useState, useRef } from "react";
import { JsonEditor } from "json-edit-react";
import Konva from "konva";
import { Stage, Layer, Image as KImage, Rect } from "react-konva";
import type {
  SwitchName,
  TrimName,
  PotName,
  Coord,
  RadioConfig,
} from "./types";
import {
  switchCoords,
  potCoords,
  trimCoords,
  getRadioImage,
  sixPosCoord,
} from "./constants";
import {
  PotLabelWithArrow,
  SwitchLabelWithArrow,
  TrimLabelWithArrow,
  SixPosLabelWithArrow,
  InputLabel,
} from "./components";
import { defaultConfig } from "./config";

import "./app.css";

let fileLoad = 0;

const App = () => {
  const [jsonInput, setJsonInput] = useState<RadioConfig>(defaultConfig);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const stageRef = useRef<Konva.Stage>(null);

  const saveImage = () => {
    if (stageRef.current) {
      const link = document.createElement("a");
      link.download =
        (jsonInput.name || "").toLowerCase().replace(/ /g, "_") ||
        "tx16_doc.png";
      link.href = stageRef.current.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          stageRef?.current?.clear();
          fileLoad++;
          setJsonInput(json);
          setSelectedFile("");
        } catch {
          alert("There was an error parsing your JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const updateLabelPosition = (
    type: keyof RadioConfig,
    key: SwitchName | PotName | TrimName,
    newPos: Coord
  ) => {
    setJsonInput((prev) => {
      return {
        ...prev,
        [type]: {
          // @ts-expect-error I don't know how to type this correctly; keys are optional but one of them will always exist
          ...prev[type],
          [key]: {
            // @ts-expect-error TS can't know that key works for type, but it will
            ...prev[type][key],
            x: newPos.x,
            y: newPos.y,
          },
        },
      };
    });
  };

  const { switches, pots, trims, sixPos, text } = jsonInput;

  let textLabels = null;
  if (Array.isArray(text) && text.length > 0) {
    textLabels = text.map((t, i) =>
      t ? (
        <InputLabel
          key={`text-${i}`}
          label={t.title}
          initialX={t.x}
          initialY={t.y}
          onMoved={(newPos) => {
            setJsonInput((prev) => {
              const newConfig = { ...prev };
              if (newConfig.text?.[i]) {
                newConfig.text[i].x = newPos.x;
                newConfig.text[i].y = newPos.y;
              }
              return newConfig;
            });
          }}
        />
      ) : null
    );
  }

  return (
    <>
      <div id="main">
        <div id="left">
          <JsonEditor
            data={jsonInput}
            setData={(newJson: unknown) => {
              setJsonInput(newJson as RadioConfig);
            }}
            rootName="Radio Config"
          />
        </div>
        <div id="right">
          <div id="config">
            Load configuration:{" "}
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              value={selectedFile}
            />
          </div>
          <div id="instructions">
            <h2>Instructions</h2>
            <p>
              Edit JSON directly in the left panel to change text and add/remove
              switches and positions.
            </p>
            <p>
              To move a label, click and drag it to the desired position (this
              updates the JSON coordinates for you).
            </p>
            <p>
              Save your JSON by copying to clipboard via button beside the top
              node, and pasting to a text file. Existing JSON can be loaded with
              button above.
            </p>
            <p>
              To save the rendered image, click the "Save Image" button below
              the preview.
            </p>
            <p>
              See{" "}
              <a href="https://github.com/marcoose/tx16s-docs">
                https://github.com/marcoose/tx16s-docs
              </a>
            </p>
          </div>
          <div id="output">
            <Stage
              key={`stage_${fileLoad}`}
              id="preview"
              width={480}
              height={272}
              ref={stageRef}
            >
              <Layer>
                <Rect x={0} y={0} width={480} height={272} fill="white" />
                <KImage image={getRadioImage()} />
              </Layer>
              <Layer>
                {sixPos && (
                  <SixPosLabelWithArrow
                    sixPosDef={sixPos}
                    arrowX={sixPosCoord.x}
                    arrowY={sixPosCoord.y}
                    onMoved={(newPos) =>
                      setJsonInput((prev) => {
                        const sixPos = prev.sixPos || {
                          title: "",
                          positions: [],
                          x: 0,
                          y: 0,
                        };
                        sixPos.x = newPos.x;
                        sixPos.y = newPos.y;
                        return {
                          ...prev,
                          sixPos,
                        };
                      })
                    }
                  />
                )}
                {pots &&
                  Object.keys(pots).map((key) => {
                    const potDef = pots[key as PotName];
                    return (
                      <PotLabelWithArrow
                        key={key}
                        potDef={potDef}
                        arrowX={potCoords[key as PotName].x}
                        arrowY={potCoords[key as PotName].y}
                        onMoved={(newPos) =>
                          updateLabelPosition("pots", key as PotName, newPos)
                        }
                      />
                    );
                  })}
                {trims &&
                  Object.keys(trims).map((key) => {
                    const trimDef = trims[key as TrimName];
                    return (
                      <TrimLabelWithArrow
                        key={key}
                        trimDef={trimDef}
                        arrowX={trimCoords[key as TrimName].x}
                        arrowY={trimCoords[key as TrimName].y}
                        onMoved={(newPos) =>
                          updateLabelPosition("trims", key as TrimName, newPos)
                        }
                      />
                    );
                  })}
                {switches &&
                  Object.keys(switches).map((key) => {
                    const switchDef = switches[key as SwitchName];
                    return (
                      <SwitchLabelWithArrow
                        key={key}
                        switchDef={switchDef}
                        arrowX={switchCoords[key as SwitchName].x}
                        arrowY={switchCoords[key as SwitchName].y}
                        onMoved={(newPos) =>
                          updateLabelPosition(
                            "switches",
                            key as SwitchName,
                            newPos
                          )
                        }
                      />
                    );
                  })}
                {textLabels}
              </Layer>
            </Stage>
            <button onClick={saveImage}>Save Image</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
