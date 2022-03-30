import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Mesh } from 'three';

const GOLDEN_RATIO = (Math.sqrt(5) + 1) / 2;

@Component({
  selector: 'app-penrose',
  templateUrl: './penrose.component.html',
  styleUrls: ['./penrose.component.scss'],
})
export class PenroseComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  private material = new THREE.LineBasicMaterial({ color: 0xffcc00, linewidth: 10 });

  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;

  ngAfterViewInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-400, 400, 400, -400, 1, 1000);
    this.camera.position.z = 2;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false });
    this.renderer.setSize(800, 800);
    const A = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(GOLDEN_RATIO, 0, 0),
      new THREE.Vector3(GOLDEN_RATIO / 2, Math.sqrt(1 - (GOLDEN_RATIO / 2) ** 2), 0),
    ]);

    const B = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0.5, Math.sqrt(GOLDEN_RATIO ** 2 - 0.25), 0),
    ]);

    const meshMatA = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    const meshMatB = new THREE.MeshBasicMaterial({ color: 0xff3300 });

    const drawTriangle = (
      baseTriangle: THREE.BufferGeometry,
      offset: { x: number; y: number; r: number },
      mat: THREE.MeshBasicMaterial,
    ): THREE.Mesh => {
      const mesh = new Mesh(baseTriangle, mat);
      mesh.translateX(offset.x);
      mesh.translateY(offset.y);
      mesh.rotateZ(offset.r);
      mesh.scale.set(100, 100, 1);
      return mesh;
    };

    const drawA = (x = 0, y = 0, r = 0): THREE.Mesh => drawTriangle(A, { x, y, r }, meshMatA);
    const drawB = (x = 0, y = 0, r = 0): THREE.Mesh => drawTriangle(B, { x, y, r }, meshMatB);

    const triangles: [type: 'a' | 'b', params: [x: number, y: number, rotation: number]][] = [
      ['a', [-150, 0, 0.1]],
      ['b', [50, 0, 0]],
    ];

    this.scene.add(
      ...triangles.map((params) => {
        switch (params[0]) {
          case 'a':
            return drawA(...params[1]);
          default:
            return drawB(...params[1]);
        }
      }),
    );
    this.scene.background = new THREE.Color(0x449944);
    this.renderer.render(this.scene, this.camera);
    console.log('all done');
  }
}
