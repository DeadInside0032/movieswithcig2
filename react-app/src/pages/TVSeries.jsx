import React, { useEffect, useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid } from '@mui/material'
import { getData } from '../utils'
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'

export const TVSeries = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const res = await getData({ queryKey: ['TV', 'discover/tv', page, selectedGenres] })
        if (!mounted) return
        setData(res)
      } catch (err) {
        console.error(err)
      } finally {
        if(mounted) setLoading(false)
      }
    }
    load()
    return ()=>{mounted=false}
  },[page, selectedGenres])

  return (
    <PageLayout title='TV Series' page={page} setPage={setPage} type='tv' selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}>
      {isLoading && <MySpinner />}
      <Grid container spacing={2} justifyContent='center'>
        {data?.results?.length > 0 ? (
          data.results.map(obj => <MyCard key={obj.id} {...obj} />)
        ) : (!isLoading && <div>No shows found.</div>)}
      </Grid>
    </PageLayout>
  )
}
 


