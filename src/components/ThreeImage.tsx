import React, { ReactElement, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import '../pages/Home.scss';
import EmanImage from '../assets/eman.png';



const ThreeImage = React.memo(function ThreeImage(): ReactElement {
    const threeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let mount = threeRef.current;
        let camera: any, scene: any, renderer: any, mesh: any;
        let uMouse = new THREE.Vector2(0, 0);

        function init(): void {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor(0x00ff00);

            if (mount) {
                mount.appendChild( renderer.domElement );
            }

            let geometry = new THREE.PlaneBufferGeometry();
            let texture = new TextureLoader().load( EmanImage );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            mesh = new THREE.Mesh( geometry, material);
            scene.add( mesh );

            camera.position.z = 5;

            window.addEventListener('mousemove', (e) => {
                uMouse.x = ( e.clientX / window.innerWidth );
                uMouse.y = ( e.clientY / window.innerWidth );
            });
        }

        function animate(): void {
            requestAnimationFrame( animate );
            

            renderer.render( scene, camera );

        }

        init();
        animate();
    });

    return (
        <div className="three-image" ref={threeRef} />
    )
});

export default ThreeImage
