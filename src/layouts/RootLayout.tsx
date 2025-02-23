import Footer from "@/components/Footer"
import { Outlet } from "react-router"
import Header from "@/components/Header"



const RootLayout = () => {
  return (
    <>
      <div className="min-h-[100dvh] flex flex-col overflow-hidden">
        <Header />
        <main className="grow grid grid-cols-1 items-center pt-36 pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default RootLayout