import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import moonquakeData from "./data/moonquake.json";
import { getMoonquakeModels } from "./MoonquakeModel";
import { getMoonModel } from "./MoonModel";
import { getLabelRenderer, getRenderer } from "./Renderer";
import { getCamera } from "./Camera";
import { getAmbientLight, getDirectionalLight } from "./Light";
import { getApolloModels } from "./ApolloModel";

async function init() {
  const radius = 1;
  const scale = new THREE.Vector3(0.01, 0.01, 0.01);
  const cameraDistance = radius * 2;
  const lightPosition = new THREE.Vector3(1, 0, 0);
  const directionalLightIntensity = 5;
  const ambientLightIntensity = 0.3;

  const renderer = getRenderer(window.innerWidth, window.innerHeight);
  const labelRenderer = getLabelRenderer(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = getCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000,
    0,
    0,
    cameraDistance
  );
  const directionalLight = getDirectionalLight(
    lightPosition,
    directionalLightIntensity
  );
  const ambientLight = getAmbientLight(ambientLightIntensity);

  const orbitControls = new OrbitControls(camera, labelRenderer.domElement);
  orbitControls.update();

  const moonModel = await getMoonModel(radius);
  moonModel.rotation.x = 6.68 * (Math.PI / 180);

  const apolloModels = await getApolloModels(radius, scale);

  const uniforms = {
    amplitude: { value: 0.0 },
    index: { value: 0 },
  };

  const moonquakeModels = getMoonquakeModels(
    moonquakeData,
    radius,
    scale,
    uniforms
  );

  const sphereGeometry = new THREE.SphereGeometry(0.1);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  function animate() {
    requestAnimationFrame(animate);

    moonquakeModels.forEach((moonquakeModel) => {
      moonModel.add(moonquakeModel.model);
      moonquakeModel.animation();
    });

    apolloModels.forEach((apolloModel) => {
      moonModel.add(apolloModel.label);
      moonModel.add(apolloModel.model);
    });

    sphere.rotation.y += 0.01;

    sphere.add(directionalLight);
    scene.add(ambientLight);
    scene.add(moonModel);
    scene.add(sphere);

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  animate();
}

init();
