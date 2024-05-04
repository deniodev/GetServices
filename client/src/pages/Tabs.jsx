import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Tabs = ({ tab, setTab }) => {
  const { t } = useTranslation();
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
          {t("about")}
        </Button>

        <Button
          onClick={() => setTab("gallery")}
          className="w-full"
          variant={`${tab === "gallery" ? "outline" : "seconday"}`}
        >
          {t("gallery")}
        </Button>

        <Button
          onClick={() => setTab("reviews")}
          className="w-full"
          variant={`${tab === "reviews" ? "outline" : "seconday"}`}
        >
          {t("reviews")}
        </Button>
      </div>
    </div>
  );
};

export default Tabs;
