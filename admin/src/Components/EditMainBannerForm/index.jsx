import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function EditMainBannerForm({ slide, onSubmit }) {
  const [imgSrc, setImgSrc] = useState(slide.imgSrc);
  const [alt, setAlt] = useState(slide.alt || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!imgSrc) {
      alert("Please upload an image");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ imgSrc, alt });
    } catch (error) {
      console.error("Error updating banner:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <h2 className="text-xl font-bold text-primary">Edit Main Banner</h2>

      <div className="flex flex-row gap-6 w-full">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Alt Text</label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              disabled={isSubmitting}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/70 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Image description"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <label
            className={`border-2 border-dashed rounded-xl h-48 w-full flex flex-col items-center justify-center cursor-pointer hover:border-primary !bg-white ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaCloudUploadAlt size={28} />
            <span className="mt-2 text-sm">Click to change image</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </label>

          {imgSrc && (
            <LazyLoadImage
              src={imgSrc}
              alt={alt || "Banner Preview"}
              effect="blur"
              className="w-full h-48 object-cover rounded mt-4 border"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className={`bg-primary text-white font-semibold py-2 px-6 rounded transition flex items-center gap-2 ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-primary/80"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </>
          ) : (
            "Update Banner"
          )}
        </button>
      </div>
    </div>
  );
}
