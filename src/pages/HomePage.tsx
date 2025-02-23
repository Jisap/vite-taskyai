import Head from "@/components/Head"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { heroBannerSm, heroBannerLg } from "@/assets"




const HomePage = () => {
  return (
    <>
      <Head title="Tasky AI - AI-Powered To-Do List & Project Management App" />
      <section>
        <div className="container !px-8 grid grid-cols-1 gap-8 items-center xl:gap-12 xl:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col items-center text-center space-y-4 lg:text-left lg:items-start lg:space-y-6">
            <h1 className="text-4xl font-semibold max-w-[22ch] md:text-5xl lg:text-6xl">
              Simplify Your Work and Life with{" "} 
              <span className="inline-flex gradient-span">AI-Powered</span> 
              {" "}Task Management
            </h1>

            <p className="max-w-[48ch] text-foreground/80 md:text-lg lg:text-xl">
              Simplify life for both you and your team with the world&apos;s #1 task manager and to-do list app.
            </p>

            <Button asChild size="lg">
              <Link to="register">
                Start for free
              </Link>
            </Button>
          </div>

          <figure className="bg-secondary rounded-2xl overflow-hidden aspect-square max-md:max-w-[480px] max-md:mx-auto md:aspect-video">
            <img 
              src={heroBannerSm}
              width={480}
              height={480}
              alt="Tasky AI Website"
              className="md:hidden"
              // por encima de 768px
            />
            <img
              src={heroBannerLg}
              width={960}
              height={540}
              alt="Tasky AI Website"
              className="max-md:hidden"
              // menor o igual a 768px
            />
          </figure>
        </div>
      </section>
    </>
  )
}

export default HomePage