export default function (framework, prefix) {
    switch (framework) {
        case 'Angular':
            return `
            <button 
      [disabled]="disabled"
      class="flex justify-center items-center"
      [class.btn-filled]="config === 'filled'"
      [class.btn-outlined]="config === 'outlined'"
      [class.btn-icon]="config === 'icon'"
      [class.btn-text]="config === 'text'"
      [class.flex-row-reverse]="iconPosition === 'end'"
      [class.gap-10]="icon"
      [class.btn-disabled]="disabled"
      [class.btn-primary]="config === 'filled' && type === 'primary'"
      [class.btn-second]="config === 'filled' && type === 'second'"
      (click)="handleClick()"
      >
      <i [class]="icon" class=" text-tkt-font-24"></i>
    {{title}}
  </button>
            `
    }
}
