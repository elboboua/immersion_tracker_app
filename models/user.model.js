const knex = require('../config/KnexConnection');
const Knex = require('knex');

/**
 * @param {Knex} knex
 */
class User {
    constructor(name, email, google_id) {
        this.name = name;
        this.email = email;
        this.google_id = google_id;
    }

    async createFromID(id) {
        let result = await knex('user').where({id});
        this.id = id;
        this.name = result[0].name;
        this.email = result[0].email;
        this.google_id = result[0].google_id;
        this.username = result[0].username;
    }

    async exists() {
        let result = await knex('user').where({google_id: this.google_id});
        if (result[0] != undefined) return true;
        else return false;
    }

    async insert() {
        await knex('user').insert({
            name: this.name,
            email: this.email,
            google_id: this.google_id,
        })
    }

    async validateOrCreate() {
        /* If user doesn't exist, insert data, else get id*/
        if (!(await this.exists())) {
            await this.insert();
            let result = await knex('user').where({google_id: this.google_id});
            this.id = result[0].id;
        } else {
            let result = await knex('user').where({google_id: this.google_id});
            this.id = result[0].id;
            this.name = result[0].name;
            this.email = result[0].email;
            this.google_id = result[0].google_id;
            this.username = result[0].username;
        }
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            google_id: this.google_id
        }
    }

}

module.exports = User;