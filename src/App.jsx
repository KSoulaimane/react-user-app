import UserTable from './components/UserTable'
import AjoutForm from './components/AjoutForm'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path='/form' element={<AjoutForm />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
