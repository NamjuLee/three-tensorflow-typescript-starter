import { ThreeCore } from '../../ThreeCore';
import * as THREE from 'three';

export class SceneBase {
    public threeCore: ThreeCore;
    public scene: THREE.Scene;

    public isPressed = false;
    constructor(threeCore: ThreeCore) {
        this.threeCore = threeCore;
        this.scene = threeCore.scene;
        this.threeCore.scenes.push(this);
        this.start(this.scene);
    }
    public start(scene: THREE.Scene){
        // TODO:
    }
    public update(scene: THREE.Scene) {
        // TODO:
    }
    public MouseDown(e: MouseEvent) {
        this.isPressed = true;
        // TODO:
    }
    public mouseUp(e: MouseEvent) {
        this.isPressed = false;
        // TODO:
    }
    public mouseMove(e: MouseEvent) {
        if(this.isPressed) { 
            this.mouseDrag(e);
            return;
        }
        // TODO:
    }
    public mouseDrag(e: MouseEvent) {
        // TODO:
    }
}