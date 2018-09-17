// add styles

// three.js
import * as THREE from 'three'

export class App{

    scene: THREE.Scene;
    box: THREE.Mesh;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    host:HTMLElement;

    static init(){
        new App();
    }

    constructor(){
        this.init();
    }
    init(){
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.host = document.createElement('div');
        this.host.id = 'three'
        this.host.appendChild(this.renderer.domElement);
        this.host.addEventListener("resize", this.resize);
    
        document.body.appendChild(this.host);

        // add axis to the scene
        let axis = new THREE.AxesHelper(10)

        this.scene.add(axis)

        // add lights
        let light = new THREE.DirectionalLight(0xffffff, 1.0)

        light.position.set(100, 100, 100)

        this.scene.add(light)

        let light2 = new THREE.DirectionalLight(0xffffff, 1.0)

        light2.position.set(-100, 100, -100)

        this.scene.add(light2)

        let material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            wireframe: true
        })

        // create a box and add it to the scene
        this.box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)

        this.scene.add(this.box)

        this.box.position.x = 0.5
        this.box.rotation.y = 0.5

        this.camera.position.x = 5
        this.camera.position.y = 5
        this.camera.position.z = 5

        this.camera.lookAt(this.scene.position)
    
        this.animate()
    }
    resize(){
        console.log('dd');
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    animate(): void {
        requestAnimationFrame(()=>{this.animate()});
        this.render();
    }
    render(): void {
        let timer = 0.002 * Date.now()
        this.box.position.y = 0.5 + 0.5 * Math.sin(timer)
        this.box.rotation.x += 0.1
        this.renderer.render(this.scene, this.camera)
    }
}