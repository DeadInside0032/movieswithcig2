import React, { useEffect, useState } from 'react'
import { getGenres } from '../utils'
import { Stack } from '@mui/material'
import { SingleChip } from './SingleChip'

export const Genres = ({type,selectedGenres,setSelectedGenres}) => {
    const [data, setData] = useState(null)

  // fetch genres when `type` changes
  useEffect(()=>{
    let mounted = true
    setData(null)
    getGenres({queryKey:[null, type]})
      .then(res => { if(mounted) setData(res) })
      .catch(err => { console.error('getGenres error', err); if(mounted) setData(null) })
    return ()=>{ mounted=false }
  },[type])

  data && console.log(data.genres);
  console.log(selectedGenres);
    
  return (
    <Stack direction='row' flexWrap='wrap' justifyContent='center'>  
        {data && data.genres.map(obj=>
            <SingleChip key={obj.id} {...obj} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
        )}
    </Stack>
  )
}

