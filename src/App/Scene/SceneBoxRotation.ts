import { SceneBase } from './Base/SceneBase';
import { App } from '..';
import * as THREE from 'three';

export class SceneBoxRotation extends SceneBase {

    private meshCube: THREE.Mesh;

    constructor(app: App) {
        super(app.threeCore)
    }
    public start(scene: THREE.Scene){

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.meshCube = new THREE.Mesh( geometry, material );
        scene.add(this.meshCube);
    }
    public update(scene: THREE.Scene) {
        this.meshCube.rotation.x += 0.1;
    }

}