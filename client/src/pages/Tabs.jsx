import { Button } from "@/components/ui/button";

const Tabs = ({ tab, setTab }) => {
  return (
    <div>
      <div
        className="flex flex-row
        items-center h-max rounded-md"
      >
        <Button
          onClick={() => setTab("about")}
          className="w-full"
          variant={`${tab === "about" ? "outline" : "seconday"}`}
        >
          About
        </Button>

        <Button
          onClick={() => setTab("gallery")}
          className="w-full"
          variant={`${tab === "gallery" ? "outline" : "seconday"}`}
        >
          Gallery
        </Button>

        <Button
          onClick={() => setTab("reviews")}
          className="w-full"
          variant={`${tab === "reviews" ? "outline" : "seconday"}`}
        >
          Reviews
        </Button>
      </div>
    </div>
  );
};

export default Tabs;
