import { Routes, Route } from 'react-router'
import { Orders } from './components/index'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Orders />} />
      </Routes >
    </>
  )
}

export default App
