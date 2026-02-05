import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Create a new product
export async function createProduct(product) {
  const { data } = await axios.post(API_URL, product, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

// Get all products
export async function getProducts() {
  const { data } = await axios.get(API_URL);
  return data;
}

// Get a single product by ID
export async function getProductById(id) {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
}

// Update a product by ID
export async function updateProduct(id, product) {
  const { data } = await axios.put(`${API_URL}/${id}`, product, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

// Delete a product by ID
export async function deleteProduct(id) {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
}
