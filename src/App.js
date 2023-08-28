import UserInterface from './userInterface/userInterface'
import './App.css'

const App = () => {
  if (typeof window.ethereum === 'undefined') {
    return (
      <div>
        <p>you dont have metamask wallet</p>
      </div>
    )
  }
  return (
    <div className='App'>
      <UserInterface>

      </UserInterface>
    </div>
  )

}

export default App