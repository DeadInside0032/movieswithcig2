import React, { useEffect, useState } from 'react'
import { getGenres } from '../utils'
import { Stack } from '@mui/material'
import { MySpinner } from './MySpinner'
import { SingleChip } from './SingleChip'

export const Genres = ({type='movie', selectedGenres,setSelectedGenres, setPage}) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // use getGenres (reads from TMDB)
  useEffect(()=>{
    let mounted=true
    // default type already provided as prop default value
      const load = async () => {
        setData(null)
        setIsLoading(true)
        try {
          const res = await getGenres({queryKey:['GENRES', type]})
          if(!mounted) return
          setData(res)
        } catch(err) {
          console.error(err)
        } finally {
          if(mounted) setIsLoading(false)
        }
      }
      load()
    return ()=>{mounted=false}
  },[type])
    data && console.log(data.genres);
    
    console.log(selectedGenres);
    
  return (
  <>
  {isLoading && <MySpinner />}
  <Stack direction='row' flexWrap='wrap' justifyContent='center'>  
    {data && data.genres?.map(obj=>
      <SingleChip key={obj.id} {...obj} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
    )}
  </Stack>
  </>
  )
}

