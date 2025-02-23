import Footer from "@/components/Footer"
import { Outlet } from "react-router"
import Header from "@/components/Header"



const RootLayout = () => {
  return (
    <>
      <div className="min-h-[100dvh] flex flex-col overflow-hidden">
        <Header />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default RootLayout