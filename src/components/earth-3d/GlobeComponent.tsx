"use client";

import { useEffect, useRef, useState } from "react";
import { TextureLoader, ShaderMaterial, Vector2, Material } from "three";
import GlobeTmpl from "react-globe.gl";
import { Skeleton } from "../ui/skeleton";

const dayNightShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    #define PI 3.141592653589793
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform vec2 sunPosition;
    varying vec3 vNormal;
    varying vec2 vUv;

    float toRad(float a) {
      return a * PI / 180.0;
    }

    vec3 Polar2Cartesian(vec2 c) {
      float theta = toRad(90.0 - c.x);
      float phi = toRad(90.0 - c.y);
      return vec3(
        sin(phi) * cos(theta),
        cos(phi),
        sin(phi) * sin(theta)
      );
    }

    void main() {
      vec3 sunDir = Polar2Cartesian(sunPosition);
      float intensity = dot(normalize(vNormal), normalize(sunDir));
      vec4 dayColor = texture2D(dayTexture, vUv);
      vec4 nightColor = texture2D(nightTexture, vUv);
      float blendFactor = smoothstep(-0.1, 0.1, intensity);
      gl_FragColor = mix(nightColor, dayColor, blendFactor);
    }
  `,
};

const getSunPosition = (): [number, number] => {
  const now = new Date();
  const hoursUTC = now.getUTCHours() + now.getUTCMinutes() / 60;
  const longitude = (hoursUTC / 24) * 360 - 180;
  return [longitude, 0];
};

const GlobeComponent = () => {
  const globeRef = useRef<any>(null);
  const globeMaterialRef = useRef<Material | undefined>(undefined);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [globeMaterial, setGlobeMaterial] = useState<Material | undefined>(
    undefined
  );
  const [sunPosition, setSunPosition] = useState<Vector2>(
    new Vector2(...getSunPosition())
  );
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const interval = setInterval(
      () => setSunPosition(new Vector2(...getSunPosition())),
      60000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    globeMaterialRef.current = globeMaterial;
  }, [globeMaterial]);

  useEffect(() => {
    Promise.all([
      new TextureLoader().loadAsync("/earth-texture-day.jpg"),
      new TextureLoader().loadAsync("/earth-texture-night.jpg"),
    ])
      .then(([dayTexture, nightTexture]) => {
        setGlobeMaterial(
          new ShaderMaterial({
            uniforms: {
              dayTexture: { value: dayTexture },
              nightTexture: { value: nightTexture },
              sunPosition: { value: sunPosition },
            },
            vertexShader: dayNightShader.vertexShader,
            fragmentShader: dayNightShader.fragmentShader,
          })
        );
      })
      .catch((error) => {
        console.error("Error loading textures:", error);
      });
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(
        Math.max(
          window.innerWidth < 450 ? window.innerWidth * 0.9 : window.innerWidth,
          200
        ),
        800
      );
      const height = Math.min(
        Math.max(
          window.innerWidth < 450
            ? window.innerHeight * 0.65
            : window.innerHeight,
          200
        ),
        600
      );
      setDimensions({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (globeRef.current && isGlobeReady) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enablePan = true;
    }
  }, [isGlobeReady]);

  useEffect(() => {
    let animationFrameId: number;
    if (globeRef.current && isGlobeReady) {
      const animate = () => {
        const [realSunLng] = getSunPosition();
        const { lng: globeLng } = globeRef.current.pointOfView();
        if (globeMaterialRef.current instanceof ShaderMaterial) {
          globeMaterialRef.current.uniforms.sunPosition.value.set(
            realSunLng - globeLng,
            0
          );
        }
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isGlobeReady]);

  return (
    <div className="relative flex justify-center items-center max-w-[400px] max-h-[400px]">
      {!isGlobeReady && (
        <Skeleton className={`w-[400px] h-[400px] rounded-full absolute`} />
      )}
      <GlobeTmpl
        ref={globeRef}
        onGlobeReady={() => setIsGlobeReady(true)}
        globeMaterial={globeMaterial}
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        width={dimensions.width}
        height={dimensions.height}
        animateIn
      />
    </div>
  );
};

export default GlobeComponent;
