export function validateProduct(product) {
  const errors = [];

  if (!product.name) errors.push("Product name is required");
  if (!product.sku) errors.push("SKU is required");
  if (!product.category) errors.push("Category is required");
  if (!product.brand) errors.push("Brand is required");
  if (!product.subcategory) errors.push("Subcategory is required");
  if (!product.colors || product.colors.length === 0)
    errors.push("At least one color is required");
  if (!product.sizes || product.sizes.length === 0)
    errors.push("At least one size is required");
  if (!product.price || product.price <= 0)
    errors.push("Price must be greater than 0");
  if (!product.stock || product.stock < 0)
    errors.push("Stock must be 0 or more");
  if (!product.media || product.media.length === 0)
    errors.push("At least one product image is required");
  if (!product.description || product.description.trim() === "")
    errors.push("Description cannot be empty");

  return errors;
}
