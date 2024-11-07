// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  
  await knex.schema.createTable('roles', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.json('permissions').notNullable();
  })
  
  await knex.schema.createTable('users', (table) => {
    table.increments('id')

    table.string('email').unique()
    table.string('password')
    
    table.string('googleId')
    table.string('auth0Id')

    table.integer('roleId').unsigned().notNullable();
    table.foreign('roleId').references('id').inTable('roles');
  })

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('roles')
}
