import React, { ReactElement, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import '../pages/Home.scss';
import EmanImage from '../assets/eman.png';

interface Props {
    
}

const ThreeImage = React.memo(function ThreeImage({}: Props): ReactElement {
    const threeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let mount = threeRef.current;
        let camera: any, scene: any, renderer: any, cube: any;

        function init(): void {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, -.1, 1000 );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );

            if (mount) {
                mount.appendChild( renderer.domElement );
            }

            let geometry = new THREE.BoxGeometry();
            let texture = new TextureLoader().load( EmanImage )
            cube = new THREE.Mesh( geometry );
            scene.add( cube );

            camera.position.z = 5;
        }

        function animate(): void {
            requestAnimationFrame( animate );
            
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.1;

            renderer.render( scene, camera );

        }

        init();
        animate();

        return() => {

        }
    });

    return (
        <div className="three-image" ref={threeRef} />
    )
});

export default ThreeImage
