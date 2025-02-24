import { isRouteErrorResponse, Link, useRouteError } from "react-router"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

import { pageNotFound } from "@/assets"

const RootErrorBoundary = () => {

  const error = useRouteError()


  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />

      <div className="grow container flex flex-col justify-center items-center pt-32">
        <h1 className="">
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

          <Button asChild variant="ghost">
            <Link to="/app/inbox">
              View Inbox
            </Link>
          </Button>
        </div>  

        <figure className="mt-10">
          <img 
            src={pageNotFound}
            width={560}
            height={373}
            alt="404 page not found"
            className=""
          />  
        </figure>    
      </div>

      <Footer />
    </div>
  )
}

export default RootErrorBoundary