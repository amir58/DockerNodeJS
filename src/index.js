const express = require( 'express' );
const mongoose = require( 'mongoose' );
const redis = require( 'redis' );
const pg = require( 'pg' );

const PORT = 4000;
const app = express();


const DB_USER = 'root'
const DB_PASSWORD = 'example'
const DB_PORT = 27017
const DB_HOST = 'mongo'

const URI = `mongodb://${ DB_USER }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }`

mongoose.connect( URI )
    .then( () => {
        console.log( 'Connected to MongoDB' );
    } )
    .catch( ( error ) => {
        console.log( error );
    } );

const REDIS_HOST = 'redis';
const REDIS_PORT = '6379';

const redisClient = redis.createClient(
    { url: `redis://${ REDIS_HOST }:${ REDIS_PORT }` }
);

redisClient.on( 'connect', () => {
    console.log( 'Conntect to Redis...' );
} )
redisClient.on( 'error', ( error ) => {
    console.log( error );
} )
redisClient.connect()


const PG_USER = 'root'
const PG_PASSWORD = 'example'
const PG_PORT = 5432
const PG_HOST = 'postgres'

const PG_URI = `postgres://${ PG_USER }:${ PG_PASSWORD }@${ PG_HOST }:${ PG_PORT }`

const client = new pg.Client( PG_URI );

client.connect( () => {
    console.log( 'Connected to PostgreSQL' );
} );

client.on( 'error', ( error ) => {
    console.log( `PostgreSQL error: ${ error } ` );
} );

app.get( '/', ( req, res ) => {
    res.send( '<h1>Hello Tresmerg!</h1>' );
} );

app.listen( PORT, () => {
    console.log( `Server running on port ${ PORT }` );
} );