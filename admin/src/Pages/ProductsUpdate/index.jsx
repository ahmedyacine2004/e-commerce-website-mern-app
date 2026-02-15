import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import BasicInfo from "../ProductsUpload/BasicInfo";
import Description from "../ProductsUpload/Description";
import MediaUpload from "../ProductsUpload/MediaUpload";
import Variants from "../ProductsUpload/Variants";
import Tags from "../ProductsUpload/Tags";
import Characteristics from "../ProductsUpload/Characteristics";
import ColorsSizes from "../ProductsUpload/ColorsSizes";
import PricingAndAdditionalInfo from "../ProductsUpload/PricingAndAdditionalInfo";
import * as productService from "../../services/product.service";
import Lottie from "lottie-react";
import noneAnimation from "../../assets/lottie/none.json";

export default function ProductsUpdate() {
  const { id } = useParams(); // will be undefined if URL is /products/edit
  const [product, setProduct] = useState(null);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct("NOT_FOUND");
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        if (!data) setProduct("NOT_FOUND");
        else setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct("NOT_FOUND");
      }
    };
    fetchProduct();
  }, [id]);

  const update = (key, value) => setProduct((p) => ({ ...p, [key]: value }));

  const handleMedia = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () =>
        update("media", [...(product.media || []), reader.result]);
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

  const addVariant = () => {
    update("variants", [
      ...(product.variants || []),
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
    product?.variants?.length > 0
      ? product.variants.reduce((sum, v) => sum + Number(v.stock || 0), 0)
      : product?.stock || 0;

  const submitProduct = async () => {
    try {
      await productService.updateProduct(id, product);
      alert("Product updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  // ===== No product found =====
  if (product === "NOT_FOUND")
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-white rounded-lg">
        <div className="w-64 h-64">
          <Lottie animationData={noneAnimation} loop={true} />
        </div>
        <p className="mt-4 text-gray-500 text-lg">
          No product found to update.
        </p>
      </div>
    );

  if (!product) return <p className="text-center mt-20">Loading product...</p>;

  return (
    <div className="min-h-screen p-6 border bg-white border-[rgba(0,0,0,0.1)] rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Update Product</h1>
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
          <PricingAndAdditionalInfo
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
