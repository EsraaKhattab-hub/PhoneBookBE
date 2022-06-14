import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {PhoneBook, PhoneBookRelations} from '../models';

export class PhoneBookRepository extends DefaultCrudRepository<
  PhoneBook,
  typeof PhoneBook.prototype.id,
  PhoneBookRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(PhoneBook, dataSource);
  }
}
