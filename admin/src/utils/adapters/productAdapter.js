// utils/adapters/productAdapter.js
export const mapProductsData = (products) => {
  return products.map((p) => ({
    id: p._id,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory || "_",
    colors: p.colors || [],
    sizes: p.sizes || [],
    stock: p.stock,
    price: p.price,
    sales : p.sales || 0,
    comparePrice: p.comparePrice,
    rating : p.rating || 4,
    tags: p.tags || [],
    variants: p.variants || [],
    media: p.media || [],
    thumbnail: p.media?.[0] || "", // <- For table display
    characteristics: p.characteristics || [],
    description: p.description || "",
  }));
};
