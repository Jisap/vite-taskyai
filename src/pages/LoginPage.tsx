import Head from "@/components/Head"
import { SignIn } from "@clerk/clerk-react"

const LoginPage = () => {
  return (
    <>
      <Head
        title="Log In to Tasky AI - Manage Your To-Do List and Projects"
      />

      <section>
        <div className="container flex justify-center">
          <SignIn signUpUrl="/register" />
        </div>
      </section>
    </>
  )
}

export default LoginPage