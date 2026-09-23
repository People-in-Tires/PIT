'use client';

import styles from '@/css/Game.module.css';

import { CSSProperties, useEffect, useRef } from 'react';
import * as twgl from 'twgl.js';
import defaultVertSource from './defaultVert';
import usePlayerStore from '@/components/engine/playerStore';

export type Uniforms = Record<string, number | number[] | Float32Array>;

interface Props {
  fragSource: string;
  vertSource?: string;
  uniforms?: Uniforms;
  style?: CSSProperties;
}

export default function ShaderCanvas({
  fragSource,
  vertSource = defaultVertSource,
  uniforms = {},
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniformsRef = useRef<Uniforms>(uniforms);

  useEffect(() => {
    uniformsRef.current = { ...uniformsRef.current, ...uniforms };
  }, [uniforms]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) throw new Error('WebGL is not supported in this browser');

    const programInfo = twgl.createProgramInfo(gl, [vertSource, fragSource]);

    const arrays = {
      position: { numComponents: 2, data: [-1, -1, 3, -1, -1, 3] },
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    const start = performance.now();
    let raf = 0;

    uniformsRef.current.u_drunk = usePlayerStore.getState().player.drunk;

    const unsubscribe = usePlayerStore.subscribe(
      (state) => state.player.drunk,
      (drunk) => {
        uniformsRef.current.u_drunk = drunk;
      }
    );

    function render() {
      twgl.resizeCanvasToDisplaySize(gl!.canvas as HTMLCanvasElement);
      gl!.viewport(0, 0, gl!.canvas.width, gl!.canvas.height);

      const allUniforms: Uniforms = {
        u_time: (performance.now() - start) / 1000,
        u_resolution: [gl!.canvas.width, gl!.canvas.height],
        ...uniformsRef.current,
      };

      gl!.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl!, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, allUniforms);
      twgl.drawBufferInfo(gl!, bufferInfo);

      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
    };
  }, [fragSource, vertSource]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.shaderOverlay}
      style={style}
    />
  );
}
