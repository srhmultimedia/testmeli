import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SearchBox } from './components/SearchBox/SearchBox'
import { SearchResults } from './components/SearchResults/SearchResults'
import { ProductDetail } from './components/ProductDetail/ProductDetail'
import './App.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBox />} />
        <Route path="/items" element={<SearchResults/>} />
        <Route path="/items/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
  )
}

export default App
