import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { get3DCoordinates, get3DRotation } from "./utils";
import { getLabel } from "./Label";

export const getApolloModel = async (
  latitude: number,
  longitude: number,
  radius: number,
  scale: THREE.Vector3
) => {
  let apolloModel = new THREE.Group();
  const loader: GLTFLoader = new GLTFLoader();
  const coordinate3D = get3DCoordinates(latitude, longitude, radius);
  const rotation3D = get3DRotation(latitude, longitude);

  await loader.loadAsync("apollo_model.glb").then((gltf) => {
    gltf.scene.traverse((object) => {
      const geometry = object.geometry;
      const material = new THREE.MeshPhongMaterial({
        color: object.material?.color,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      apolloModel.add(mesh);
    });

    apolloModel.position.set(coordinate3D.x, coordinate3D.y, coordinate3D.z);
    apolloModel.rotation.set(rotation3D.x, rotation3D.y, rotation3D.z);
    apolloModel.scale.set(scale.x, scale.y, scale.z);
  });

  return apolloModel;
};

export const getApolloModels = async (radius: number, scale: THREE.Vector3) => {
  type ApolloModel = {
    model: THREE.Group;
    label: THREE.Mesh;
  };
  const apolloModels: Array<ApolloModel> = [];

  const apollo11 = {
    model: await getApolloModel(0.67416, 23.47314, radius, scale),
    label: getLabel("Apollo 11", 0.67416, 23.47314, radius, scale),
  };

  const apollo12 = {
    model: await getApolloModel(-3.0128, -23.4219, radius, scale),
    label: getLabel("Apollo 12", -3.0128, -23.4219, radius, scale),
  };

  const apollo14 = {
    model: await getApolloModel(-3.64589, -17.47194, radius, scale),
    label: getLabel("Apollo 14", -3.64589, -17.47194, radius, scale),
  };

  const apollo15 = {
    model: await getApolloModel(26.13239, 3.6333, radius, scale),
    label: getLabel("Apollo 15", 26.13239, 3.6333, radius, scale),
  };

  const apollo16 = {
    model: await getApolloModel(-8.9734, 15.5011, radius, scale),
    label: getLabel("Apollo 16", -8.9734, 15.5011, radius, scale),
  };

  const apollo17 = {
    model: await getApolloModel(20.1911, 30.7723, radius, scale),
    label: getLabel("Apollo 17", 20.1911, 30.7723, radius, scale),
  };

  apolloModels.push(apollo11);
  apolloModels.push(apollo12);
  apolloModels.push(apollo14);
  apolloModels.push(apollo15);
  apolloModels.push(apollo16);
  apolloModels.push(apollo17);

  return apolloModels;
};
