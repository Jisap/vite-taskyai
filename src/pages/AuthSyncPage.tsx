import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"





const AuthSyncPage = () => {

  const navigate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if(!isLoaded) return;

    if(!isSignedIn) {                              // Redirect a homepage si el user no está logueado
      if(localStorage.getItem("clerkUserId")){     // Si el user ya está logueado, borra la cookie (usar para el caso de logout)
        localStorage.removeItem("clerkUserId");
      }
      navigate("/");
      return;
    }
    if(isSignedIn){                                // Si el user está logueado, guarda su userId en localStorage
      localStorage.setItem("clerkUserId", userId);
      navigate("app/today")                        // y redirige al app/today
    }
  },[userId, isLoaded, isSignedIn])

  return (
    <></>
  )
}

export default AuthSyncPage