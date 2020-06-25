'use strict';

const Three = require('three');
const { FBXLoader } = require('three/examples/jsm/loaders/FBXLoader.js');
const { LineMaterial } = require('three/examples/jsm/lines/LineMaterial.js');
const { Wireframe }  = require('three/examples/jsm/lines/Wireframe.js');
const { WireframeGeometry2 } = require('three/examples/jsm/lines/WireframeGeometry2.js');
const { VertexNormalsHelper } = require('three/examples/jsm/helpers/VertexNormalsHelper.js');
const fovMax = 60;
const fovMin = 1;

let camera, scene, renderer, brainModel, controls, brainHighPoly;

let fatLineMaterial, wireframe;

let vertexShader, fragmentShader;

let mouseX = 0, mouseY = 0;

let particles;

let count = 0;

let particleCount = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let vnh;

/**
 * Designed to load all resources before initializing
 * Loads:
 * 	fbx files
 * 	vertex and fragment shaders
 */
const loadResources = async () => {

	Promise.all( [ loadBrainModel(), loadShaders(), loadBrainModelHighPoly() ] ).then( ( res ) => {

		console.log("all promises finished");
		init();

	});
}

// TODO Move Resource Loading To External File

const loadShaders = async () => {

	return new Promise((resolve, reject) => {

		var fileLoader = new Three.FileLoader();
	
		fileLoader.load('../src/shaders/standard.vert', 
		function ( shader ) 
		{
			vertexShader = shader;
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});

		fileLoader.load('../src/shaders/standard.frag', 
		function ( shader ) 
		{
			fragmentShader = shader;
			console.log("Loaded Shaders Properly");
			resolve();
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});		
	});
}

const loadBrainModel = async () => {

	return new Promise((resolve, reject) => {

		var modelLoader = new FBXLoader();

		modelLoader.load( '../src/models/brain-uv.fbx',

		function ( object ) {

			object.traverse( function ( child ) {

				if ( child.isMesh && child.geometry.isBufferGeometry ) {

					child.castShadow = true;
					child.receiveShadow = true;
					child.geometry.center();
					brainModel = child;
				}

			} );

			
			console.log("Loaded Brain Model");
			resolve();
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});

	});
}

const loadBrainModelHighPoly = async () => {

	return new Promise((resolve, reject) => {

		var modelLoader = new FBXLoader();

		modelLoader.load( '../src/models/brain-hp.fbx',

		function ( object ) {

			object.traverse( function ( child ) {

				if ( child.isMesh && child.geometry.isBufferGeometry ) {

					child.castShadow = true;
					child.receiveShadow = true;
					child.geometry.center();
					brainHighPoly = child;
				}

			} );

			
			console.log("Loaded Highpoly Brain Geometry");
			resolve();
		},
		undefined,
		function ( err ) {

			console.log( err );
			reject();

		});

	});
}

const buildBrainWireFrame = () => {

	

}

const init = () => {

	camera = new Three.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( -100, 50, -300 );

	scene = new Three.Scene();
	scene.background = new Three.Color( 0x050505 );

	// Disabled for some reason ???
	//buildBrainWireFrame(); 

	// TODO: Add Resolution / particle count limiters
	particleCount = 122112;

	var particleCloudScales = new Float32Array( particleCount );

	for ( let i = 0; i < particleCount; i++ ) {

		particleCloudScales[i] = 3;

	}

	var particleGeometry = new Three.BufferGeometry();

	particleGeometry.setAttribute( 'position', brainHighPoly.geometry.attributes.position );
	//particleGeometry.setAttribute( 'normal', brainHighPoly.geometry.attributes.normal );
	particleGeometry.setAttribute( 'scale', new Three.BufferAttribute( particleCloudScales, 1 ) );

	var material = new Three.ShaderMaterial( {

		uniforms: {
			color: { value: new Three.Color( 0xffffff ) },
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader

	} );

	particles = new Three.Points( particleGeometry, material );

	particles.geometry.center();

	particles.scale.set( 50,50,50 );
	particles.position.set( 0,0,0 );
	particles.rotateX( - Math.PI / 2 );

	scene.add( particles );

	// Uncomment for Vertex normal display
	// vnh = new VertexNormalsHelper( particles, 5 );
	// scene.add( vnh );

	renderer = new Three.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );

	// TODO: Unify into generic events (might only work on Firefox??)
	document.addEventListener( 'wheel', onDocumentMouseWheel, false);

	animate();

}

const onDocumentMouseDown = () => {

	document.addEventListener('mousemove', onDocumentMouseMove, false);

}

const onDocumentMouseUp = () => {

	document.removeEventListener('mousemove', onDocumentMouseMove, false);
}

const onDocumentMouseMove = ( event ) => {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

}

const onDocumentMouseWheel = ( event ) => {

	// Update the camera fov to zoom in / zoom out
	camera.fov -= event.deltaY * 0.2;
	camera.fov = Math.max( Math.min( camera.fov, fovMax ), fovMin );

	// Update camera proj matrix
	camera.updateProjectionMatrix();

}

const onWindowResize = () => {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	// TODO Add update to window size variables

	renderer.setSize( window.innerWidth, window.innerHeight );

}

const animate = () => {

	requestAnimationFrame( animate );

	render();

}

const render = () => {
	
	camera.position.x += ( mouseX - camera.position.x ) * .01;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	var time = Date.now() * 0.005;

	var positions = particles.geometry.attributes.position.array;

	for ( let i = 0; i < particleCount * 3; i+=3 ) {

		// positions[ i ] += ( Math.sin( ( i + count ) * 0.3 ) * 50 );
		positions[ i + 2 ] += ( Math.sin( ( 0.1 * (i / 3) + time ) * 0.6 ) * 0.005 );
		// positions[ i + 2 ] += ( Math.sin( ( i + count ) * 0.3 ) * 50 );

	}

	particles.geometry.attributes.position.needsUpdate = true;

	renderer.render( scene, camera );

	count += 0.1;

}

const print = () => {

	alert("fuck me");

}

module.exports.init = init;
module.exports.print = print;
module.exports.loadResources = loadResources;
