import React, { ReactElement, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import '../App.scss';


const ThreeGrainFilter = React.memo(function ThreeGrainFilter(): ReactElement {
    const threeGrainFilterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = threeGrainFilterRef.current;
        let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer; 
        // let material: MeshLambertMaterial, geometry: SphereBufferGeometry;
        // let cube: Mesh, cube1: Mesh, cube2: Mesh, cube3: Mesh;
        let directionalLight: DirectionalLight, ambientLight: AmbientLight;
        let composer: EffectComposer, renderPass: RenderPass, customPass: ShaderPass;
        let frameId: any;
        let counter: number;

        function init(): void {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);
            camera.position.y = 6;
            renderer = new THREE.WebGLRenderer({alpha: true});
            renderer.setClearColor(0x000000, 0.7);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.outputEncoding = THREE.sRGBEncoding;
            mount?.appendChild(renderer.domElement);

            // material = new THREE.MeshLambertMaterial({color: 0x00ff00});
            // geometry = new THREE.SphereBufferGeometry(0.6, 16, 16);
            // cube = new THREE.Mesh(geometry, material);
            // cube.position.set(1, 0.5, 1);
            // cube1 = new THREE.Mesh(geometry, material);
            // cube1.position.set(-1, 0.5, 1);
            // cube2 = new THREE.Mesh(geometry, material);
            // cube2.position.set(1, 0.5, -1);
            // cube3 = new THREE.Mesh(geometry, material);
            // cube3.position.set(-1, 0.5, -1);

            // scene.add(cube);
            // scene.add(cube1);
            // scene.add(cube2);
            // scene.add(cube3);

            ambientLight = new THREE.AmbientLight(0x666666);
            directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.castShadow = false;
            directionalLight.position.set(-2, 4, -2);
            // directionalLight.target = cube;

            scene.add(directionalLight);
            scene.add(ambientLight);

            // Post Processing
            composer = new EffectComposer(renderer);
            renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass);
            counter = 0.0;

            const grainEffect = {
                uniforms: {
                    "tDiffuse": {value: null},
                    "amount": {value: counter}
                },

                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix 
                        * modelViewMatrix 
                        * vec4( position, 1.0 );
                    }`,
                fragmentShader: `
                    uniform float amount;
                    uniform sampler2D tDiffuse;
                    varying vec2 vUv;
                    
                    float random( vec2 p )
                    {
                    vec2 K1 = vec2(
                        23.14069263277926, // e^pi (Gelfond's constant)
                        2.665144142690225 // 2^sqrt(2) (Gelfond–Schneider constant)
                    );
                    return fract( cos( dot(p,K1) ) * 12345.6789 );
                    }
                    
                    void main() {
                    vec4 color = texture2D( tDiffuse, vUv );
                    vec2 uvRandom = vUv;
                    uvRandom.y *= random(vec2(uvRandom.y,amount));
                    color.rgb += random(uvRandom)*0.15;
                    gl_FragColor = vec4( color );
                    }`
            }

            customPass = new ShaderPass(grainEffect);
            customPass.renderToScreen = true;
            composer.addPass(customPass);
        }

            // Animate Function
        function animate(): void {
            var timer = Date.now() * 0.0002;
            camera.position.x = Math.cos(timer) * 10;
            camera.position.z = Math.sin(timer) * 10;
            camera.lookAt(new THREE.Vector3(0,1,0));

            counter += 0.01
            customPass.uniforms["amount"].value = counter;

            frameId = window.requestAnimationFrame(animate);
            composer.render();
        }

        // Start Three.js Function
        function start(): void {
            if (!frameId) {
                frameId = requestAnimationFrame(animate)
            }
        }

        // Stop Function for Cleanup
        function stop(): void {
            cancelAnimationFrame(frameId);
            frameId = null;
        }

        start();
        init();
        animate();

        return() => {
            stop();
            mount?.removeChild( renderer.domElement );
            scene.remove(directionalLight);
            scene.remove(ambientLight);
            // scene.remove(cube);
            // scene.remove(cube1);
            // scene.remove(cube2);
            // scene.remove(cube3);
            // geometry.dispose();
            // material.dispose();
        }
    })

    return (
        <div ref={threeGrainFilterRef} className="three-grain-filter" />
    )
})

export default ThreeGrainFilter