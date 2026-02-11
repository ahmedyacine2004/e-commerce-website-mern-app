import { useState, useEffect } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import { FaFileExport, FaPlus } from "react-icons/fa";

import GenericTable from "../../Components/Table";
import SearchBox from "../../Components/SearchBox";
import Modal from "../../Components/Modal";

// Slider Banners Imports
import { BannersTableColumns } from "../../constants/BannersTableColumns";
import { getBanners, createBanner, deleteBanner } from "../../api/banners";
import AddBannerForm from "../../Components/AddBannerForm";

// Main Banners Imports
import { MainBannersTableColumns } from "../../constants/MainBannersTableColumns";
import { getMainBanners } from "../../api/mainBanners";
import AddMainBannerForm from "../../Components/AddMainBannerForm";

function HomeBanners() {
  const [tabValue, setTabValue] = useState(0);

  // Slider Banners State
  const [sliderBanners, setSliderBanners] = useState([]);
  const [sliderSearch, setSliderSearch] = useState("");
  const [sliderLoading, setSliderLoading] = useState(true);

  // Main Banners State
  const [mainBanners, setMainBanners] = useState([]);
  const [mainSearch, setMainSearch] = useState("");
  const [mainLoading, setMainLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // ===== Fetch Slider Banners =====
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

  // ===== Fetch Main Banners =====
  const fetchMainBanners = async () => {
    try {
      setMainLoading(true);
      const data = await getMainBanners();
      setMainBanners(data);
    } catch (err) {
      console.error("Failed to fetch main banners:", err);
    } finally {
      setMainLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderBanners();
    fetchMainBanners();
  }, []);

  // ===== Handle Tab Change =====
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // ===== Add Slider Banner =====
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

  // ===== Add Main Banner =====
  const handleAddMainBanner = () => {
    setModalContent(
      <AddMainBannerForm
        onSave={async () => {
          fetchMainBanners();
          setModalOpen(false);
        }}
      />,
    );
    setModalOpen(true);
  };

  // ===== Handle Delete Slider Banner =====
  // eslint-disable-next-line no-unused-vars
  const handleDeleteSlider = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider banner?")) {
      await deleteBanner(id);
      fetchSliderBanners();
    }
  };

  return (
    <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-8 rounded-lg">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <h1 className="font-[700] text-[24px] text-primary">
          Banners Management
        </h1>
        <div className="flex gap-2">
          <Button
            endIcon={<FaPlus size={16} />}
            variant="contained"
            className="!bg-primary"
            onClick={
              tabValue === 0 ? handleAddSliderBanner : handleAddMainBanner
            }
          >
            Add {tabValue === 0 ? "Slider" : "Main"} Banner
          </Button>
          <Button
            startIcon={<FaFileExport size={16} />}
            className="!bg-primary !text-white !px-4"
          >
            Export All
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className="!min-h-12"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#2300bd !important",
            },
          }}
        >
          <Tab
            label="Slider Banners"
            className="!text-[16px] !font-[600] !normal-case"
            sx={{
              "&.Mui-selected": {
                color: "#2300bd !important",
                fontWeight: 700,
              },
            }}
          />
          <Tab
            label="Main Banners"
            className="!text-[16px] !font-[600] !normal-case"
            sx={{
              "&.Mui-selected": {
                color: "#2300bd !important",
                fontWeight: 700,
              },
            }}
          />
        </Tabs>
      </div>

      {/* Table Card */}
      <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-4 rounded-lg">
        {/* Slider Banners Table */}
        {tabValue === 0 && (
          <>
            <div className="w-full flex items-center justify-between py-1">
              <h2 className="text-[18px] font-[600] text-primary">
                Slider Banners Table
              </h2>
              <div className="flex gap-3">
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
          </>
        )}

        {/* Main Banners Table */}
        {tabValue === 1 && (
          <>
            <div className="w-full flex items-center justify-between py-1">
              <h2 className="text-[18px] font-[600] text-primary">
                Main Banners Table
              </h2>
              <div className="flex gap-3">
                <SearchBox value={mainSearch} onChange={setMainSearch} />
              </div>
            </div>

            <GenericTable
              columns={MainBannersTableColumns({
                fetchBanners: fetchMainBanners,
              })}
              selectionActions={[]}
              data={mainBanners}
              search={mainSearch}
              serachMetric={["alt"]}
              isLoading={mainLoading}
            />
          </>
        )}
      </div>

      {/* Modal */}
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

export default HomeBanners;
