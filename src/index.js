const express = require( 'express' );
const mongoose = require( 'mongoose' );
const redis = require( 'redis' );

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


app.get( '/', ( req, res ) => {
    res.send( '<h1>Hello Tresmerg!</h1>' );
} );

app.listen( PORT, () => {
    console.log( `Server running on port ${ PORT }` );
} );