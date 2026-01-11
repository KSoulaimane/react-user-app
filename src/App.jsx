import UserTable from './components/UserTable'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
