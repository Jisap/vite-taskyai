import Header from "@/components/Header"
import { Outlet } from "react-router"



const RootLayout = () => {
  return (
    <>
      <div className="">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default RootLayout