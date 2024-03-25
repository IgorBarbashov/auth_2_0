import {Account, Client} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('auth20');

export const account = new Account(client);

export default client;