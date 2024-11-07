import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("roles").del();

    // Inserts seed entries
    await knex("roles").insert([
        {id: 1,  name: 'super', permissions: JSON.stringify([ 
              { action: 'manage', subject: 'all' }]) },
        {id: 2, name: 'admin', permissions: JSON.stringify([
              { action: 'create', subject: 'users' },])
          },
        {id: 3, name: 'user', permissions: JSON.stringify([
            { action: 'read', subject: 'users' },])
        }
    ]);

    await knex("users").insert([
        { id: 1, email: 'super@casl.io', password: '$2a$10$EohtO1y0aQyNniLmS6pEO.dvYP/onsAOnoUomVV9a7LYJctaHL50S', roleId: 1 },
        { id: 2, email: 'admin@casl.io', password: '$2a$10$EohtO1y0aQyNniLmS6pEO.dvYP/onsAOnoUomVV9a7LYJctaHL50S', roleId: 2 },
    ])
};
