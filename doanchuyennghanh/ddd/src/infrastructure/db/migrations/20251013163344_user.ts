import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password');
        table.string('email').notNullable();
        table.string('phoneNumber').notNullable();
        table.string('address').notNullable();
        table.string("accessToken");
        table.string("refreshToken");
        table.enu('role', ['admin', 'user', 'guest']).defaultTo('user');
        table.timestamps(true, true); 
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');   
    
}

