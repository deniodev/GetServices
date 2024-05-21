/* eslint no-underscore-dangle: 0 */
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice';
import { BASE_URL } from '../utils/config';

const Profile = () => {
  const { t } = useTranslation();
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showServicesError, setShowServicesError] = useState(false);
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },
        () => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => setFormData((prevFormData) => ({
              ...prevFormData,
              avatar: downloadURL,
            })));
        },
      );
    };

    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${BASE_URL}/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success('Profile Updated!');
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${BASE_URL}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success('User deleted');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${BASE_URL}/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signOutUserSuccess(data));
      toast.success('Sign Out');
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowServices = async () => {
    try {
      setLoading(true);
      setShowServicesError(false);
      const res = await fetch(`${BASE_URL}/api/user/services/${currentUser._id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        setShowServicesError(true);
        return;
      }
      setUserServices(data);
    } catch (error) {
      showServicesError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceDelete = async (serviceId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/service/delete/${serviceId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setUserServices((prev) => prev.filter((service) => service._id !== serviceId));
    } catch (error) {
      // Do nothing intentionally, as we are handling the error elsewhere
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <Avatar
              onClick={() => fileRef.current.click()}
              className="self-center h-24 w-24 cursor-pointer"
            >
              <AvatarImage
                src={formData.avatar || currentUser.avatar}
                alt="profile"
              />
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
            <p className="text-sm self-center">
              {fileUploadError && (
                <span className="text-red-700">{t('imageuploaderror')}</span>
              )}
              {filePerc > 0 && filePerc < 100 && !fileUploadError && (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              )}
              {filePerc === 100 && !fileUploadError && (
                <span className="text-green-700">{t('imageupload')}</span>
              )}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  required
                  defaultValue={currentUser.username}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  defaultValue={currentUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" variant="" className="w-full">
                {t('updateprofile')}
              </Button>
              <Link to="/create-service">
                <Button className="w-full">{t('createservice')}</Button>
              </Link>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={handleDeleteUser}
                >
                  {t('deleteaccount')}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={handleSignOut}
                >
                  {t('signout')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      <div className="text-center">
        <Button onClick={handleShowServices} className="mt-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('loading')}
            </>
          ) : (
            t('showservices')
          )}
        </Button>

        {userServices
          && userServices.length > 0
          && userServices.map((service) => (
            <div
              key={service._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4 mb-2 mt-2"
            >
              <Link to={`/service/${service._id}`}>
                <img
                  className="h-16 w-16 object-contain"
                  src={service.coverImg}
                  alt="services cover"
                />
              </Link>
              <Link
                className="flex-1 font-semibold hover:underline truncate"
                to={`/service/${service._id}`}
              >
                <p>{service.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <Button
                  onClick={() => handleServiceDelete(service._id)}
                  variant="link"
                >
                  {t('delete')}
                </Button>

                <Link to={`/update-service/${service._id}`}>
                  <Button variant="link">{t('edit')}</Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
