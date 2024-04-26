import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { fabric } from 'fabric';
import { InstanceComponent } from '../instance/instance.component';
import { InstanceTracker, InstanceTrackerDrawList, TrackerInformation } from '../../models/instance.model';
import { instanceTrackerDrawDummy } from 'src/app/utils/instance.dummy';


@Component({
  selector: 'app-tracker-draw',
  templateUrl: './tracker-draw.component.html',
  styleUrls: ['./tracker-draw.component.scss']
})
export class TrackerDrawComponent implements AfterViewInit, OnChanges {
  @Input() data?: TrackerInformation[] = []
  @Input() tc1?: number = 0
  @Input() tc2?: number = 0
  @Input() tc3?: number = 0
  @Input() title?: string = ''
  @Input() width?: number = 875
  @Input() height?: number = 564

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private isPanning: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private scale: number = 1;
  private translateX: number = 0;
  private translateY: number = 0;

  ngAfterViewInit(): void {

    const canvasElement = this.canvas.nativeElement;
    this.ctx = canvasElement.getContext('2d')!;
    // Draw initial rectangles
    this.drawRectangles();

    // Add event listeners for mouse interaction
    this.canvas.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.nativeElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  updateCoordinateSystem() {
    this.ctx.setTransform(this.scale, 0, 0, this.scale, this.translateX, this.translateY);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.drawRectangles();
    this.data = changes['data']['currentValue']
    const canvasElement = this.canvas.nativeElement;
    this.ctx = canvasElement.getContext('2d')!;
    this.drawRectangles();
  }

  drawRectangles() {

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);  // Clear the canvas
    this.ctx.scale(this.scale, this.scale)
    this.updateCoordinateSystem();  // Update the coordinate system

    // Draw rectangles in the new coordinate system
    for (let itemRect in this.data) {
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.moveTo(this.data[(parseInt(itemRect))]['point_SW'][0], this.data[(parseInt(itemRect))]['point_SW'][1]);
      this.ctx.lineTo(this.data[(parseInt(itemRect))]['point_SE'][0], this.data[(parseInt(itemRect))]['point_SE'][1]);
      this.ctx.lineTo(this.data[(parseInt(itemRect))]['point_NW'][0], this.data[(parseInt(itemRect))]['point_NW'][1]);
      this.ctx.lineTo(this.data[(parseInt(itemRect))]['point_NE'][0], this.data[(parseInt(itemRect))]['point_NE'][1]);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
    }
    
  }

  onMouseDown(event: MouseEvent) {
    this.isPanning = true;
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  }

  onMouseMove(event: MouseEvent) {
    if (this.isPanning) {
      const deltaX = event.offsetX - this.lastX;
      const deltaY = event.offsetY - this.lastY;
      this.translateX += deltaX;
      this.translateY += deltaY;
      this.drawRectangles();
      [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
    }
  }

  onMouseUp() {
    this.isPanning = false;
  }
  private fabricCanvas!: fabric.Canvas;
  // private isPanning = false;
  // private lastPosX = 0;
  // private lastPosY = 0;

  // ngAfterViewInit(): void {
  //   this.fabricCanvas = new fabric.Canvas(this.canvas.nativeElement, {
  //     backgroundColor: '#f0f0f0', // Set your desired background color
  //     selection: false, // Disable object selection
  //     width: 800,
  //     height: 600
  //   });

  //   this.fabricCanvas.on('mouse:down', (event) => {
  //     this.isPanning = true;
  //     const pointer = this.fabricCanvas.getPointer(event.e);
  //     this.lastPosX = pointer.x;
  //     this.lastPosY = pointer.y;
  //   });

  //   this.fabricCanvas.on('mouse:move', (event) => {
  //     if (this.isPanning && event && event.e) {
  //       const pointer = this.fabricCanvas.getPointer(event.e);
  //       const delta = new fabric.Point(pointer.x - this.lastPosX, pointer.y - this.lastPosY);
  //       this.fabricCanvas.relativePan(delta);
  //       this.lastPosX = pointer.x;
  //       this.lastPosY = pointer.y;
  //     }
  //   });

  //   this.fabricCanvas.on('mouse:up', () => {
  //     this.isPanning = false;
  //   });

  //   // Add objects to the canvas
  //   const rect = new fabric.Rect({
  //     left: 100,
  //     top: 100,
  //     width: 200,
  //     height: 150,
  //     fill: 'red'
  //   });
  //   this.fabricCanvas.add(rect);

  zoomIn() {
    this.scale *= 2;  // Increase the scale by 10%
    this.drawRectangles();  // Redraw the content with the new scale
  }

  zoomOut() {
    this.scale /= 2;  // Decrease the scale by 10%
    this.drawRectangles();  // Redraw the content with the new scale
  }

}