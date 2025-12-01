
const base_url = 'https://api.themoviedb.org/3/'; // TMDB base API url
const urlGenres = 'https://api.themoviedb.org/3/genre/';

const getTmdbMetadata = async function () {
    // Prefer client environment variable, fallback to serverless function
    if (import.meta.env?.VITE_TMDB_API_KEY) {
        return { apiKey: import.meta.env.VITE_TMDB_API_KEY };
    }
    try {
        const resp = await fetch('/.netlify/functions/tmdb-metadata');
        if (!resp.ok) return { apiKey: null };
        return await resp.json();
    } catch (err) {
        console.warn('Failed to obtain tmdb metadata', err);
        return { apiKey: null };
    }
}

export const getData = async ({ queryKey }) => {
    console.log('getData queryKey', queryKey); // expected [<something>, <path>, <page>, <selectedGenresArray>]
    const gotTmdbMetadata = await getTmdbMetadata();
    if (!gotTmdbMetadata || (!gotTmdbMetadata.apiKey && !gotTmdbMetadata.bearer)) {
        throw new Error('Missing TMDB credentials (VITE_TMDB_API_KEY, VITE_TMDB_READ_ACCESS_TOKEN or serverless endpoint)');
    }

    // Base URL and default params for discover endpoint
    const page = queryKey[2] || 1
    let url = `${base_url}${queryKey[1]}?page=${page}`;
    // Add default discover params if using discover endpoints
    if (queryKey[1].startsWith('discover/')) {
        url += '&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc';
    }

    if (gotTmdbMetadata.apiKey) {
        url += `&api_key=${gotTmdbMetadata.apiKey}`;
    }
    if (Array.isArray(queryKey[3]) && queryKey[3].length !== 0) // apply genre filters if any
        url += '&with_genres=' + queryKey[3].join(',');
    console.log('getData url', url);

    const headers = {}
    // If bearer token is provided, prefer Authorization header (TMDB v4 token)
    if (gotTmdbMetadata.bearer) {
        headers['Authorization'] = `Bearer ${gotTmdbMetadata.bearer}`
    }
    const resp = await fetch(url, { headers });
    if(!resp.ok) throw new Error(`Failed to fetch data from TMDB ${resp.status}`)
    return await resp.json();
}

export const getGenres = async ({ queryKey }) => {
    console.log('getGenres queryKey', queryKey); // expected [<whatever>, <type>]
    const gotTmdbMetadata = await getTmdbMetadata();
    if (!gotTmdbMetadata?.apiKey && !gotTmdbMetadata?.bearer) throw new Error('Missing TMDB credentials');

    let url = `${urlGenres}${queryKey[1]}/list`;
    console.log('getGenres url', url);
    const headers = {}
    if (gotTmdbMetadata.bearer) {
        headers['Authorization'] = `Bearer ${gotTmdbMetadata.bearer}`
    } else {
        // fallback to API key param
        url += `?api_key=${gotTmdbMetadata.apiKey}`
    }
    const resp = await fetch(url, { headers });
    if (!resp.ok) throw new Error('Failed to fetch genres');
    return await resp.json();
}

export const img_300='https://image.tmdb.org/t/p/w300';
export const img_500='https://image.tmdb.org/t/p/w500';
