import React, { useState, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";

const Bar = ({
  position,
  args,
  color,
  data,
  onPointerOver,
  onPointerOut,
  isHovered,
}) => {
  const meshRef = useRef();

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver(data);
      }}
      onPointerOut={onPointerOut}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={isHovered ? "#ff6b6b" : color}
        transparent
        opacity={isHovered ? 0.8 : 1}
      />
    </mesh>
  );
};

const Chart3D = ({ salesData }) => {
  const [chartType, setChartType] = useState("quarterly");
  const [hoveredData, setHoveredData] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 5, 15]);

  const chartData = useMemo(() => {
    if (!salesData || salesData.length === 0) return [];

    switch (chartType) {
      case "quarterly": {
        const totals = salesData.reduce(
          (acc, item) => {
            acc.q1_sales += parseFloat(item.q1_sales);
            acc.q2_sales += parseFloat(item.q2_sales);
            acc.q3_sales += parseFloat(item.q3_sales);
            acc.q4_sales += parseFloat(item.q4_sales);
            return acc;
          },
          { q1_sales: 0, q2_sales: 0, q3_sales: 0, q4_sales: 0 }
        );

        return [
          { name: "Q1", value: totals.q1_sales, color: "#4ECDC4" },
          { name: "Q2", value: totals.q2_sales, color: "#45B7D1" },
          { name: "Q3", value: totals.q3_sales, color: "#96CEB4" },
          { name: "Q4", value: totals.q4_sales, color: "#FFEAA7" },
        ];
      }

      case "performance": {
        return salesData.map((item) => {
          const totalSales =
            parseFloat(item.q1_sales) +
            parseFloat(item.q2_sales) +
            parseFloat(item.q3_sales) +
            parseFloat(item.q4_sales);
          return {
            name: item.product_name,
            sales: totalSales,
            target: parseFloat(item.target),
            color: "#4ECDC4",
          };
        });
      }

      case "product": {
        return salesData.map((item, index) => {
          const totalSales =
            parseFloat(item.q1_sales) +
            parseFloat(item.q2_sales) +
            parseFloat(item.q3_sales) +
            parseFloat(item.q4_sales);
          const colors = [
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
            "#DDA0DD",
            "#98D8C8",
          ];
          return {
            name: item.product_name,
            value: totalSales,
            color: colors[index % colors.length],
          };
        });
      }

      default:
        return [];
    }
  }, [salesData, chartType]);

  const maxValue = useMemo(() => {
    if (!chartData.length) return 1;
    if (chartType === "performance") {
      return Math.max(...chartData.map((d) => Math.max(d.sales, d.target)));
    }
    return Math.max(...chartData.map((d) => d.value));
  }, [chartData, chartType]);

  const handleChartTypeChange = (newType) => {
    setChartType(newType);
    setHoveredData(null);

    // Adjust camera position based on chart type
    switch (newType) {
      case "quarterly":
        setCameraPosition([0, 5, 15]);
        break;
      case "performance":
        setCameraPosition([0, 8, 20]);
        break;
      case "product":
        setCameraPosition([0, 6, 18]);
        break;
      default:
        setCameraPosition([0, 5, 15]);
    }
  };

  const renderBars = () => {
    if (chartType === "performance") {
      return chartData.map((data, i) => (
        <group key={i} position={[i * 3 - (chartData.length - 1) * 1.5, 0, 0]}>
          {/* Sales Bar */}
          <Bar
            position={[0, ((data.sales / maxValue) * 5) / 2, 0]}
            args={[1, (data.sales / maxValue) * 5, 1]}
            color="#4ECDC4"
            data={{
              label: `${data.name} Sales`,
              value: `$${data.sales.toLocaleString()}`,
              type: "sales",
            }}
            onPointerOver={setHoveredData}
            onPointerOut={() => setHoveredData(null)}
            isHovered={hoveredData?.label === `${data.name} Sales`}
          />

          {/* Target Bar */}
          <Bar
            position={[1.5, ((data.target / maxValue) * 5) / 2, 0]}
            args={[1, (data.target / maxValue) * 5, 1]}
            color="#FF6B6B"
            data={{
              label: `${data.name} Target`,
              value: `$${data.target.toLocaleString()}`,
              type: "target",
            }}
            onPointerOver={setHoveredData}
            onPointerOut={() => setHoveredData(null)}
            isHovered={hoveredData?.label === `${data.name} Target`}
          />

          {/* Labels */}
          <Text
            position={[0, -1, 0]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Sales
          </Text>
          <Text
            position={[1.5, -1, 0]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Target
          </Text>
        </group>
      ));
    } else {
      return chartData.map((data, i) => (
        <group key={i} position={[i * 2 - (chartData.length - 1), 0, 0]}>
          <Bar
            position={[0, ((data.value / maxValue) * 5) / 2, 0]}
            args={[1.5, (data.value / maxValue) * 5, 1.5]}
            color={data.color}
            data={{
              label: data.name,
              value: `$${data.value.toLocaleString()}`,
            }}
            onPointerOver={setHoveredData}
            onPointerOut={() => setHoveredData(null)}
            isHovered={hoveredData?.label === data.name}
          />

          {/* Value label on top of bar */}
          <Text
            position={[0, (data.value / maxValue) * 5 + 0.5, 0]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            ${data.value.toLocaleString()}
          </Text>
        </group>
      ));
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 rounded-lg p-4">
      {/* Chart Controls */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Chart Type
          </label>
          <select
            value={chartType}
            onChange={(e) => handleChartTypeChange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="quarterly">Quarterly Sales Comparison</option>
            <option value="performance">Performance vs Targets</option>
            <option value="product">Product Comparison</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Camera Controls
          </label>
          <div className="text-xs text-gray-600">
            • Left click + drag to rotate
            <br />
            • Right click + drag to pan
            <br />• Scroll to zoom
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-[500px] w-full bg-white rounded-lg shadow-inner">
        {salesData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No data available</p>
              <p className="text-sm">
                Add some sales data to see the 3D visualization
              </p>
            </div>
          </div>
        ) : (
          <Canvas
            camera={{
              position: cameraPosition,
              fov: 60,
              near: 0.1,
              far: 1000,
            }}
            shadows
          >
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Camera Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={50}
            />

            {/* Grid and Axes */}
            <gridHelper args={[20, 20, "#e5e7eb", "#d1d5db"]} />
            <axesHelper args={[5]} />

            {/* Chart Bars */}
            {renderBars()}

            {/* Hover Tooltip */}
            {hoveredData && (
              <Html position={[0, 8, 0]} center>
                <div className="bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                  <div className="font-semibold">{hoveredData.label}</div>
                  <div>{hoveredData.value}</div>
                </div>
              </Html>
            )}

            {/* Chart Title */}
            <Text
              position={[0, 7, 0]}
              fontSize={0.8}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {chartType === "quarterly" && "Quarterly Sales Overview"}
              {chartType === "performance" && "Performance vs Targets"}
              {chartType === "product" && "Product Sales Comparison"}
            </Text>
          </Canvas>
        )}
      </div>

      {/* Legend */}
      {chartType === "performance" && (
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4ECDC4] rounded"></div>
            <span className="text-sm">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FF6B6B] rounded"></div>
            <span className="text-sm">Target</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart3D;
