import React, { ReactElement, useRef, useEffect } from 'react'
import * as THREE from 'THREE';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import '../pages/Home.scss';


function ThreeGrain(): ReactElement {
    const grainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        let mount = grainRef.current;
        let scene: any, camera: any, renderer: any, directionalLight: any, composer: EffectComposer, renderPass: RenderPass;
        let framId: any;

        function init(): void {
            // Basic Scene
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );
            
            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            mount?.appendChild( renderer.domElement );

            // Post Processing
            composer = new EffectComposer( renderer );
            renderPass = new RenderPass( scene, camera );
            composer.addPass( renderPass );

            
        }
    });

    return (
        <div ref={grainRef} />
    )
}

export default ThreeGrain