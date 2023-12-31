import {
    Color,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    PerspectiveCamera, PlaneGeometry,
    Scene, SphereGeometry, SpotLight, TextureLoader,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const options = {
    width: 500,
    height: 500
}

const scene = new Scene()
scene.background = new Color(0x7057ff)

const camera = new PerspectiveCamera(45, options.width / options.height)
camera.position.set(3, 7, -7)
scene.add(camera)

const canvas = document.querySelector('#renderer')
const renderer = new WebGLRenderer({canvas: canvas})

const spotLight = new SpotLight(0xffffff, 2)
scene.add(spotLight)
spotLight.position.set(0, 4, -6)


const plane = new Mesh(
    new PlaneGeometry(10, 10),
    new MeshStandardMaterial({color: 0x005f00})
)
scene.add(plane)
plane.position.set(-2, -2, 2)
plane.rotation.x = -Math.PI / 2


const sphereGroup = new Group()
scene.add(sphereGroup)
sphereGroup.position.set(-2, 0, 2)

const woodTexture = await loadTexture('/textures/raw_plank_wall_diff_1k.jpg')
const woodSphere = getSphere({texture: woodTexture})
sphereGroup.add(woodSphere)

const redSphere = getSphere({color: 0x680000})
redSphere.position.set(2, 0, 0)
sphereGroup.add(redSphere)

const metalTexture = await loadTexture('/textures/metal.jpg')
const sphere3 = getSphere({texture: metalTexture})
sphere3.position.set(0, 0, -1)
scene.add(sphere3)


renderer.setSize(options.width, options.height)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame(animate)
    sphereGroup.rotation.y += 0.01
    controls.update()
    renderer.render(scene, camera)
}

animate()


function getSphere({color, texture}) {
    return new Mesh(
        new SphereGeometry(0.5, 10, 10),
        new MeshStandardMaterial({color: color, map: texture})
    )
}

function loadTexture(url) {
    return new Promise((resolve, reject) => {
        new TextureLoader().load(url, resolve, null, reject)
    })
}