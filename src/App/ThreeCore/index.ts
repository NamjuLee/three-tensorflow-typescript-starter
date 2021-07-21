import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts'
import { SceneBase } from '../Scene/Base/SceneBase';
export class ThreeCore {
    public canvas: HTMLCanvasElement;
    public host: HTMLElement;
    public ctx: CanvasRenderingContext2D;
    public t: number = 0.0;

    public camera: THREE.PerspectiveCamera;
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;

    public distanceCamera: number = 15;
    public controls: OrbitControls;
    public scenes: SceneBase[] =[];
    constructor(id: string) {
        this.InitCanvas(id);
    }
    public InitCanvas(id: string) {
        const host = document.getElementById(id);
        if (host) { this.host = host; }

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0, 0, 0);
        this.scene.castShadow = true;

        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
        this.camera.position.set(0, 0, this.distanceCamera);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(this.host.clientWidth / this.host.clientHeight);
        this.renderer.domElement.id = 'Three';
        this.renderer.setSize(this.host.clientWidth, this.host.clientHeight);
        this.host.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update();

        this.Init();
        this.eventBind();
        this.loop();
    }
    public Init() {
        const grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x555555 );
        this.scene.add( grid );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 50, 0 );
        this.scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( - 1, 1.75, 1 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        const d = 50;
        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.0001;
    }
    public eventBind() {
        this.renderer.domElement.onmousedown = (e: MouseEvent) => this.mouseDown(e);
        this.renderer.domElement.onmouseup = (e: MouseEvent) => this.mouseUp(e);
        this.renderer.domElement.onmousemove = (e: MouseEvent) => this.mouseMove(e);
        this.renderer.domElement.addEventListener( 'wheel', (e: WheelEvent) => { console.log(e.deltaY); });
    }
    public mouseDown(e: MouseEvent) {
        for (let i = 0 ; i < this.scenes.length; ++i) {
            this.scenes[i].MouseDown(e);
        }
    }
    public mouseUp(e: MouseEvent) {
        for (let i = 0 ; i < this.scenes.length; ++i) {
            this.scenes[i].mouseUp(e);
        }
    }
    public mouseMove(e: MouseEvent) {
        for (let i = 0 ; i < this.scenes.length; ++i) {
            this.scenes[i].mouseMove(e);
        }
    }
    public loop() {
        requestAnimationFrame(() => { this.loop(); });
        this.controls.update();
        this.render();
        this.renderer.render(this.scene, this.camera);
        this.t += 0.01;
    }
    public render() {
        for (let i = 0 ; i < this.scenes.length; ++i) {
            this.scenes[i].update(this.scene);
        }
    }
}