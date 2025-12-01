import React, { useState, useEffect } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid, TextField, Box } from '@mui/material'
import { getData } from '../utils'
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'

export const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(()=>{
    let mounted = true
    if(!query || query.trim().length===0){
      setData(null)
      return
    }
    const load = async ()=>{
      try{
        setLoading(true)
        const res = await getData({ queryKey: ['SEARCH', 'search/multi', page, [], { query: query } ] })
        if(!mounted) return
        setData(res)
      }catch(err){
        console.error(err)
      }finally{
        if(mounted) setLoading(false)
      }
    }
    load()
    return ()=>{mounted=false}
  },[query, page])

  return (
    <PageLayout title="Search page" page={page} setPage={setPage}>
      <Box sx={{ display:'flex', justifyContent:'center', p:1 }}>
        <TextField label='Search' variant='outlined' value={query} onChange={e=>{setQuery(e.target.value); setPage(1)}} sx={{width:'50%'}} />
      </Box>
      {isLoading && <MySpinner />}
      <Grid container spacing={2} justifyContent='center'>
        {data?.results?.length > 0 ? (
          data.results
            .filter(obj => obj.media_type !== 'person')
            .map(obj => <MyCard key={obj.id} {...obj} />)
        ) : (!isLoading && query && <div>No results found.</div>)}
      </Grid>
    </PageLayout>
  )
}


