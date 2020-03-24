import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    'es': {
      weekdays: ['Lu', 'Ma', 'Mi', 'Jue', 'Vie', 'Sa', 'Dom'],
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    }
    // other languages you would support
};

@Injectable()
export class DatePickerI18n extends NgbDatepickerI18n {
    readonly i18n = { languaje: 'es' };
    constructor() {
        super();
    }
    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this.i18n.languaje].weekdays[weekday - 1];
    }
    getMonthShortName(month: number, year?: number): string {
        return I18N_VALUES[this.i18n.languaje].months[month - 1];
    }
    getMonthFullName(month: number, year?: number): string {
        return this.getMonthShortName(month, year);
    }
    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }


}
