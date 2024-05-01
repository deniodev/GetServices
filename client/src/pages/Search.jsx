import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceItem from "../components/ServiceItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSearch } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    category: "All",
    city: "All",
  });

  const [loading, setLoading] = useState(false);
  const [services, setservices] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const categoryFromUrl = urlParams.get("category");
    const cityFromUrl = urlParams.get("city");

    if (searchTermFromUrl || typeFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        category: categoryFromUrl || "All",
        city: cityFromUrl || "All",
      });
    }

    const fetchServices = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/service/get?${searchQuery}`);
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
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === "category" || id === "city") {
      setSidebardata({ ...sidebardata, [id]: value });
    } else {
      setSidebardata({
        ...sidebardata,
        [id]: id === "searchTerm" ? value : e.target.checked,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    for (const key in sidebardata) {
      if (sidebardata[key] !== "All") {
        urlParams.set(key, sidebardata[key]);
      }
    }
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfservices = services.length;
    const startIndex = numberOfservices;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setservices([...services, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="relative">
            <UserSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              id="searchTerm"
              className="pl-8 "
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <select
              onChange={handleChange}
              defaultValue={"All"}
              id="category"
              className="cursor-pointer appearance-none flex h-9 w-[180px] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent dark:bg-[#0c0a09] px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
              <option value="All">All Categories</option>
              <option value="Assistência Técnica">Assistência Técnica</option>
              <option value="Aulas">Aulas</option>
              <option value="Design e Tecnologia">Design e Tecnologia</option>
              <option value="Eventos">Eventos</option>
              <option value="Reformas">Reformas</option>
              <option value="Serviços Domésticos">Serviços Domésticos</option>
            </select>

            <select
              id="city"
              name="city"
              defaultValue={"All"}
              required
              onChange={handleChange}
              className="cursor-pointer appearance-none flex h-9 w-[180px] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent dark:bg-[#0c0a09] px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
              <option value="All">All Cities</option>
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

          <Button className="uppercase">Search</Button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold border-b p-3 mt-5">
          Service results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && services.length === 0 && (
            <p className="text-xl text-slate-700">No services found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            services &&
            services.map((service) => (
              <ServiceItem key={service._id} service={service} />
            ))}

          {showMore && (
            <Button variant="link" onClick={onShowMoreClick}>
              Show more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
