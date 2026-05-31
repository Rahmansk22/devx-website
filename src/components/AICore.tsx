'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AICoreProps {
  className?: string;
  intensity?: number;
  scale?: number;
}

export default function AICore({ className = '', intensity = 1, scale = 1 }: AICoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Inner Core (Glowing Solid Sphere)
    const coreGeo = new THREE.IcosahedronGeometry(1.2 * scale, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7c5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.4 * intensity,
      blending: THREE.AdditiveBlending,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.visible = true; // Restore gorgeous glowing purple core
    mainGroup.add(coreMesh);

    // 2. Outer Wireframe Shell (Intelligent Mesh Artifact)
    const shellGeo = new THREE.IcosahedronGeometry(2.0 * scale, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2 * intensity,
      blending: THREE.AdditiveBlending,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    shellMesh.visible = true; // Restore outer structure
    mainGroup.add(shellMesh);

    // 3. Dynamic Outer Particle Cloud (Neural Web)
    const particleCount = 2800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialRadius = 2.4 * scale;

    const color1 = new THREE.Color(0x7c5cff); // Accent purple
    const color2 = new THREE.Color(0x00d4ff); // Accent cyan
    const color3 = new THREE.Color(0xffffff); // Highlight white

    for (let i = 0; i < particleCount; i++) {
      // Distribute points spherically
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = initialRadius * (0.8 + Math.random() * 0.4); // slightly randomized band

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradients
      const mixRatio = Math.random();
      let pColor;
      if (mixRatio < 0.4) {
        pColor = color1.clone().lerp(color2, Math.random());
      } else if (mixRatio < 0.8) {
        pColor = color2.clone().lerp(color3, Math.random());
      } else {
        pColor = color3.clone().lerp(color1, Math.random());
      }

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture (programmatic round point)
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8 * intensity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // Mouse interactive tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Map to normalized coordinates -1 to 1
      targetX = (x / rect.width) * 2 - 1;
      targetY = -(y / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking interpolation (Damping)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Subtle orbital rotation combined with mouse tilt
      mainGroup.rotation.y = elapsedTime * 0.15 + mouseX * 0.4;
      mainGroup.rotation.x = elapsedTime * 0.08 + mouseY * 0.4;

      // 4. Procedural Morphing of Outer Particles (Pulse & Wave)
      const posAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const xIndex = i * 3;
        const yIndex = i * 3 + 1;
        const zIndex = i * 3 + 2;

        const px = posArray[xIndex];
        const py = posArray[yIndex];
        const pz = posArray[zIndex];

        // Spherical coordinate math to apply noise waves
        const dist = Math.sqrt(px * px + py * py + pz * pz);
        
        // Calculate dynamic wave displacement based on time and spherical position
        const wave = Math.sin(dist * 2.0 - elapsedTime * 2.5) * 0.08 * intensity;
        const speed = 0.002 * (1 + Math.sin(elapsedTime + i) * 0.5);

        // Displace position slightly along normal vector (outwards/inwards)
        const nx = px / dist;
        const ny = py / dist;
        const nz = pz / dist;

        // Apply a gentle rotation and breath pulsation
        const breath = Math.sin(elapsedTime * 1.5 + dist) * 0.003 * intensity;
        
        posArray[xIndex] += nx * wave * speed + breath * nx;
        posArray[yIndex] += ny * wave * speed + breath * ny;
        posArray[zIndex] += nz * wave * speed + breath * nz;
      }
      posAttr.needsUpdate = true;

      // Morph inner core slightly
      const coreScale = 1.0 + Math.sin(elapsedTime * 2.0) * 0.05 * intensity;
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [intensity, scale]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
