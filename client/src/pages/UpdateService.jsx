import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const updateService = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    city: "",
    phone: "",
    coverImg: "",
    title: "",
    category: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const serviceId = params.serviceId;
      const res = await fetch(`/api/service/get/${serviceId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchService();
  }, []);

  
  const handleCoverImageSubmit = (e) => {
    if (files.length === 1) {
      setCoverUploading(true);
      setImageUploadError(false);

      const file = files[0];

      storeImage(file)
        .then((url) => {
          setFormData({
            ...formData,
            coverImg: url,
          });
          setImageUploadError(false);
          setCoverUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (4 mb max per image)");
          setCoverUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 1 image for the cover.");
      setCoverUploading(false);
    }
  };

  const handleImageSubmit = (e) => {
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
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleRemoveCoverImage = (index) => {
    setFormData({
      ...formData,
      coverImg: "",
    });
  };

  const handleChange = (e) => {
      {
         setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/service/update/${params.serviceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/service/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center p-2"> Update a Service </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-4 flex-1">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="ml-1">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Type your service name here."
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="select" className="ml-1">
              City
            </Label>
            <select
              id="city"
              name="city"
              onChange={handleChange}
              value={formData.city}
              required
              className="flex h-9 w-full rounded-md border border-input  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="All">All</option>
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phone" className="ml-1">
              Phone
            </Label>
            <Input
              type="phone"
              placeholder="Type your whatsaap number ex: 258848090100"
              id="phone"
              required
              onChange={handleChange}
              value={formData.phone}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description" className="ml-1">
              Description
            </Label>
            <Textarea
              type="text"
              placeholder="Add description of your service."
              id="description"
              rows="6"
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title" className="ml-1">
              Title
            </Label>
            <Input
              type="title"
              placeholder="Type your service title here."
              id="title"
              required
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="category" className="ml-1">
              Category
            </Label>
            <select
              id="category"
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="flex h-9 w-full rounded-md border border-input  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="All">All</option>
              <option value="Assistência Técnica">Assistência Técnica</option>
              <option value="Aulas">Aulas</option>
              <option value="Design e Tecnologia">Design e Tecnologia</option>
              <option value="Eventos">Eventos</option>
              <option value="Reformas">Reformas</option>
              <option value="Serviços Domésticos">Serviços Domésticos</option>
            </select>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cover" className="ml-1">
              Cover Image
            </Label>
            <div className="flex gap-2">
              <Input
                onChange={(e) => setFiles(e.target.files)}
                id="cover"
                type="file"
                accept="image/*"
              />
              <Button
                type="button"
                disabled={coverUploading}
                onClick={handleCoverImageSubmit}
              >
                {coverUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.coverImg !== "" && (
              <div className="flex justify-between p-3 border items-center rounded-md">
                <img
                  src={formData.coverImg}
                  alt="cover image"
                  className="w-20 h-20 object-contain"
                />
                <Button
                  type="button"
                  onClick={handleRemoveCoverImage}
                  variant="link"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="images" className="ml-1">
              Service Gallery Images
            </Label>
            <div className="flex gap-2">
              <Input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <Button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
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
                    Delete
                  </Button>
                </div>
              ))}

            <Button disabled={loading || uploading} className="mt-4 p">
              {loading ? "Updating..." : "Update service"}
            </Button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </div>
      </form>
    </main>
  );
};

export default updateService;
