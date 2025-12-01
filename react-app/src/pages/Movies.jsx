import React, { useEffect } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid } from '@mui/material'
import { getData } from '../utils'
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'
import { useState } from 'react'


export const Movies = () => {
  const [page, setPage] = React.useState(1);
  const [selectedGenres,setSelectedGenres]=useState([])
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  console.log(page);

  // Use getData to fetch movies and the serverless/configured API key.
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await getData({ queryKey: ['MOVIES', 'discover/movie', page, selectedGenres] });
        if (!mounted) return;
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false }
  }, [page, selectedGenres])

  // Page is reset to 1 inside the SingleChip click handler; no extra effect needed.

  return (
   <PageLayout title="Movies" page={page} setPage={setPage} type='movie'
    selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
   > 
    {isLoading && <MySpinner />}
    <Grid container spacing={2} justifyContent='center'>
      {data?.results?.length > 0 ? (
        data.results.map(obj => <MyCard key={obj.id} {...obj} />)
      ) : (!isLoading && <div>No movies found.</div>)}
    </Grid>

   </PageLayout>
  )
}

