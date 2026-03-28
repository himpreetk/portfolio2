/* ============================================================
   three-bg.js  — 3D Particle Field + Floating Wireframe Objects
   Requires Three.js r128 (loaded before this script)
   ============================================================ */

(function () {
  const canvas   = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  /* ---- PARTICLE FIELD ---- */
  const PARTICLE_COUNT = 2000;
  const pGeo       = new THREE.BufferGeometry();
  const positions  = new Float32Array(PARTICLE_COUNT * 3);
  const colors     = new Float32Array(PARTICLE_COUNT * 3);

  const palette = [
    new THREE.Color(0x00ffe7),  // neon cyan
    new THREE.Color(0xff2d78),  // neon pink
    new THREE.Color(0x7b2fff),  // neon purple
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;

    const col = palette[Math.floor(Math.random() * 3)];
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

  const pMat = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });

  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ---- FLOATING WIREFRAME OBJECTS ---- */
  function wireMat(hex, opacity) {
    return new THREE.MeshBasicMaterial({
      color: hex,
      wireframe: true,
      transparent: true,
      opacity: opacity,
    });
  }

  const geometries = [
    new THREE.OctahedronGeometry(0.5),
    new THREE.IcosahedronGeometry(0.38),
    new THREE.TorusGeometry(0.38, 0.1, 8, 18),
    new THREE.BoxGeometry(0.55, 0.55, 0.55),
    new THREE.OctahedronGeometry(0.30),
    new THREE.TorusGeometry(0.50, 0.08, 6, 16),
  ];

  const materials = [
    wireMat(0x00ffe7, 0.22),
    wireMat(0xff2d78, 0.18),
    wireMat(0x7b2fff, 0.20),
    wireMat(0x00ffe7, 0.15),
  ];

  const objects3d = [];

  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(
      geometries[i % geometries.length],
      materials[i % materials.length]
    );
    mesh.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 6 - 2
    );
    mesh.userData = {
      rx:  (Math.random() - 0.5) * 0.01,
      ry:  (Math.random() - 0.5) * 0.01,
      rz:  (Math.random() - 0.5) * 0.006,
      floatSpeed:  0.3 + Math.random() * 0.5,
      floatOffset: Math.random() * Math.PI * 2,
      baseY: mesh.position.y,
    };
    scene.add(mesh);
    objects3d.push(mesh);
  }

  /* ---- MOUSE PARALLAX ---- */
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ---- ANIMATION LOOP ---- */
  let t = 0;

  function animate() {
    requestAnimationFrame(animate);
    t += 0.007;

    // Slowly rotate particle cloud
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.00015;

    // Camera follows mouse (parallax)
    camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 0.45 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    // Animate floating 3D objects
    objects3d.forEach(function (obj) {
      obj.rotation.x += obj.userData.rx;
      obj.rotation.y += obj.userData.ry;
      obj.rotation.z += obj.userData.rz;
      obj.position.y  = obj.userData.baseY +
        Math.sin(t * obj.userData.floatSpeed + obj.userData.floatOffset) * 0.28;
    });

    renderer.render(scene, camera);
  }

  animate();

  /* ---- RESIZE HANDLER ---- */
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();
