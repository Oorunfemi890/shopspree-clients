import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ProductUpload.css';

const API_URL = 'https://shopspree-backend.onrender.com';


function ProductUpload() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [sku, setSku] = useState('');
    const [storeId, setStoreId] = useState('');
    const [image, setImage] = useState(null);
    const [originalName, setOriginalName] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setOriginalName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('categoryId', categoryId);
        formData.append('sku', sku);
        formData.append('storeId', storeId);
        formData.append('image', image);
        formData.append('originalName', originalName);

        try {
            const response = await axios.post(`${API_URL}/api/create`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product uploaded successfully!');
        } catch (error) {
            alert('Failed to upload product.');
        }
    };

    return (
        <div className="product-upload-container">
            <h2>Upload a New Product</h2>
            <form onSubmit={handleSubmit} className="product-upload-form">
                <div className="input-grid">
                    {[{ label: 'Name', value: name, setter: setName, type: 'text' },
                      { label: 'Price', value: price, setter: setPrice, type: 'number' },
                      { label: 'Stock', value: stock, setter: setStock, type: 'number' },
                      { label: 'Category ID', value: categoryId, setter: setCategoryId, type: 'text' },
                      { label: 'SKU', value: sku, setter: setSku, type: 'text' },
                      { label: 'Store ID', value: storeId, setter: setStoreId, type: 'number' }]
                      .map((field, index) => (
                        <div className="form-group" key={index}>
                            <input 
                                type={field.type}
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                placeholder=" "
                            />
                            <label>{field.label}</label>
                        </div>
                    ))}
                </div>
                <div className="form-group image-upload">
                    <input type="file" id="image" onChange={handleImageUpload} />
                </div>
                <button type="submit" className="submit-button">Upload Product</button>
            </form>
        </div>
    );
}

export default ProductUpload;

