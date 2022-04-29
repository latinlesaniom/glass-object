import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import vertexSha from './shaders/Plane/vertex.glsl'
import fragmentSha from './shaders/Plane/fragment.glsl'


/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * base
 */
//canvas
const canvas = document.querySelector('canvas.webgl')


/**
 * Scene
 */
const scene = new THREE.Scene()


/**
 * Geometries
 */
//icosahedronGeometry
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
const material = new THREE.MeshPhysicalMaterial({
    metalness: 0,
    roughness: 0,
    transmission: 1
})
const mesh = new THREE.Mesh(icosahedronGeometry, material)
scene.add(mesh)

//plane
const planeGeometry = new THREE.PlaneGeometry(5, 5)
const planeMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexSha,
    fragmentShader: fragmentSha,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: {value: 0}
    }
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.position.z = -1
scene.add(planeMesh)


//ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)



/**
 * sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



window.addEventListener('resize', () => {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, -0.25, 4)
scene.add(camera)


//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const clock = new THREE.Clock()

const tick = () => {

const elapsedTime = clock.getElapsedTime()


planeMaterial.uniforms.uTime.value = elapsedTime

planeMesh.rotation.y = Math.sin(elapsedTime) * 0.1


//update controls
controls.update()

//renderer
renderer.render(scene, camera)

//tick
window.requestAnimationFrame(tick)

}
tick()



