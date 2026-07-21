import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  const { isSignedIn } = useUser()

  return (
    <>
      <h1>welcome to the app </h1>
      {isSignedIn ? (
        <UserButton/>
      ) : (
        <>
          <SignInButton mode='modal'/>
          <br/>
          <SignUpButton/>
        </>
      )}
    </>
  )
}

export default App
