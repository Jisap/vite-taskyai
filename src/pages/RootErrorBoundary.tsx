import { isRouteErrorResponse, Link, useRouteError } from "react-router"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"



const RootErrorBoundary = () => {

  const error = useRouteError()


  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <div className="grow container">
        <h1>
          {isRouteErrorResponse(error) 
            ? "Hmmm, that page doesn't exist."
            : "Something went wrong."
          }
        </h1>
        <p>
          {isRouteErrorResponse(error)
            ? "You can get back on track and manage your tasks with ease."
            : "We&apos;re working on fixing this issue."
          }
        </p>
        <div>
          <Button asChild>
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RootErrorBoundary