import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {


    private deboucer: Subject<string> = new Subject<string>();
    private deboucerSuscription?: Subscription;

    @Input()
    public initialValue : string = '';

    @Input()
    public placeholder: string = '';

    @Output()
    public onValue: EventEmitter<string> = new EventEmitter();

    @Output()
    public ondeboucer: EventEmitter<string> = new EventEmitter();

    ngOnInit(): void {
     this.deboucerSuscription = this.deboucer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value => {
        console.log('deboucer value', value);
        this.ondeboucer.emit(value);
      });
    }

    ngOnDestroy(): void {
      this.deboucerSuscription?.unsubscribe();
    }

    public emitValue(value: string): void{
      this.onValue.emit(value);
    }

    public onKeyPress(searchParam: string): void {
      this.deboucer.next(searchParam);

    }
}
