import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PhoneBook} from '../models';
import {PhoneBookRepository} from '../repositories';

export class PhoneBookController {
  constructor(
    @repository(PhoneBookRepository)
    public phoneBookRepository : PhoneBookRepository,
  ) {}

  @post('/phone-books')
  @response(200, {
    description: 'PhoneBook model instance',
    content: {'application/json': {schema: getModelSchemaRef(PhoneBook)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhoneBook, {
            title: 'NewPhoneBook',
            exclude: ['id'],
          }),
        },
      },
    })
    phoneBook: Omit<PhoneBook, 'id'>,
  ): Promise<PhoneBook> {
    return this.phoneBookRepository.create(phoneBook);
  }

  @get('/phone-books/count')
  @response(200, {
    description: 'PhoneBook model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PhoneBook) where?: Where<PhoneBook>,
  ): Promise<Count> {
    return this.phoneBookRepository.count(where);
  }

  @get('/phone-books')
  @response(200, {
    description: 'Array of PhoneBook model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PhoneBook, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PhoneBook) filter?: Filter<PhoneBook>,
  ): Promise<PhoneBook[]> {
    return this.phoneBookRepository.find(filter);
  }

  @patch('/phone-books')
  @response(200, {
    description: 'PhoneBook PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhoneBook, {partial: true}),
        },
      },
    })
    phoneBook: PhoneBook,
    @param.where(PhoneBook) where?: Where<PhoneBook>,
  ): Promise<Count> {
    return this.phoneBookRepository.updateAll(phoneBook, where);
  }

  @get('/phone-books/{id}')
  @response(200, {
    description: 'PhoneBook model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PhoneBook, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PhoneBook, {exclude: 'where'}) filter?: FilterExcludingWhere<PhoneBook>
  ): Promise<PhoneBook> {
    return this.phoneBookRepository.findById(id, filter);
  }

  @patch('/phone-books/{id}')
  @response(204, {
    description: 'PhoneBook PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhoneBook, {partial: true}),
        },
      },
    })
    phoneBook: PhoneBook,
  ): Promise<void> {
    await this.phoneBookRepository.updateById(id, phoneBook);
  }

  @put('/phone-books/{id}')
  @response(204, {
    description: 'PhoneBook PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() phoneBook: PhoneBook,
  ): Promise<void> {
    await this.phoneBookRepository.replaceById(id, phoneBook);
  }

  @del('/phone-books/{id}')
  @response(204, {
    description: 'PhoneBook DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.phoneBookRepository.deleteById(id);
  }
}
