import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const getMoonModel = async (radius: number) => {
  const loader: GLTFLoader = new GLTFLoader();
  let moonModel: THREE.Group = new THREE.Group();

  await loader.loadAsync("moon_model.glb").then((gltf) => {
    gltf.scene.traverse((object) => {
      const geometry = object.geometry;
      const material = new THREE.MeshPhongMaterial({
        map: object.material?.map,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      moonModel.add(mesh);
    });
  });

  return moonModel;
};
