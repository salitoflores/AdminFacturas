import { Directive, forwardRef, HostBinding, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[contenteditable]',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ContenteditableformDirective), multi: true}]
})
export class ContenteditableformDirective implements ControlValueAccessor {

    @HostBinding('attr.contenteditable') enabled = true;

    private onChange: (value: string) => void;
    private onTouched: () => void;
    private removeDisabledState: () => void;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    @HostListener('input') onInput() {
        this.onChange(this.elementRef.nativeElement.innerText);
    }
    @HostListener('blur') onBlur() {
        this.onTouched();
    }
    writeValue(value: string): void {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', value || '');
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.enabled = !isDisabled;
    }

}
