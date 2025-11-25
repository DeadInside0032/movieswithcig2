
const base_url="todo://find.url" // help: https://developer.themoviedb.org/reference/ 
const urlGenres=`todo://find.url` /*${type}/list?api_key=${import.meta.env.VITE_API_KEY}*/

const getTmdbMetadata =   function () {
    // TODO fetch tmdb-metadata
}

export const getData=async ({queryKey})=>{
    console.log('getData queryKey', queryKey);//ez egy tömb 
    const gotTmdbMetadata =   getTmdbMetadata()

    let url=base_url+queryKey[1]+"?api_key="+gotTmdbMetadata.apiKey+'&page='+queryKey[2]
    if(queryKey[3].length!=0)//itt szűrünk
        url+='&with_genres='+queryKey[3].join(',')
    console.log('getData url', url);  

    const resp = 'TODO fetch url with apiKey'
    return await resp.json()
}

export const getGenres=async ({queryKey})=>{
    console.log('getGenres queryKey', queryKey);//ez egy tömb 2 darab elemmel
    const gotTmdbMetadata =   getTmdbMetadata()
    console.log('gotTmdbMetadata', gotTmdbMetadata)
    
    const url=urlGenres+queryKey[1]+"/list"
    console.log('getGenres url', url);  

    const resp = 'TODO fetch url with apiKey'
    return await resp.json()
}

export const img_300='https://image.tmdb.org/t/p/w300';
export const img_500='https://image.tmdb.org/t/p/w500';
