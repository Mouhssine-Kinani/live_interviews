import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
      <h1>welcome to the app </h1>
      <SignedOut>
        <SignInButton mode='modal'/>
        <br/>
        <SignUpButton/>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </>
  )
}

export default App
