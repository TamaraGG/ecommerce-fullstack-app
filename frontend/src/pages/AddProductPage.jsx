import { useState } from "react";
import useMutation from "../hooks/useMutation";
import { addProduct } from "../services/ProductService";
import commonStyles from "../styles/index.module.css";
import styles from "../styles/AddProductPage.module.css";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const navigate = useNavigate();
  const { executeMutation, isMutating, error } = useMutation(addProduct);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    imageBase64: null,
  });

  // Характеристики храним как массив объектов для удобного рендеринга инпутов
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imageBase64: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Управление динамическими полями specs
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpecField = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpecField = (index) => {
    const newSpecs = specs.filter((_, i) => i !== index);
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Преобразуем массив specs обратно в объект { key: value }
    const specsObject = specs.reduce((acc, item) => {
      if (item.key.trim() && item.value.trim()) {
        acc[item.key.trim()] = item.value.trim();
      }
      return acc;
    }, {});

    const payload = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity, 10),
      specs: specsObject,
    };

    try {
      await executeMutation(payload);
      navigate("/"); // Перенаправление на главную после успеха
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  return (
    <div className={commonStyles.container}>
      <h1 className={commonStyles.title}>Add New Product</h1>

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        {/* Основная информация */}
        <div className={styles.section}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="e.g. Sony WH-1000XM5"
            />
          </label>

          <div className={styles.row}>
            <label className={styles.label}>
              Category
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="e.g. headphones"
              />
            </label>
            <label className={styles.label}>
              Price ($)
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className={styles.input}
                required
                step="0.01"
                min="0"
              />
            </label>
            <label className={styles.label}>
              Quantity
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className={styles.input}
                required
                min="0"
              />
            </label>
          </div>

          <label className={styles.label}>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className={styles.textarea}
              rows="4"
              placeholder="Product description..."
            />
          </label>
        </div>

        {/* Изображение */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Product Image</span>
          <div className={styles.imageUploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
              id="file-upload"
            />
            <label htmlFor="file-upload" className={styles.fileLabel}>
              {preview ? "Change Image" : "Upload Image"}
            </label>
            {preview && (
              <div className={styles.previewWrapper}>
                <img src={preview} alt="Preview" className={styles.preview} />
              </div>
            )}
          </div>
        </div>

        {/* Характеристики (Specs) */}
        <div className={styles.section}>
          <div className={styles.specsHeader}>
            <span className={styles.sectionTitle}>Specifications</span>
            <button
              type="button"
              onClick={addSpecField}
              className={styles.addButton}
            >
              + Add Spec
            </button>
          </div>

          <div className={styles.specsList}>
            {specs.map((spec, index) => (
              <div key={index} className={styles.specRow}>
                <input
                  type="text"
                  placeholder="Key (e.g. Color)"
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecChange(index, "key", e.target.value)
                  }
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Value (e.g. Black)"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  className={styles.input}
                />
                {specs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpecField(index)}
                    className={styles.removeButton}
                    title="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {error && <div className={commonStyles.error}>{error}</div>}

        <button
          type="submit"
          className={commonStyles.submitButton}
          disabled={isMutating}
        >
          {isMutating ? "Adding..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
