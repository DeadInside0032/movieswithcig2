import React, { useEffect } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid } from '@mui/material'
import { getData } from '../utils'
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'
import { useState } from 'react'


export const Movies = props => {
  const [page, setPage] = React.useState(1);
  const [selectedGenres,setSelectedGenres]=useState([])
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  console.log(page);

  // TODO use getData

  return (
   <PageLayout title="Movies" page={page} setPage={setPage} type='movie'
    selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
   > 
    {/* TODO spin while loading */}
    <Grid container spacing={2} justifyContent='center'>
      {data && data.results?.map(obj=>
       <MyCard key={obj.id} {...obj}/>
      )}
    </Grid>

   </PageLayout>
  )
}

