import {Component, Input, Host, forwardRef, Inject, ContentChild, ElementRef} from "@angular/core";
import {Accordion} from "./Accordion";
import {AccordionToggle} from "./AccordionToggle";

@Component({
    selector: "accordion-group",
    template: `
  <div class="panel panel-default" [class.dropup]="isOpened">
    <div class="panel-heading" role="tab" (click)="checkAndToggle()">
      <h4 class="panel-title">
        <a *ngIf="heading" role="button" data-toggle="collapse" [attr.aria-expanded]="isOpened">
            {{ heading }}
        </a>
        <ng-content select="accordion-heading"></ng-content>
        <div class="caret" [style.display]="accordion.showArrows ? '' : 'none'">
        </div>
      </h4>
    </div>
    <div *ngIf="isOpened" class="panel-collapse collapse in" role="tabpanel" [attr.aria-labelledby]="heading">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
`
})
export class AccordionGroup {

    @Input()
    heading: string;

    @Input()
    isOpened: boolean = false;

    @ContentChild(AccordionToggle)
    toggler: ElementRef;

    constructor(@Host() @Inject(forwardRef(() => Accordion)) public accordion: Accordion) {
    }

    checkAndToggle() {
        // if custom toggle element is supplied, then do nothing, custom toggler will take care of it
        if (this.toggler)
            return;

        this.toggle();
    }

    toggle() {
        const isOpenedBeforeWeChange = this.isOpened;
        if (this.accordion.closeOthers)
            this.accordion.closeAll();

        this.isOpened = !isOpenedBeforeWeChange;
    }

}