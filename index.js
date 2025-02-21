const express = require( 'express' );

const PORT = 4000;
const app = express();

app.get( '/', ( req, res ) => {
    res.send( '<h1>Hello Tresmerg!</h1>' );
} );

app.listen( PORT, () => {
    console.log( `Server running on port ${ PORT }` );
} );