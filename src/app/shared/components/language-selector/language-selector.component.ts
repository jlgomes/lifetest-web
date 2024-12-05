import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Language, LanguageService } from '@core/domain/services/language.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnChanges {
  @Input() value = 'pt';
  @Input() style: string = '';
  @Output() lang: EventEmitter<any> = new EventEmitter();

  protected language = 'flag-icon flag-icon-br';
  constructor(
    private _languageService: LanguageService,
    private configDropdown: NgbDropdownConfig,
  ) {
    this.configDropdown.placement = 'bottom';
  }

  /**
   * Method for changing language (br = brasil / gb = inglês)
   * * changeLanguage()
   *  @param {flag: string}
   */
  changeLanguage(flag: Language): void {
    this.language = `flag-icon flag-icon-${flag === 'pt' ? 'br' : 'gb'}`;
    this.lang.emit({ lang: flag });
    this._languageService.changeLanguage(flag)
  }

  /**
   * This method listens for changes in the input value and changes
   * the language according to the value that the input has.
   *
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      if (
        this.value !== '' &&
        this.value !== null &&
        this.value !== undefined
      ) {
        this.language = `flag-icon flag-icon-${this.value === 'pt' ? 'br' : 'gb'
          }`;
      }
    }
  }
}
