import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

export interface ITableColumn {
  title: string;
  key: string;
}

export class FormField {
  label: string = '';
  key: string = '';
  type?: string = 'text';
  required?: boolean = true;
  validators?: ValidatorFn[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}
}
