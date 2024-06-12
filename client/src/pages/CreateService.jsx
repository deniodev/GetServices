import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { app } from '../firebase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Progress } from '../components/ui/progress';

const CreateService = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    city: '',
    phone: '',
    coverImg: '',
    title: '',
    category: '',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeImage = async (file) =>
    new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });

  const handleCoverImageSubmit = (file) => {
    if (file) {
      setCoverUploading(true);
      setImageUploadError(false);

      storeImage(file)
        .then((url) => {
          setFormData({
            ...formData,
            coverImg: url,
          });
          setImageUploadError(false);
          setCoverUploading(false);
        })
        .catch(() => {
          setImageUploadError(`${t('uploaderror')}`);
          setCoverUploading(false);
        });
    } else {
      setImageUploadError(`${t('uploaderror2')}`);
      setCoverUploading(false);
    }
  };

  const handleImageSubmit = (files) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError(`${t('uploaderror')}`);
          setUploading(false);
        });
    } else {
      setImageUploadError(`${t('uploaderror3')}`);
      setUploading(false);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setFiles([file]);
    handleCoverImageSubmit(file);
  };

  const handleGalleryImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    handleImageSubmit(selectedFiles);
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleRemoveCoverImage = () => {
    setFormData({
      ...formData,
      coverImg: '',
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [id]: digitsOnly,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedPhone = formData.phone;
    if (!updatedPhone.startsWith('258')) {
      updatedPhone = `258${updatedPhone}`;
    }

    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/service/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: updatedPhone,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      toast.success('Service Created!');
      navigate(`/service/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="p-3 max-w-screen-xl mx-auto">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {t('createservice')}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {t('createservice2')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div className="max-w-screen-xl  items-center gap-1.5">
            <Label htmlFor="name" className="ml-1">
              {t('name')}
            </Label>
            <Input
              type="text"
              placeholder={t('servicename')}
              id="name"
              maxLength="62"
              minLength="5"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="max-w-screen-xl items-center gap-1.5">
            <Label htmlFor="title" className="ml-1">
              {t('title')}
            </Label>
            <Input
              type="title"
              placeholder={t('title1')}
              id="title"
              required
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div className="max-w-screen-xl items-center gap-1.5">
            <Label htmlFor="select" className="ml-1">
              {t('city')}
            </Label>
            <select
              id="city"
              name="city"
              required
              onChange={handleChange}
              value={formData.city}
              className="dark:bg-[#0c0a09] cursor-pointer appearance-none flex h-9 w-full rounded-md border border-input  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="All">{t('selectcity')}</option>
              <option value="Pemba">Pemba</option>
              <option value="Lichinga">Lichinga</option>
              <option value="Nampula">Nampula</option>
              <option value="Nacala">Nacala</option>
              <option value="Quelimane">Quelimane</option>
              <option value="Tete">Tete</option>
              <option value="Moatize">Moatize</option>
              <option value="Chimoio">Chimoio</option>
              <option value="Beira">Beira</option>
              <option value="Dondo">Dondo</option>
              <option value="Maxixe">Maxixe</option>
              <option value="Inhambane">Inhambane</option>
              <option value="Xai-Xai">Xai-Xai</option>
              <option value="Maputo">Maputo</option>
              <option value="Matola">Matola</option>
            </select>
          </div>
          <div className="max-w-screen-xl items-center gap-1.5">
            <Label htmlFor="category" className="ml-1">
              {t('category')}
            </Label>
            <select
              id="category"
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="dark:bg-[#0c0a09] cursor-pointer appearance-none flex h-9 w-full rounded-md border border-input  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="All">{t('selectcategory')}</option>
              <option value="Assistência Técnica">
                {t('technicalassistance')}
              </option>
              <option value="Aulas">{t('classes')}</option>
              <option value="Design e Tecnologia">{t('tech')}</option>
              <option value="Eventos">{t('events')}</option>
              <option value="Reformas">{t('reforms')}</option>
              <option value="Serviços Domésticos">{t('homeservices')}</option>
            </select>
          </div>
          <div className="max-w-screen-xl items-center gap-1.5">
            <Label htmlFor="phone" className="ml-1">
              {t('phone')}
            </Label>
            <Input
              type="phone"
              placeholder={t('whatsaap')}
              id="phone"
              required
              onChange={handleChange}
              value={formData.phone}
            />
          </div>

          <div className="max-w-screen-xl items-center gap-1.5">
            <Label htmlFor="description" className="ml-1">
              {t('description')}
            </Label>
            <Textarea
              type="text"
              placeholder={t('description1')}
              id="description"
              rows="6"
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>

          <div className="max-w-screen-xl items-center gap-1.5">
            <Label htmlFor="cover" className="ml-1">
              {t('coverimg')}
            </Label>
            <div className="flex gap-2 mb-2">
              <Input
                onChange={handleCoverImageChange}
                id="cover"
                type="file"
                accept="image/*"
              />
            </div>
            {coverUploading && <Progress value={progress} />}
          </div>

          <div className="max-w-screen-xl items-center gap-1.5">
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.coverImg !== '' && (
              <div className="flex justify-between p-3 border items-center rounded-md">
                <img
                  src={formData.coverImg}
                  alt=""
                  className="w-20 h-20 object-contain"
                />
                <Button
                  type="button"
                  onClick={handleRemoveCoverImage}
                  variant="link"
                >
                  {t('delete')}
                </Button>
              </div>
            )}
          </div>

          <div className="max-w-screen-xl items-center gap-1.5">
            <Label htmlFor="images" className="ml-1">
              {t('galleryimgs')}
            </Label>
            <div className="flex gap-2 mb-2">
              <Input
                onChange={handleGalleryImagesChange}
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
            </div>
            {uploading && <Progress value={progress} />}
          </div>

          <div className="max-w-screen-xl items-center gap-1.5">
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center rounded-md"
                >
                  <img
                    src={url}
                    alt="service images"
                    className="w-20 h-20 object-contain"
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    variant="link"
                  >
                    {t('delete')}
                  </Button>
                </div>
              ))}

            <Button disabled={loading || uploading} className="mt-7 ">
              {loading ? `${t('creating')}` : `${t('createservice')}`}
            </Button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateService;
