import { Option } from './selectOption';
import {
  Component,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Popper from 'popper.js';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  constructor(private readonly vcr: ViewContainerRef) {}

  private view: EmbeddedViewRef<any>;
  private popperRef: Popper | null;

  searchConroller = new FormControl();

  @Input() labelKey = 'label';
  @Input() model: Option | null;
  @Input() options: Option[];

  @Input() subSelect: SelectComponent | null;

  @Output() optionChanges = new EventEmitter<Option>();
  isOpen: boolean = false;

  private originalOptions: Option[];

  search(value: string) {
    this.options = this.originalOptions.filter((option) => {
      return option.value.startsWith(value);
    });
  }

  ngOnInit(): void {
    this.originalOptions = [...this.options];
    if (this.model) {
      const option = this.originalOptions.find(
        (op) => op.value === this.model?.value
      );
      option!.isActive = true;
      if (!this.subSelect) {
        this.filterSub(this.model);
      }
    }

    this.searchConroller.valueChanges
      .pipe(debounceTime(50))
      .subscribe((value) => this.search(value));
  }

  get lable() {
    return this.model ? this.model.lable : 'انتخاب';
  }

  public selectOption(option: Option) {
    this.model = option;
    this.close();
    this.options.map((option) => {
      option.isActive = false;
    });
    option.isActive = true;
    this.optionChanges.emit(option);
    if (this.subSelect) {
      this.subSelect?.filter(option);
    }
  }

  public open(dropDownTmplate: TemplateRef<any>, appended: HTMLElement) {
    if (this.isOpen) {
      return this.close();
    }
    this.isOpen = true;

    this.view = this.vcr.createEmbeddedView(dropDownTmplate);
    const dropdown = this.view.rootNodes[0];

    appended.appendChild(dropdown);
  }

  public close() {
    this.isOpen = false;
    this.popperRef?.destroy();
    this.view.destroy();
    if (this.subSelect) {
      this.searchConroller.patchValue('');
    }
    this.popperRef = null;
  }

  public filter(optionRes: Option) {
    this.options.map((option) => {
      option.isActive = false;
    });
    this.model = null;
    this.options = this.originalOptions.filter((option) => {
      return option.parentId === optionRes.value;
    });
  }

  private filterSub(optionRes: Option) {
    this.options = this.originalOptions.filter((option) => {
      return option.parentId === optionRes.parentId;
    });
  }
}
