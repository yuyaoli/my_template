import { useEffect } from 'react'
import DocComparePage from './components/DocComparePage'
import './App.css'

function App() {
  useEffect(() => {
    document.title = '文档比较工具Diff'
  }, [])

  return (
    <div className="App">
      <DocComparePage />
    </div>
  )
}

export default App
