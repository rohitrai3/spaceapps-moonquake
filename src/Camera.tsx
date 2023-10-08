import * as THREE from "three";
import { get3DCoordinates } from "./utils";

export const getCamera = (
  pov: number,
  aspect: number,
  near: number,
  far: number,
  latitude: number,
  longitude: number,
  distance: number
) => {
  const coordinates3D = get3DCoordinates(latitude, longitude, distance);
  const camera = new THREE.PerspectiveCamera(pov, aspect, near, far);
  camera.position.set(coordinates3D.x, coordinates3D.y, coordinates3D.z);

  return camera;
};
