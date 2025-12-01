
const DEFAULT_BASE_3 = 'https://api.themoviedb.org/3'
const DEFAULT_BASE_4 = 'https://api.themoviedb.org/4'

const getTmdbMetadata = function () {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY || null
    // detect whether the provided key looks like a v4 JWT (starts with eyJ...)
    const looksLikeV4 = typeof apiKey === 'string' && apiKey.split('.').length === 3
    const baseFromEnv = import.meta.env.VITE_TMDB_API_BASE
    return {
        apiKey,
        looksLikeV4,
        base: baseFromEnv || (looksLikeV4 ? DEFAULT_BASE_4 : DEFAULT_BASE_3)
    }
}

export const getData = async ({ queryKey }) => {
    // queryKey expected: [<any>, <pathOrType>, <page>, <selectedGenresArray>]
    console.log('getData queryKey', queryKey);
    const { apiKey, base, looksLikeV4 } = getTmdbMetadata()
    if (!apiKey) throw new Error('Missing TMDB API key (VITE_TMDB_API_KEY)')

    const pathOrType = queryKey[1] || 'discover/movie'
    const page = queryKey[2] || 1
    const selectedGenres = queryKey[3] || []

    let url
    // If user passed just a type like 'movie' or 'tv', build a discover URL
    if (/^movie$|^tv$/.test(pathOrType)) {
        url = new URL(`${base}/discover/${pathOrType}`)
        url.searchParams.set('include_adult', 'false')
        url.searchParams.set('include_video', 'false')
        url.searchParams.set('language', 'en-US')
        url.searchParams.set('sort_by', 'popularity.desc')
        url.searchParams.set('page', String(page))
        if (selectedGenres.length) url.searchParams.set('with_genres', selectedGenres.join(','))
        // add api_key for v3 endpoints; v4 uses Authorization header instead
        if (!looksLikeV4) url.searchParams.set('api_key', apiKey)
    } else {
        // treat pathOrType as a raw path (e.g. '/movie/now_playing' or 'search/movie')
        const raw = pathOrType.replace(/^\/+/, '')
        url = new URL(`${base}/${raw}`)
        if (!looksLikeV4) url.searchParams.set('api_key', apiKey)
        if (page) url.searchParams.set('page', String(page))
        if (selectedGenres.length) url.searchParams.set('with_genres', selectedGenres.join(','))
    }
    console.log('getData url', url.toString(), 'looksLikeV4=', looksLikeV4)
    const headers = {}
    if (looksLikeV4) headers['Authorization'] = `Bearer ${apiKey}`

    const resp = await fetch(url.toString(), { headers })

    if (!resp.ok) throw new Error(`TMDB fetch failed: ${resp.status}`)
    return await resp.json()
}

export const getGenres = async ({ queryKey }) => {
    // queryKey expected: [<any>, <type>] where type is 'movie' or 'tv'
    console.log('getGenres queryKey', queryKey);
    const { apiKey, base, looksLikeV4 } = getTmdbMetadata()
    if (!apiKey) throw new Error('Missing TMDB API key (VITE_TMDB_API_KEY)')
    const type = queryKey[1] || 'movie'
    const url = new URL(`${base}/genre/${type}/list`)
    url.searchParams.set('language', 'en')
    if (!looksLikeV4) url.searchParams.set('api_key', apiKey)
    const headers = {}
    if (looksLikeV4) headers['Authorization'] = `Bearer ${apiKey}`
    console.log('getGenres url', url.toString(), 'looksLikeV4=', looksLikeV4);
    const resp = await fetch(url.toString(), { headers })
    if (!resp.ok) throw new Error(`TMDB fetch failed: ${resp.status}`)
    return await resp.json()
}

export const img_300 = 'https://image.tmdb.org/t/p/w300'
export const img_500 = 'https://image.tmdb.org/t/p/w500'
