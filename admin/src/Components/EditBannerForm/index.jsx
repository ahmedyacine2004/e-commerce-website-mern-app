import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";
import { updateBanner } from "../../api/banners";
import { notify } from "../../utils/ToastUtils";

export default function EditSlideForm({ slide, onSubmit }) {
  const [imgSrc, setImgSrc] = useState(slide.imgSrc);
  const [alt, setAlt] = useState(slide.alt);
  const [h4, setH4] = useState(slide.h4);
  const [h2, setH2] = useState(
    typeof slide.h2 === "string" ? slide.h2 : slide.h2.props.children.join(" "),
  );
  const [h3Text, setH3Text] = useState(slide.h3Text);
  const [h3Price, setH3Price] = useState(slide.h3Price);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const updatedSlide = { imgSrc, alt, h4, h2, h3Text, h3Price };

    try {
      setLoading(true);
      await updateBanner(slide._id, updatedSlide);
      notify("Slide updated successfully!", "success");
      if (onSubmit) onSubmit(updatedSlide);
    } catch (err) {
      console.error(err);
      notify("Failed to update slide. Check console for details.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <h2 className="text-xl font-bold text-primary">Edit Slide</h2>

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
            <span className="mt-2 text-sm">Click to replace image</span>
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
              alt="Slide Preview"
              effect="blur"
              className="w-full h-48 object-cover rounded mt-4 border"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary text-white font-semibold py-2 px-6 rounded hover:bg-primary/80 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
