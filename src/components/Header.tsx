import { Link } from "react-router"
import Logo from "./Logo"
import { Button } from "./ui/button"


const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4">
      <div className="container h-16 border backdrop-blur-3xl rounded-xl flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <Button 
            asChild
            variant="ghost"
          >
            <Link to="/login">
              Sign in
            </Link>
          </Button>

          <Button
            asChild
          >
            <Link to="/register">
              Start for free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header