/** GET /.netlify/functions/tmdb-metadata */

// This Netlify function returns the TMDB API key from the build/runtime env.
// In Netlify functions the environment variables are available on `process.env`.
module.exports.handler = async () => {
    try {
        const apiKey = process?.env?.VITE_TMDB_API_KEY || null;
        return {
            statusCode: 200,
            body: JSON.stringify({ apiKey, error: null })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ apiKey: null, error: String(err) })
        };
    }
}