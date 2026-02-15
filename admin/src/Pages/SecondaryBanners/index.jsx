import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaFileExport, FaPlus } from "react-icons/fa";

import GenericTable from "../../Components/Table";
import SearchBox from "../../Components/SearchBox";
import Modal from "../../Components/Modal";

import { BannersTableColumns } from "../../constants/BannersTableColumns";
import { getBanners, createBanner, deleteBanner } from "../../api/banners";
import AddBannerForm from "../../Components/AddBannerForm";

function SecondaryBanners() {
  const [sliderBanners, setSliderBanners] = useState([]);
  const [sliderSearch, setSliderSearch] = useState("");
  const [sliderLoading, setSliderLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const fetchSliderBanners = async () => {
    try {
      setSliderLoading(true);
      const data = await getBanners();
      setSliderBanners(data);
    } catch (err) {
      console.error("Failed to fetch slider banners:", err);
    } finally {
      setSliderLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderBanners();
  }, []);

  const handleAddSliderBanner = () => {
    setModalContent(
      <AddBannerForm
        onSubmit={async (newBanner) => {
          await createBanner(newBanner);
          fetchSliderBanners();
          setModalOpen(false);
        }}
      />,
    );
    setModalOpen(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteSlider = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider banner?")) {
      await deleteBanner(id);
      fetchSliderBanners();
    }
  };

  return (
    <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-8 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-[700] text-[24px] text-primary">
          Slider Banners Management
        </h1>
        <div className="flex gap-2">
          <Button
            endIcon={<FaPlus size={16} />}
            variant="contained"
            className="!bg-primary"
            onClick={handleAddSliderBanner}
          >
            Add Slider Banner
          </Button>
          <Button
            startIcon={<FaFileExport size={16} />}
            className="!bg-primary !text-white !px-4"
          >
            Export All
          </Button>
        </div>
      </div>

      <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-4 rounded-lg">
        <div className="w-full flex items-center justify-between py-1">
          <h2 className="text-[18px] font-[600] text-primary">
            Slider Banners Table
          </h2>
          <div className="w-[300px]">
            <SearchBox value={sliderSearch} onChange={setSliderSearch} />
          </div>
        </div>

        <GenericTable
          columns={BannersTableColumns({
            fetchBanners: fetchSliderBanners,
            setModalContent,
            setModalOpen,
          })}
          selectionActions={[]}
          data={sliderBanners}
          search={sliderSearch}
          serachMetric={["h4", "h2", "h3Price", "alt"]}
          isLoading={sliderLoading}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
        maxWidth="lg"
        fullWidth={true}
      />
    </div>
  );
}

export default SecondaryBanners;
