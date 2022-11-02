import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acesso-negado',
  templateUrl: './acesso-negado.component.html',
  styleUrls: ['./acesso-negado.component.scss']
})
export class AcessoNegadoComponent implements OnInit, AfterViewInit {

  @ViewChild('eyef') eyef: ElementRef<HTMLInputElement>;
  @ViewChild('container') container: ElementRef<HTMLInputElement>;

  cx: any;
  cy: any;
  x: any;
  y: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.cx = this.eyef.nativeElement.getAttribute("cx");
      this.cy = this.eyef.nativeElement.getAttribute("cy");

      document.addEventListener("mousemove", evt => {
        this.x = evt.clientX / innerWidth;
        this.y = evt.clientY / innerHeight;

        this.container.nativeElement.style.setProperty("--mouse-x", this.x);
        this.container.nativeElement.style.setProperty("--mouse-y", this.y);

        this.cx = 115 + 30 * this.x;
        this.cy = 50 + 30 * this.y;
        this.eyef.nativeElement.setAttribute("cx", this.cx);
        this.eyef.nativeElement.setAttribute("cy", this.cy);

      });

      document.addEventListener("touchmove", touchHandler => {
        this.x = touchHandler.touches[0].clientX / innerWidth;
        this.y = touchHandler.touches[0].clientY / innerHeight;

        this.container.nativeElement.style.setProperty("--mouse-x", this.x);
        this.container.nativeElement.style.setProperty("--mouse-y", this.y);
      });
    }, 1000);
  }

  ngAfterViewInit(): void {
  }

  voltar(): void {
    this.router.navigate(['']);
  }

}
