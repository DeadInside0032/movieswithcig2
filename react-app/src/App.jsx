import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Movies } from './pages/Movies'
import { TVSeries } from './pages/TVSeries'
import { SearchPage } from './pages/SearchPage'
import { MyLayout } from './components/MyLayout'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MyLayout/>} >
        <Route path='/' element={<Movies />} />
        <Route path='/tvseries' element={<TVSeries />} />
        <Route path='/search' element={<SearchPage />} />
      </Route>
    </Routes>
  )
}

