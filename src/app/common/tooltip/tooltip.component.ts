import { Component, OnInit } from '@angular/core';
import { TooltipPosition, ArrowPosition, TooltipTheme } from "./tooltip.enums";

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  position: TooltipPosition = TooltipPosition.DEFAULT;
  arrowPos: ArrowPosition = ArrowPosition.DEFAULT;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;

  constructor() {

  }

  ngOnInit(): void {

  }
}
