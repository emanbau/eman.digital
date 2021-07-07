import React, { ReactElement, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { TextureLoader, Vector2 } from 'three';
import '../pages/Home.scss';
import EmanImage from '../assets/eman.png';
import ThreeGrainFilter from '../components/ThreeGrainFilter';

const ThreeImage = React.memo(function ThreeImage(): ReactElement {
    const threeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        // Initializations
        let mount = threeRef.current;
        let camera: any, scene: any, renderer: any, geometry: any, texture: any, material: any, mesh: any, frameId: any;
        let composer: EffectComposer, renderPass: RenderPass, customPass: ShaderPass;
        let uMouse: Vector2 = new THREE.Vector2(0, 0);

        // Three.js Initial Function
        function init(): void {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 2 * (180/Math.PI) * Math.atan(6 / (2 * 0.5)), 3/5 , 0.01, 10 );
            camera.position.z = 0.5;

            renderer = new THREE.WebGL1Renderer({alpha: true, antialias: true});
            renderer.setSize( 420, 700 );
            renderer.setClearColor(0x1d1d1d, 1);
            renderer.outputEncoding = THREE.sRGBEncoding;

            mount?.appendChild( renderer.domElement );
        
            geometry = new THREE.PlaneBufferGeometry(3, 5);
            texture = new TextureLoader().load( EmanImage );
            material = new THREE.MeshBasicMaterial( { map: texture } );
            mesh = new THREE.Mesh( geometry, material);
            scene.add( mesh );

            // Post Processing for Effect
            composer = new EffectComposer(renderer);
            renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass);

            const myEffect = {
                uniforms: {
                    "tDiffuse": { value: null },
                    "resolution": { value: new THREE.Vector2(1.,window.innerHeight/window.innerWidth) },
                    "uMouse": { value: new THREE.Vector2(-10,-10) },
                    "uVelo": { value: 0 },
                },
                vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
                fragmentShader: `uniform float time;
                uniform sampler2D tDiffuse;
                uniform vec2 resolution;
                varying vec2 vUv;
                uniform vec2 uMouse;
                float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
                    uv -= disc_center;
                    uv*=resolution;
                    float dist = sqrt(dot(uv, uv));
                    return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
                }
                void main()  {
                    vec2 newUV = vUv;
                    float c = circle(vUv, uMouse, 0.0, 0.2);
                    float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;
                    float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;
                    float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;
                    vec4 color = vec4(r, g, b, 1.);
                    gl_FragColor = color;
                }`
            }

            customPass = new ShaderPass(myEffect);
            customPass.renderToScreen = true;
            composer.addPass(customPass);

            mount?.addEventListener('mousemove', onMouseMove );
        }

        // Mouse Move Function
        function onMouseMove(e: MouseEvent): void {
            uMouse.x = ( e.clientX / (window.innerWidth));
            uMouse.y = 1 - ( e.clientY / (window.innerHeight) );
        }

        // Animate Function
        function animate(): void {
            customPass.uniforms.uMouse.value = uMouse;
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
            window.removeEventListener( 'mousemove', onMouseMove );
            scene.remove(mesh);
            geometry.dispose();
            material.dispose();
            texture.dispose();
        }
    });

    return (
        <React.Fragment>
            <div className="three-image" ref={threeRef} />
            <ThreeGrainFilter zIndex='z-index-3'/>
        </React.Fragment>
    )
});

export default ThreeImage

