import { ThreeCore } from './ThreeCore';
import { SceneBoxRotation } from './Scene/SceneBoxRotation'
import { ScenePointsByBufferGeometry } from './Scene/ScenePointsByBufferGeometry'
import { SceneTemplate } from './Scene/SceneTemplate'

import { REVISION } from 'three';
import { version } from '@tensorflow/tfjs';  

export class App {
  public threeCore: ThreeCore;
  constructor(id: string = 'main', sceneNum = 1) {
    this.threeCore = new ThreeCore(id);

    switch (sceneNum) {
      case 0:
        new SceneBoxRotation(this);
        break;
      case 1:
        new ScenePointsByBufferGeometry(this);
        break;

      default:
        new SceneTemplate(this);
        break;
    }

    console.log("THREE REVISION: ", REVISION);
    console.log("TensorfowJS Version : ", version);

  }
}