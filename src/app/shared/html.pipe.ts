import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'safeHtml'})
export class Safe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);

    // sanitize(context: SecurityContext, value: SafeValue | string | null): string | null
    // bypassSecurityTrustHtml(value: string): SafeHtml
    // bypassSecurityTrustStyle(value: string): SafeStyle
    // bypassSecurityTrustScript(value: string): SafeScript
    // bypassSecurityTrustUrl(value: string): SafeUrl
    // bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl

    // return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}
