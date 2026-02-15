import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaFileExport, FaPlus } from "react-icons/fa";

import GenericTable from "../../Components/Table";
import SearchBox from "../../Components/SearchBox";
import Modal from "../../Components/Modal";

import { MainBannersTableColumns } from "../../constants/MainBannersTableColumns";
import { getMainBanners } from "../../api/mainBanners";
import AddMainBannerForm from "../../Components/AddMainBannerForm";

function MainBanners() {
  const [mainBanners, setMainBanners] = useState([]);
  const [mainSearch, setMainSearch] = useState("");
  const [mainLoading, setMainLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
    fetchMainBanners();
  }, []);

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

  return (
    <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-8 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-[700] text-[24px] text-primary">
          Main Banners Management
        </h1>
        <div className="flex gap-2">
          <Button
            endIcon={<FaPlus size={16} />}
            variant="contained"
            className="!bg-primary"
            onClick={handleAddMainBanner}
          >
            Add Main Banner
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
            Main Banners Table
          </h2>
          <div className="w-[300px]">
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

export default MainBanners;
