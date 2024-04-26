
import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { fabric } from 'fabric';
import { InstanceComponent } from '../instance/instance.component';
import { InstanceTracker, InstanceTrackerDrawList, TrackerInformation, pointsInformation } from '../../models/instance.model';
import { instanceTrackerDrawDummy } from 'src/app/utils/instance.dummy';


@Component({
  selector: 'app-pointsdraw',
  templateUrl: './pointsdraw.component.html',
  styleUrls: ['./pointsdraw.component.scss']
})

export class PointsdrawComponent implements AfterViewInit, OnChanges {
  @Input() data?: pointsInformation[] = []
  @Input() title?: string = ''
  @Input() points_width?: number = 600
  @Input() points_height?: number = 500
  @Input() coondi?: boolean = false

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private isPanning: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private scale: number = 1;
  private translateX: number = 0;
  private translateY: number = 0;
  private coordi_status: boolean = false;

  ngAfterViewInit(): void {

    const canvasElement = this.canvas.nativeElement;
    this.ctx = canvasElement.getContext('2d')!;
    // Draw initial rectangles
    this.drawCircles();
    console.log(this.data, '000')
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

    if (this.coordi_status != changes['coondi']['currentValue']) {
      this.coordi_status = changes['coondi']['currentValue']
      this.reverseCoordinateSystem();
    }
  }
  reverseCoordinateSystem() {
    this.scale = -1 * this.scale
    if (this.coordi_status) {
      this.translateX = 572
      this.translateY = 350
    }
    else {
      this.translateX = 0
      this.translateY = 0
    }
    this.drawCircles();
  }
  drawCircles() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);  // Clear the canvas
    this.ctx.scale(this.scale, this.scale)
    this.updateCoordinateSystem();  // Update the coordinate system

    // Draw rectangles in the new coordinate system
    for (let itemRect in this.data) {
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.arc(this.data[(parseInt(itemRect))]['posX'], this.data[(parseInt(itemRect))]['posY'], 3, 0, 2 * Math.PI);
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
      this.drawCircles();
      [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
    }
  }

  onMouseUp() {
    this.isPanning = false;
  }
  private fabricCanvas!: fabric.Canvas;

  zoomIn() {
    this.scale *= 2;  // Increase the scale by 10%
    this.drawCircles();  // Redraw the content with the new scale
  }

  zoomOut() {
    this.scale /= 2;  // Decrease the scale by 10%
    this.drawCircles();  // Redraw the content with the new scale
  }

}