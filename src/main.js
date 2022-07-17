import * as THREE from "../libs/three.js";
window.THREE = THREE;

class Main {
  constructor() {}

  init() {
    var width = 375;
    var height = 667;

    // var canvas = document.getElementById("demo-canvas");
    // 定义渲染器renderer
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    // 定义场景  作用：维护需要渲染的物体
    var scene = new THREE.Scene();
    // 定义相机
    var camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -1000,
      1000
    );

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(375, 667);

    var triangleShape = new THREE.Shape(); //返回一个shape对象
    // three.js封装好的api 很像canvas的api
    triangleShape.moveTo(0, 100);
    triangleShape.lineTo(-100, -100);
    triangleShape.lineTo(100, -100);
    triangleShape.lineTo(0, 100);

    var geometry = new THREE.ShapeGeometry(triangleShape);
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });
    // geometry相当于形状、位置，类似顶点着色器
    // material类似于片元(片段)着色器
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 1;
    scene.add(mesh); //  mesh放在原点往上一点

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0; //相机放在原点
    camera.lookAt(new THREE.Vector3(0, 0, 1)); //意思是相机在0,0,0的位置，望向0,0,1的位置,即放三角形的位置

    var currentAngle = 0;
    var lastTimestamp = Date.now();

    var animate = function () {
      var now = Date.now();
      var duration = now - lastTimestamp;
      lastTimestamp = now;
      currentAngle = currentAngle + (duration / 1000) * Math.PI;
      // console.log(currentAngle);
    };

    var render = function () {
      animate();
      mesh.rotation.set(0, currentAngle, 0); //三个参数代表绕x、y、z轴转
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();
  }
}

export default new Main();
