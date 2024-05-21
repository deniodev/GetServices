import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { BASE_URL } from '../utils/config';

export default function SignIn() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
      toast.success('Sign In successful');
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-20">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              {' '}
              {t('signin')}
              {' '}
            </CardTitle>
            <CardDescription>{t('signinemail')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {t('signin')}
              </Button>
              <OAuth />
            </div>
            <div className="mt-4 text-center text-sm">
              {t('dontaccount')}
              {' '}
              <Link to="/sign-up" className="underline">
                {t('signup')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
