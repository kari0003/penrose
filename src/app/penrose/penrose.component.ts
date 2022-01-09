import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

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

    const meshA = new THREE.Mesh(A, meshMatA);
    const meshB = new THREE.Mesh(B, meshMatB);
    meshA.translateX(-150);
    meshA.scale.set(100, 100, 1);
    meshB.translateX(50);
    meshB.scale.set(100, 100, 1);

    this.scene.add(meshA, meshB);
    this.scene.background = new THREE.Color(0x449944);
    this.renderer.render(this.scene, this.camera);
    console.log('all done');
  }
}
