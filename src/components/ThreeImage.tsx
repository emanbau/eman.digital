import React, { ReactElement, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GeometryUtils, TextureLoader } from 'three';
import '../pages/Home.scss';
import EmanImage from '../assets/eman.png';



const ThreeImage = React.memo(function ThreeImage(): ReactElement {
    const threeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let mount = threeRef.current;
        let camera: any, scene: any, renderer: any, geometry: any, texture: any, material: any, mesh: any, frameId: any;
        let uMouse = new THREE.Vector2(0, 0);

        function init(): void {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

            renderer = new THREE.WebGL1Renderer({alpha: true, antialias: true});
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor(0x282828);

            if (mount) {
                mount.appendChild( renderer.domElement );
            }

            geometry = new THREE.PlaneBufferGeometry(3, 5);
            texture = new TextureLoader().load( EmanImage );
            material = new THREE.MeshBasicMaterial( { map: texture } );
            mesh = new THREE.Mesh( geometry, material);
            scene.add( mesh );

            camera.position.z = 5;

            window.addEventListener('mousemove', onMouseMove );
        }

        function onMouseMove(e: MouseEvent): void {
            uMouse.x = ( e.clientX / window.innerWidth );
                uMouse.y = ( e.clientY / window.innerWidth );
        }

        function animate(): void {
            frameId = window.requestAnimationFrame(animate);
            renderer.render( scene, camera );
        }

        function start(): void {
            if (!frameId) {
                frameId = requestAnimationFrame(animate)
            }
        }

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
        <div className="three-image" ref={threeRef} />
    )
});

export default ThreeImage

