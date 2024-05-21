/* eslint no-underscore-dangle: 0 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ServiceItem from '../components/ServiceItem';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { BASE_URL } from '../utils/config';

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    category: 'all',
    city: 'all',
  });

  const [loading, setLoading] = useState(false);
  const [services, setservices] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const categoryFromUrl = urlParams.get('category');
    const cityFromUrl = urlParams.get('city');

    if (searchTermFromUrl || typeFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        category: categoryFromUrl || 'all',
        city: cityFromUrl || 'all',
      });
    }

    const fetchServices = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${BASE_URL}/api/service/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setservices(data);
      setLoading(false);
    };

    fetchServices();
  }, [window.location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'category' || id === 'city') {
      setSidebardata({ ...sidebardata, [id]: value });
    } else {
      setSidebardata({
        ...sidebardata,
        [id]: id === 'searchTerm' ? value : e.target.checked,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.keys(sidebardata).forEach((key) => {
      if (sidebardata[key] !== 'all') {
        urlParams.set(key, sidebardata[key]);
      }
    });
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfservices = services.length;
    const startIndex = numberOfservices;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`${BASE_URL}/api/service/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setservices([...services, ...data]);
  };

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto mt-2">
      <div className="p-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          <div className="flex flex-col md:flex-row gap-2 p-1">

            <div className="relative w-full ">
              <UserSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('search1')}
                id="searchTerm"
                className="pl-8 "
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            <select
              onChange={handleChange}
              defaultValue="all"
              id="category"
              className="cursor-pointer appearance-none flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent dark:bg-[#0c0a09] px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
              <option value="all">{t('allcategories')}</option>
              <option value="Assistência Técnica">{t('technicalassistance')}</option>
              <option value="Aulas">{t('classes')}</option>
              <option value="Design e Tecnologia">{t('tech')}</option>
              <option value="Eventos">{t('events')}</option>
              <option value="Reformas">{t('reforms')}</option>
              <option value="Serviços Domésticos">{t('homeservices')}</option>
            </select>

            <select
              id="city"
              name="city"
              defaultValue="all"
              required
              onChange={handleChange}
              className="cursor-pointer appearance-none flex h-9  items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent dark:bg-[#0c0a09] px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
              <option value="all">{t('allcities')}</option>
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
            <Button className="uppercase">{t('search')}</Button>
          </div>

        </form>
      </div>
      <div className="flex-1 max-w-screen-xl ">
        <div className="p-2 flex flex-wrap gap-4">
          {!loading && services.length === 0 && (
            <p className="text-xl">{t('noservice')}</p>
          )}
          {loading && (
            <p className="text-xl text-center w-full">
              {t('loading')}
            </p>
          )}
          {!loading
            && services
            && services.map((service) => (
              <ServiceItem key={service._id} service={service} />
            ))}

          {showMore && (
            <Button variant="link" onClick={onShowMoreClick}>
              {t('showmore')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
