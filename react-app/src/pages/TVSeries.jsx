import React, { useEffect, useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid } from '@mui/material'
import { getData } from '../utils'
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'

export const TVSeries = () => {
  const [page, setPage] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const type = 'tv'

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getData({ queryKey: [null, type, page, selectedGenres] })
      .then(res => { if (mounted) setData(res) })
      .catch(err => { console.error('getData error', err); if (mounted) setData(null) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [page, selectedGenres])

  return (
    <PageLayout title='TV Series' page={page} setPage={setPage} type={type} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}>
      {isLoading && <MySpinner />}
      <Grid container spacing={2} justifyContent='center'>
        {data && data.results?.map(obj => (
          <MyCard key={obj.id} {...obj} />
        ))}
      </Grid>
    </PageLayout>
  )
}
 


