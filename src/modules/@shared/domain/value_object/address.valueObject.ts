import IValueObject from './valueObject.interface';

export default class Address implements IValueObject {
  private _street: string = '';
  private _number: number;
  private _complement: string = '';
  private _city: string = '';
  private _state: string = '';
  private _zipCode: string = '';

  constructor(
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
  ) {
    this._street = street;
    this._number = number;
    this._complement = complement;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get complement(): string {
    return this._complement;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  public toString(): string {
    return `${this.street}, ${this.number}, ${this.complement} - ${this.zipCode} - ${this.city} / ${this.state}`;
  }

  public toObject() {
    return {
      street: this.street,
      number: this.number,
      complement: this.complement,
      zipCode: this.zipCode,
      city: this.city,
      state: this.state,
    };
  }

  private validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }
    if (!this._number || this._number === 0) {
      throw new Error('Number is required');
    }
    if (this._complement.length === 0) {
      throw new Error('Complement is required');
    }
    if (this._city.length === 0) {
      throw new Error('City is required');
    }
    if (this._state.length === 0) {
      throw new Error('State is required');
    }
    if (this._zipCode.length === 0) {
      throw new Error('Zip code is required');
    }
  }
}
