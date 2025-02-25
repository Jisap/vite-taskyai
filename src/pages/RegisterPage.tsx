import Head from "@/components/Head"
import { SignUp } from "@clerk/clerk-react"





const RegisterPage = () => {
  return (
    <>
      <Head 
        title="Create an Account - Tasky AI To-Do List & Project Management App"
      />

      <section>
        <div className="container flex justify-center">
          <SignUp signInUrl="/login" />
        </div>
      </section>
    </>
  )
}

export default RegisterPage