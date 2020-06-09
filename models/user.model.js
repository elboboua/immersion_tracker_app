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
        if (!(await this.exists())) {
            let result = await this.insert();
            this.id = result[0].id;
        } else {
            let result = await knex('user').where({google_id: this.google_id});
            this.name = result[0].name;
            this.id = result[0].id;
            this.email = result[0].email;
            this.google_id = result[0].google_id;
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