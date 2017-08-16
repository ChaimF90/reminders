import knex from './config';
import * as randomString from 'randomstring';
import { User, UserWithId } from '../backendTypes/interfaces';
import * as bcrypt from 'bcrypt';

async function addUser(user: User): Promise<UserWithId> {
    user.tempToken = randomString.generate();
    user.password = await bcrypt.hash(user.password, 10);
    let id = await knex('users').insert(user);
    let thisUser = await knex('users').select().where('id', id[0]).first();
    return thisUser;
}

export {
    addUser
}