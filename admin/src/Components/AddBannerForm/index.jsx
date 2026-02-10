import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaCloudUploadAlt } from "react-icons/fa";
import { createBanner } from "../../api/banners";
import "react-lazy-load-image-component/src/effects/blur.css";
import { notify } from "../../utils/ToastUtils";

export default function AddBannerForm({ onSave }) {
  const [imgSrc, setImgSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [h4, setH4] = useState("");
  const [h2, setH2] = useState("");
  const [h3Text, setH3Text] = useState("");
  const [h3Price, setH3Price] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!imgSrc || !h2 || !h3Price) {
      notify("Please fill all required fields", "warning");
      return;
    }

    const newBanner = { imgSrc, alt, h4, h2, h3Text, h3Price };

    try {
      const savedBanner = await createBanner(newBanner);
      notify("Banner added successfully!", "success");
      if (onSave) onSave(savedBanner);
      setImgSrc("");
      setAlt("");
      setH4("");
      setH2("");
      setH3Text("");
      setH3Price("");
    } catch (err) {
      console.error(err);
      notify("Failed to add banner", "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <h2 className="text-xl font-bold text-primary">Add New Banner</h2>

      <div className="flex flex-row gap-6 w-full">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Alt Text</label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Small Heading (h4)</label>
            <input
              type="text"
              value={h4}
              onChange={(e) => setH4(e.target.value)}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Main Heading (h2)</label>
            <input
              type="text"
              value={h2}
              onChange={(e) => setH2(e.target.value)}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">
              Label Before Price (h3Text)
            </label>
            <input
              type="text"
              value={h3Text}
              onChange={(e) => setH3Text(e.target.value)}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Price (h3Price)</label>
            <input
              type="text"
              value={h3Price}
              onChange={(e) => setH3Price(e.target.value)}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <label className="border-2 border-dashed rounded-xl h-48 w-full flex flex-col items-center justify-center cursor-pointer hover:border-primary !bg-white">
            <FaCloudUploadAlt size={28} />
            <span className="mt-2 text-sm">Click to upload image</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </label>

          {imgSrc && (
            <LazyLoadImage
              src={imgSrc}
              alt="Banner Preview"
              effect="blur"
              className="w-full h-48 object-cover rounded mt-4 border"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-primary text-white font-semibold py-2 px-6 rounded hover:bg-primary/80 transition"
        >
          Add Banner
        </button>
      </div>
    </div>
  );
}
