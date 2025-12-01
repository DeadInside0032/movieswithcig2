/** GET /.netlify/functions/tmdb-metadata */
/* eslint-env node */
/* eslint-disable no-undef */
module.exports.handler = async () => {
    try{
        const apiKey = process?.env?.VITE_TMDB_API_KEY || null;
        const bearer = process?.env?.VITE_TMDB_READ_ACCESS_TOKEN || null; // v4 read access token (Bearer)
        return {
            statusCode: 200,
            body: JSON.stringify({apiKey, bearer, error: null})
        }
    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify({apiKey: null, error: err.message})
        }
    }
}