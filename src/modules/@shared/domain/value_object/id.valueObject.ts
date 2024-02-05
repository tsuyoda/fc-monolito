import IValueObject from './valueObject.interface';
import { v4 as uuid } from 'uuid';

export default class Id implements IValueObject {
  private _value: string;

  constructor(id?: string) {
    this._value = id || uuid();
  }

  get value(): string {
    return this._value;
  }
}
