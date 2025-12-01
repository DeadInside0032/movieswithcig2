import React, { useState } from 'react'
import { Grid, TextField, Box, Button } from '@mui/material'
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setHasSearched(true)
    setPage(1)
    setLoading(true)
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY
      const looksLikeV4 = typeof apiKey === 'string' && apiKey.split('.').length === 3
      const base = looksLikeV4 ? 'https://api.themoviedb.org/4' : 'https://api.themoviedb.org/3'
      
      const url = new URL(`${base}/search/multi`)
      url.searchParams.set('query', searchQuery)
      url.searchParams.set('page', '1')
      if (!looksLikeV4) url.searchParams.set('api_key', apiKey)
      
      const headers = {}
      if (looksLikeV4) headers['Authorization'] = `Bearer ${apiKey}`
      
      const resp = await fetch(url.toString(), { headers })
      if (!resp.ok) throw new Error(`Search failed: ${resp.status}`)
      const result = await resp.json()
      setData(result)
    } catch (err) {
      console.error('Search error', err)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Box sx={{
      background: 'linear-gradient(to right, #082f49, #075985)',
      color: 'white',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Box sx={{
        textAlign: 'center',
        background: 'linear-gradient(to right, #e24dc9ff, #d6f36cff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2rem',
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: '20px'
      }}>
        Search
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '20px 0' }}>
        <TextField
          placeholder="Search movies, TV shows, people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' }
            }
          }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ backgroundColor: '#e24dc9ff' }}>
          Search
        </Button>
      </Box>

      {isLoading && <MySpinner />}

      {hasSearched && !isLoading && (!data || !data.results?.length) && (
        <Box sx={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
          No results found
        </Box>
      )}

      <Grid container spacing={2} justifyContent='center' sx={{ paddingBottom: '60px' }}>
        {data && data.results?.map(obj => (
          <MyCard key={obj.id} {...obj} />
        ))}
      </Grid>
    </Box>
  )
}


