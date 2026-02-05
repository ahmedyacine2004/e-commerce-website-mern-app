import { useState } from "react";
import { Button } from "@mui/material";
import BasicInfo from "./BasicInfo";
import Description from "./Description";
import MediaUpload from "./MediaUpload";
import Variants from "./Variants";
import Pricing from "./Pricing";
import Tags from "./Tags";
import Characteristics from "./Characteristics";
import ColorsSizes from "./ColorsSizes";
import * as productService from "../../services/product.service";

const initialProduct = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  subcategory: "",
  price: 0,
  comparePrice: 0,
  stock: 0,
  description: "",
  active: true,
  media: [],
  tags: [],
  colors: [],
  sizes: [],
  options: [{ name: "Size", values: ["S", "M"] }],
  variants: [],
  characteristics: [],
};

export default function ProductsUpload() {
  const [product, setProduct] = useState(initialProduct);
  const [tagInput, setTagInput] = useState("");

  const update = (key, value) => setProduct((p) => ({ ...p, [key]: value }));

  const handleMedia = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => update("media", [...product.media, reader.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (i) =>
    update(
      "media",
      product.media.filter((_, idx) => idx !== i),
    );

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      update("tags", [...product.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const submitProduct = async () => {
    // ✅ Ensure required fields
    if (!product.colors.length || !product.sizes.length) {
      return alert("Please add at least one color and size.");
    }
    try {
      console.log("Submitting product:", product);
      await productService.createProduct(product);
      alert("Product created successfully ✅");
      setProduct(initialProduct);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const addVariant = () => {
    update("variants", [
      ...product.variants,
      { title: "", price: 0, stock: 0, sku: "" },
    ]);
  };

  const removeVariant = (i) => {
    update(
      "variants",
      product.variants.filter((_, idx) => idx !== i),
    );
  };

  const updateVariant = (i, key, value) => {
    const copy = [...product.variants];
    copy[i][key] = value;
    update("variants", copy);
  };

  const totalVariantStock =
    product.variants.length > 0
      ? product.variants.reduce((sum, v) => sum + Number(v.stock || 0), 0)
      : product.stock;

  return (
    <div className="min-h-screen p-6 border bg-white border-[rgba(0,0,0,0.1)]  rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Create Product</h1>
        <Button
          variant="contained"
          className="!bg-primary"
          onClick={submitProduct}
        >
          Save Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-6">
          <BasicInfo product={product} update={update} />
          <Characteristics product={product} update={update} />
          <Description product={product} update={update} />
          <MediaUpload
            product={product}
            handleMedia={handleMedia}
            removeImage={removeMedia}
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <Pricing
            product={{ ...product, stock: totalVariantStock }}
            update={update}
            hasVariants={product.variants.length > 0}
          />
          <Variants
            product={product}
            updateVariant={updateVariant}
            addVariant={addVariant}
            removeVariant={removeVariant}
          />
          <ColorsSizes product={product} update={update} />
          <Tags
            product={product}
            tagInput={tagInput}
            setTagInput={setTagInput}
            update={update}
            addTag={addTag}
          />
        </div>
      </div>
    </div>
  );
}
