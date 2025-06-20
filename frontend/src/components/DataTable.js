import React, { useState } from "react";
import api from "../services/api";

const DataTable = ({ salesData, onDataChange, loading }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    q1_sales: "",
    q2_sales: "",
    q3_sales: "",
    q4_sales: "",
    target: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product_name.trim()) {
      newErrors.product_name = "Product name is required";
    }

    if (!formData.q1_sales || parseFloat(formData.q1_sales) < 0) {
      newErrors.q1_sales = "Q1 Sales must be a positive number";
    }

    if (!formData.q2_sales || parseFloat(formData.q2_sales) < 0) {
      newErrors.q2_sales = "Q2 Sales must be a positive number";
    }

    if (!formData.q3_sales || parseFloat(formData.q3_sales) < 0) {
      newErrors.q3_sales = "Q3 Sales must be a positive number";
    }

    if (!formData.q4_sales || parseFloat(formData.q4_sales) < 0) {
      newErrors.q4_sales = "Q4 Sales must be a positive number";
    }

    if (!formData.target || parseFloat(formData.target) < 0) {
      newErrors.target = "Target must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        q1_sales: parseFloat(formData.q1_sales),
        q2_sales: parseFloat(formData.q2_sales),
        q3_sales: parseFloat(formData.q3_sales),
        q4_sales: parseFloat(formData.q4_sales),
        target: parseFloat(formData.target),
      };

      if (editingId) {
        await api.put(`/sales-data/${editingId}`, payload);
        alert("Record updated successfully!");
      } else {
        await api.post("/sales-data", payload);
        alert("Record added successfully!");
      }

      resetForm();
      onDataChange();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save record. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (record) => {
    setFormData({
      product_name: record.product_name,
      q1_sales: record.q1_sales.toString(),
      q2_sales: record.q2_sales.toString(),
      q3_sales: record.q3_sales.toString(),
      q4_sales: record.q4_sales.toString(),
      target: record.target.toString(),
    });
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/sales-data/${id}`);
        alert("Record deleted successfully!");
        onDataChange();
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete record. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      product_name: "",
      q1_sales: "",
      q2_sales: "",
      q3_sales: "",
      q4_sales: "",
      target: "",
    });
    setEditingId(null);
    setErrors({});
  };

  const InputField = ({ name, label, type = "text", placeholder }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Record" : "Add New Record"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <InputField
            name="product_name"
            label="Product Name"
            placeholder="Enter product name"
          />
          <InputField
            name="q1_sales"
            label="Q1 Sales"
            type="number"
            placeholder="0.00"
          />
          <InputField
            name="q2_sales"
            label="Q2 Sales"
            type="number"
            placeholder="0.00"
          />
          <InputField
            name="q3_sales"
            label="Q3 Sales"
            type="number"
            placeholder="0.00"
          />
          <InputField
            name="q4_sales"
            label="Q4 Sales"
            type="number"
            placeholder="0.00"
          />
          <InputField
            name="target"
            label="Target"
            type="number"
            placeholder="0.00"
          />

          <div className="flex gap-2 col-span-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : editingId ? "Update" : "Add Record"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Sales Data</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Q1 Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Q2 Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Q3 Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Q4 Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading data...
                  </td>
                </tr>
              ) : salesData.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No data available. Add some records to get started.
                  </td>
                </tr>
              ) : (
                salesData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.product_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(row.q1_sales).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(row.q2_sales).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(row.q3_sales).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(row.q4_sales).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(row.target).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(row)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
