import { Routes, Route } from 'react-router'
import { Menu, NewDish, Orders } from './components/index'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/" element={<Orders />} />
        <Route path="/" element={<NewDish />} />
      </Routes >
    </>
  )
}

export default App
