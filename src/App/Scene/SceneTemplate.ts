import { SceneBase } from './Base/SceneBase';
import { App } from '..';
import * as THREE from 'three';

export class SceneTemplate extends SceneBase {

    constructor(app: App) {
        super(app.threeCore)
    }
    public start(scene: THREE.Scene){
        // TODO:
    }
    public update(scene: THREE.Scene) {
        // TODO:
    }

}