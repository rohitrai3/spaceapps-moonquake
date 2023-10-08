import * as THREE from "three";
import { getApolloModel } from "./ApolloModel";
import { get3DCoordinates, get3DRotation } from "./utils";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

export const getLabel = (
  text: string,
  latitude: number,
  longitude: number,
  radius: number,
  scale: THREE.Vector3
) => {
  const coordinate3D = get3DCoordinates(latitude, longitude, radius);
  const labelDiv = document.createElement("div");
  labelDiv.className = "label";
  labelDiv.textContent = text;
  labelDiv.style.color = "white";

  const label = new CSS2DObject(labelDiv);
  label.position.set(coordinate3D.x, coordinate3D.y, coordinate3D.z);
  label.center.set(0, 1);

  return label;
};
