import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PhoneBook extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    index: {
      unique: true,
    },
  })
  PhoneNumber: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PhoneBook>) {
    super(data);
  }
}

export interface PhoneBookRelations {
  // describe navigational properties here
}

export type PhoneBookWithRelations = PhoneBook & PhoneBookRelations;
