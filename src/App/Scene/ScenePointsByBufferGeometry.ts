import { SceneBase } from './Base/SceneBase';
import { App } from '..';
import * as THREE from 'three';

export class ScenePointsByBufferGeometry extends SceneBase {
    constructor(app: App) {
        super(app.threeCore)
    }
    public start(scene: THREE.Scene){

        const vertices = [];
        for( let i = 0; i < 100; i ++ ) {
            const x = (Math.random() - 0.5) * 9;
            const y = (Math.random() - 0.5) * 9;
            const z = (Math.random() - 0.5) * 9;
            vertices.push( x, y, z );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        const material = new THREE.PointsMaterial( { color: 0x00fff0 } );
        const points = new THREE.Points( geometry, material );
        scene.add( points );

    }
}