import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button"

import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
        navigate('/')
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      variant="outline" 
      className="w-full"
    >
      <FcGoogle className="mr-2"/> Continue with Google
    </Button>
  );
};

export default OAuth;
