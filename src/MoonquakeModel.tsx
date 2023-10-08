import * as THREE from "three";
import { get3DCoordinates, get3DRotation } from "./utils";
import { getVertexShader } from "./shaders/vertex";
import { getFragmentShader } from "./shaders/fragment";
import waveformData from "./data/waveform.json";

type MoonquakeModel = {
  model: THREE.Mesh;
  animation: () => void;
};

export const getMoonquakeModel = (
  latitude: number,
  longitude: number,
  radius: number,
  scale: THREE.Vector3,
  uniforms: { [uniform: string]: THREE.IUniform<any> }
) => {
  const coordinate3D = get3DCoordinates(latitude, longitude, radius);

  const vertexShaderScript = document.createElement("script");
  vertexShaderScript.setAttribute("id", "vertexshader");
  vertexShaderScript.innerText = getVertexShader();
  document.body.appendChild(vertexShaderScript);

  const fragmentShaderScript = document.createElement("script");
  fragmentShaderScript.setAttribute("id", "fragmentshader");
  fragmentShaderScript.innerText = getFragmentShader();
  document.body.appendChild(fragmentShaderScript);

  const geometry = new THREE.PlaneGeometry(200, 200, 200, 200);
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexshader")?.textContent!,
    fragmentShader: document.getElementById("fragmentshader")?.textContent!,
  });

  const model = new THREE.Mesh(geometry, material);
  model.position.set(coordinate3D.x, coordinate3D.y, coordinate3D.z);
  model.scale.set(scale.x / 50, scale.y / 50, scale.z / 50);
  model.lookAt(0, 0, 0);

  let amplitudeIndex = 0;
  let ringRadius = 0;

  const animation = () => {
    material.uniforms.amplitude.value =
      waveformData["data"].split(",")[amplitudeIndex++];
    if (amplitudeIndex == 100) amplitudeIndex = 0;

    material.uniforms.index.value = ringRadius;
    ringRadius++;
    if (ringRadius == 100) ringRadius = 0;
  };

  const moonquakeModel: MoonquakeModel = {
    model: model,
    animation: animation,
  };

  return moonquakeModel;
};

export const getMoonquakeModels = (
  moonquakeData,
  radius: number,
  scale: THREE.Vector3,
  uniforms: { [uniform: string]: THREE.IUniform<any> }
) => {
  const moonquakeModels: Array<MoonquakeModel> = [];

  for (const key in moonquakeData) {
    const latitude = moonquakeData[key].latitude;
    const longitude = moonquakeData[key].longitude;

    const moonquakeModel = getMoonquakeModel(
      latitude,
      longitude,
      radius,
      scale,
      uniforms
    );
    moonquakeModels.push(moonquakeModel);
  }

  return moonquakeModels;
};
