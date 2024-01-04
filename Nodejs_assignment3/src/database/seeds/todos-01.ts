import { Knex } from 'knex';

const TABLE_NAME = 'todos';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 2,
          title: "something is here",
        },
        {
          id: 5,
          title: "something1 is here",
        },
      ]);
    });
}