import { SignInButton, SignUpButton } from '@clerk/react'

function App() {


  return (
    <>
      <h1>welcome to the app </h1>
      <SignInButton mode='modal'/>
      <br/>
      <SignUpButton/>
    </>
  )
}

export default App
