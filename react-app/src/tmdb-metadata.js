/** GET /.netlify/functions/tmdb-metadata */
module.exports.handler = async () => {
    const apiKey = process?.env?.VITE_TMDB_API_KEY;
    // TODO respond with {apiKey, error}
}