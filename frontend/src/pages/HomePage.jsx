import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react"
import { toast } from "react-hot-toast"

function HomePage() {
  return (
    <div>HomePage
      <br />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => toast.success("this is a success toast")}>
        click me
      </button>
      <br />
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>
      <br />

      <SignedIn>
        <SignOutButton/>
      </SignedIn>
      <br />

      <UserButton/>
    </div>
  )
}

export default HomePage