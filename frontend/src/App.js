import React, { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import Chart3D from "./components/Visualization";
import api from "./services/api";
import "./App.css";

function App() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/sales-data");
      setSalesData(response.data.data || []);
    } catch (err) {
      console.error("Error fetching sales data:", err);
      setError(
        "Failed to load sales data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const handleDataChange = () => {
    fetchSalesData();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Sales Data Visualization
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Interactive 3D charts and data management system
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchSalesData}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Refresh Data"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading data
                </h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Data Management Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Data Management
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add, edit, and manage your sales data
                </p>
              </div>
              <div className="p-6">
                <DataTable
                  salesData={salesData}
                  onDataChange={handleDataChange}
                  loading={loading}
                />
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  3D Visualization
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Interactive 3D charts with multiple views
                </p>
              </div>
              <div className="p-6">
                <Chart3D salesData={salesData} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>Sales Data Visualization Dashboard</p>
            <p className="mt-1">Built with React, Three.js, and Laravel</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
