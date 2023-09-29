import UserInterface from './userInterface/userInterface'
import './App.css'

const App = () => {
  if (typeof window.ethereum === 'undefined') {
    return (
      <div>
        <p>you dont have metamask wallet extension installed on your device</p>
      </div>
    )
  }
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className='App'>
      <UserInterface>

      </UserInterface>
      <button className='RefreshButton' onClick={handleRefresh}>Refresh</button>
    </div>
  )

}

export default App