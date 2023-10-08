import * as THREE from "three";

export const getDirectionalLight = (
  position: THREE.Vector3,
  intensity: number
) => {
  const light = new THREE.DirectionalLight(0xffffff, intensity);
  light.position.set(position.x, position.y, position.z);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  return light;
};

export const getAmbientLight = (intensity: number) => {
  const light = new THREE.AmbientLight(0xffffff, intensity);

  return light;
};
