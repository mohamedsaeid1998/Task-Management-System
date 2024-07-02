import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"

interface IProps {

}

const Nav = ({ }: IProps) => {
  return <>
    <header className="mt-2 mb-4">
      <nav className="flex justify-between items-center">
        <ModeToggle />

        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton >
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
      </nav>
    </header>

  </>
}

export default Nav