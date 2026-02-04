import { IconButton } from "@mui/material";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import Card from "./Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function MediaUpload({ product, handleMedia, removeImage }) {
  return (
    <Card title={<span className="text-primary">Media</span>}>
      <label className="border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-primary !bg-white">
        <FaCloudUploadAlt size={28} />
        <span className="mt-2 text-sm">Drag & drop or click</span>

        <input
          type="file"
          multiple
          hidden
          accept="image/*,video/*"
          onChange={(e) => handleMedia(e.target.files)}
        />
      </label>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {product.media.map((item, i) => {
          const isVideo = item.startsWith("data:video");

          return (
            <div
              key={i}
              className="relative group border rounded-lg overflow-hidden bg-gray-100"
            >
              {isVideo ? (
                <video
                  src={item}
                  controls
                  className="h-28 w-full object-cover"
                />
              ) : (
                <LazyLoadImage
                  src={item}
                  alt="media"
                  effect="blur"
                  wrapperClassName="w-full h-full"
                  className="h-28 w-full object-cover"
                />
              )}

              <IconButton
                onClick={() => removeImage(i)}
                className="!absolute top-1 right-1 !bg-white"
              >
                <FaTrash size={12} />
              </IconButton>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
