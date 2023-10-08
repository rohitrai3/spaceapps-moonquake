import * as THREE from "three";

export const get3DCoordinates = (
  latitude: number,
  longitude: number,
  radius: number
): THREE.Vector3 => {
  const latitudeRadian = latitude * (Math.PI / 180);
  const longitudeRadian = -longitude * (Math.PI / 180);

  const coordinate3D = new THREE.Vector3(
    Math.cos(latitudeRadian) * Math.cos(longitudeRadian) * radius,
    Math.sin(latitudeRadian) * radius,
    Math.cos(latitudeRadian) * Math.sin(longitudeRadian) * radius
  );

  return coordinate3D;
};

export const get3DRotation = (
  latitude: number,
  longitude: number
): THREE.Vector3 => {
  const latitudeRadian = latitude * (Math.PI / 180);
  const longitudeRadian = longitude * (Math.PI / 180);

  const coordinate3D = new THREE.Vector3(
    0.0,
    longitudeRadian + Math.PI * 0.5,
    latitudeRadian + Math.PI * 0.5
  );

  return coordinate3D;
};
