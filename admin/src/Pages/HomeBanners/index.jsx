import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaFileExport, FaPlus } from "react-icons/fa";

import GenericTable from "../../Components/Table";
import SearchBox from "../../Components/SearchBox";
import { BannersTableColumns } from "../../constants/BannersTableColumns";
import { getBanners, createBanner, deleteBanner } from "../../api/banners";
import Modal from "../../Components/Modal";
import AddBannerForm from "../../Components/AddBannerForm";

function HomeBanners() {
  const [search, setSearch] = useState("");
  const [banners, setBanners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== Fetch banners from backend =====
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      setBanners(data);
    } catch (err) {
      console.error("Failed to fetch banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ===== Add Banner =====
  const handleAddBanner = () => {
    setModalContent(
      <AddBannerForm
        onSubmit={async (newBanner) => {
          await createBanner(newBanner);
          fetchBanners();
          setModalOpen(false);
        }}
      />,
    );
    setModalOpen(true);
  };

  // ===== Delete Banner =====
  // eslint-disable-next-line no-unused-vars
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      await deleteBanner(id);
      fetchBanners();
    }
  };

  return (
    <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-8 rounded-lg">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <h1 className="font-[700] text-[24px] text-primary">Home Banners</h1>
        <div className="flex gap-2">
          <Button
            endIcon={<FaPlus size={16} />}
            variant="contained"
            className="!bg-primary"
            onClick={handleAddBanner}
          >
            Add Banner
          </Button>
          <Button
            startIcon={<FaFileExport size={16} />}
            className="!bg-primary !text-white !px-4"
          >
            Export All
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex flex-col gap-4 rounded-lg">
        <div className="w-full flex items-center justify-between py-1">
          <h2 className="text-[18px] font-[600] text-primary">
            Home Banners Table
          </h2>
          <div className="flex gap-3">
            <SearchBox value={search} onChange={setSearch} />
          </div>
        </div>

        <GenericTable
          columns={BannersTableColumns({
            fetchBanners,
            setModalContent,
            setModalOpen,
          })}
          selectionActions={[]}
          data={banners}
          search={search}
          serachMetric={["h4", "h2", "h3Price"]}
          isLoading={loading}
        />
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
        maxWidth="lg" // large width
        fullWidth={true} // fill modal container
      />
    </div>
  );
}

export default HomeBanners;
