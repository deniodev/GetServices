import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { app } from '../firebase';
import { BASE_URL } from '../utils/config';

const OAuth = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: 'include',
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      variant="outline"
      className="w-full"
    >
      <FcGoogle className="mr-2" />
      {' '}
      {t('google')}
    </Button>
  );
};

export default OAuth;
