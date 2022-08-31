import "./App.css"
import Header from "./components/Header"
import TableOfDeals from "./components/Table"

function App() {
  return (
    <div>
      <Header />
      <div className="table-container">
        <TableOfDeals />
      </div>
    </div>
  )
}

export default App
