import {
    AmbientLight,
    BoxGeometry,
    Camera, DoubleSide,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    PerspectiveCamera, Plane, PlaneGeometry,
    PointLight,
    Scene, SphereGeometry,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const options = {
    width : 500,
    height : 500
}

const scene = new Scene()

const camera = new PerspectiveCamera(1000, options.width / options.height)
camera.position.z = -4
camera.position.y = -6
camera.rotation.x = Math.PI / 2
scene.add(camera)

const canvas = document.querySelector('#renderer')
const renderer = new WebGLRenderer({canvas: canvas})

const ambientLight = new AmbientLight(0xffffff, 1)
scene.add(ambientLight)


const plane = new Mesh(
    new PlaneGeometry(4, 4, 4),
    new MeshStandardMaterial({color: 0x00ff00})
)
scene.add(plane)
plane.position.set(0, 2, 0)
plane.rotation.x = Math.PI / 2


const sphere1 = getSphere(0xff0000)
sphere1.position.set(-1, -1, 1)
scene.add(sphere1)

const sphere2 = getSphere(0x0000ff)
sphere2.position.set(1, 0, 0)
scene.add(sphere2)

const sphere3 = getSphere(0x00ffff)
sphere3.position.set(0, 1, -1)
scene.add(sphere3)


renderer.setSize(options.width, options.height)

const controls = new OrbitControls(camera, renderer.domElement)
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()


function getSphere(color) {
    return new Mesh(
        new SphereGeometry(0.5, 10, 10),
        new MeshStandardMaterial({color: color})
    )
}