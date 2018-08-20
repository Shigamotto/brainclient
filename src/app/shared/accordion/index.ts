import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {Accordion} from "./accordion";
import {AccordionGroup} from "./accordion-group";
import {AccordionToggle} from "./accordion-toggle";
import {AccordionHeading} from "./accordion-heading";

export * from "./accordion";
export * from "./accordion-group";
export * from "./accordion-toggle";
export * from "./accordion-heading";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Accordion,
        AccordionGroup,
        AccordionToggle,
        AccordionHeading
    ],
    exports: [
        Accordion,
        AccordionGroup,
        AccordionToggle,
        AccordionHeading
    ]
})
export class AccordionModule {
}
