import React, { useState, useEffect, createContext } from "react"; // React 16
import axios from "axios";

export const ProductContext = createContext(null);

export const ProductProvider = (props) => {
  const [Products, setProducts] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${url}/product/list-product`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const updateproductState = async () => {
    const res = await axios.get(`${url}/product/list-product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(res.data);
  };

  const remove_product = (id) => {
    axios
      .delete(`${url}/product/remove-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => updateproductState())
      .catch((err) => console.log(err));
  };

  const addProduct = async (data) => {
    try {
      const response = await axios
        .post(`${url}/product/add-product`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => updateproductState())
        .then(() => alert("Product uploaded successfully"));
    } catch (error) {
      alert("Error uploading product:", error);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const response = await axios
        .put(`${url}/product/update-product/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => updateproductState())
        .then(() => alert("Product Updated Successfully"));
    } catch (error) {
      alert("Error updating product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ Products, updateProduct, remove_product, addProduct, url }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
