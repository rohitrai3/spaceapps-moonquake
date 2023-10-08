import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

export const getRenderer = (width: number, height: number) => {
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  document.body.appendChild(renderer.domElement);

  return renderer;
};

export const getLabelRenderer = (width: number, height: number) => {
  const renderer = new CSS2DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  document.body.appendChild(renderer.domElement);

  return renderer;
};
