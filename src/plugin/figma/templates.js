export default async function (type, prefix) {
    switch (type) {
        case 'Angular':
            return generateAngular(prefix)
    }
}

function generateAngular() {
    const html = `
    <button 
      [disabled]="disabled"
      class="flex justify-center items-center"
      [class.button-${prefix}-button-text-border-first]="config === 'outlined'"
      [class.button-${prefix}-button-text-transparent-first]="config === 'text' && type === 'primary'"
      [class.button-${prefix}-button-text-transparent-second]="config === 'text' && type === 'second'"
      [class.flex-row-reverse]="iconPosition === 'end'"
      [class.btn-disabled]="disabled"
      [class.button-${prefix}-button-text-bg-first]="config === 'filled' && type === 'primary'"
      [class.button-${prefix}-button-text-bg-second]="config === 'filled' && type === 'second'"
      (click)="handleClick()"
      >
      <i [class]="icon" *ngIf='icon'></i>
    {{title}}
  </button>
    `
    const scss = `.btn-disabled{
    opacity: 0.5;
    cursor: not-allowed;
}`
    const ts = `import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() title = ''
  @Input() config = 'filled'
  @Input() type = 'primary'
  @Input() iconPosition = ''
  @Input() icon = ''
  @Input() disabled = false
  @Output() onClick = new EventEmitter<any>();
  constructor() { }

  handleClick(){
    this.onClick.emit()
  }
  ngOnInit(): void {
  }

}
`
    const test = `import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const fn = jest.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handleClick called on button click', fakeAsync(() => {
    jest.spyOn(component, 'handleClick');
  
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.handleClick).toHaveBeenCalled();
  
  }));
});
`
    const readMe = `# Button
## Angular-tailwind button 

Angular tailwind basic button component.

## Use

#### Examples
my.component.html

\`\`\`html
<div class="p-20 flex flex-col gap-10">
  <app-button 
  title="my button" 
  config="filled" 
  type="primary" 
  (onClick)="handleClickEvent()">
  </app-button>

  <app-button 
  config="filled" 
  type="second" 
  title="filled-second" 
  (onClick)="handleClickEvent()">
  </app-button>

  <app-button 
  config="outlined" 
  title="outlined" 
  icon="icon-Delete" 
  icon-position="start" 
  (onClick)="handleClickEvent()">
  </app-button>

  <app-button 
  config="text" 
  title="text" 
  icon="icon-Delete" 
  icon-position="start" 
  (onClick)="handleClickEvent()">
  </app-button>

  <app-button 
  config="icon" 
  icon="icon-Delete" 
  (onClick)="handleClickEvent()">
  </app-button>

  <app-button 
  [disabled]="true" 
  title="disabled" 
  (onClick)="handleClickEvent()">
  </app-button>
</div>
\`\`\`
my.component.ts
\`\`\`ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my',
  templateUrl: './app.my.html',
  styleUrls: ['./app.my.scss']
})
export class MyComponent {
  
  handleClickEvent(){
    alert('clicked')
  }
}
\`\`\`
#### Properties

| props | types | values | default |
| ------ | ------ | ------ | ------ |
| config | string | filled / outlined / text / icon | filled
| type | string| primary / second | primary
| title | string | ex : myButton | none
| icon | string | from project font icon, ex : icon-Delete | none
| iconPosition | string | start / end | start
| classes | string | ex : "bg-red text-white" | none

#### Event
| type | name  | usage |
| ------ | ------ | ----- |
| click | onClick | (onClick)="myFunction()" 

#### Test
Test using Jest

## Development

Want to contribute?
![Cool](https://i.pinimg.com/originals/a0/ec/66/a0ec66de2323754ac19d5a86ef16fb56.gif)
`
    return [
        {
            title: 'components/button/button.component.html',
            content: html,
        },
        {
            title: 'components/button/button.component.scss',
            content: scss,
        },
        {
            title: 'components/button/button.component.ts',
            content: ts,
        },
        {
            title: 'components/button/button.component.spec.ts',
            content: test,
        },
        {
            title: 'components/button/README.md',
            content: readMe,
        },
    ]
}
