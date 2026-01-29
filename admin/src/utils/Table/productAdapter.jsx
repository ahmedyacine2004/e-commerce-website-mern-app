// src/utils/productAdapter.js
export const mapProductsData = (productsData) => {
  return productsData.map((p) => ({
    id: p.id,
    name: p.info.name,
    category: p.info.category,
    colors: p.info.colors || [],
    sizes: p.info.sizes || [],
    stock: p.info.stock || 0,
    newPrice: p.info.newPrice,
    rating: p.info.rating,
    img: p.img.url1 || "/placeholder.png",
    sales: p.info.sales?.total || 0, // <-- map the total sales
  }));
};
