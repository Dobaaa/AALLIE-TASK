# Sales Data Visualization Dashboard

A full-stack web application for managing and visualizing quarterly sales data with interactive 3D charts. Built with React.js, Three.js, Laravel, and MySQL.

## 🎯 Project Overview

This application provides a comprehensive solution for sales data management and visualization. Users can input, edit, and delete quarterly sales data for different products, and view the information through interactive 3D visualizations. The system features real-time data updates, multiple chart types, and a responsive design.

### Key Features

- **Data Management**: CRUD operations for sales data
- **3D Visualization**: Interactive charts using Three.js
- **Real-time Updates**: Automatic data refresh and synchronization
- **Multiple Chart Types**: Quarterly, Performance, and Product views
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error management and user feedback

## 🛠 Technologies Used

### Backend

- **Laravel 10**: PHP framework for API development
- **MySQL**: Database for data persistence
- **XAMPP**: Local development environment
- **Eloquent ORM**: Database abstraction layer
- **CORS**: Cross-origin resource sharing support

### Frontend

- **React 18**: JavaScript library for building user interfaces
- **Three.js**: 3D graphics library for visualizations
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication

### Development Tools

- **npm**: Package manager for Node.js
- **Composer**: Dependency manager for PHP
- **Git**: Version control system

## 🏗 Backend Setup and Structure

### Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL (via XAMPP)
- Laravel CLI

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aallie-task/backend
   ```

2. **Install dependencies**

   ```bash
   composer install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database configuration**
   Update `.env` file with your database credentials:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=sales_visualization
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run migrations**

   ```bash
   php artisan migrate
   ```

6. **Start the server**
   ```bash
   php artisan serve
   ```

The backend will be available at `http://127.0.0.1:8000`

### Backend Structure

```
backend/
├── app/
│   ├── Http/Controllers/Api/
│   │   └── SalesDataController.php    # API controller
│   └── Models/
│       └── SalesData.php              # Eloquent model
├── database/
│   └── migrations/
│       └── 2024_03_21_000000_create_sales_data_table.php
├── routes/
│   └── api.php                        # API routes
└── config/
    └── cors.php                       # CORS configuration
```

### Database Schema

The `sales_data` table includes:

- `id` (Primary Key)
- `product_name` (String)
- `q1_sales` (Decimal)
- `q2_sales` (Decimal)
- `q3_sales` (Decimal)
- `q4_sales` (Decimal)
- `target` (Decimal)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## 🎨 Frontend Setup and Structure

### Prerequisites

- Node.js 16 or higher
- npm

### Installation

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── DataTable.js              # Data management component
│   │   └── Visualization.js          # 3D charts component
│   │   ├── services/
│   │   │   └── api.js                    # API service layer
│   │   ├── App.js                        # Main application component
│   │   └── index.js                      # Application entry point
│   ├── public/
│   │   └── index.html                    # HTML template
│   └── package.json                      # Dependencies and scripts
```

### Key Components

#### DataTable Component

- Handles CRUD operations for sales data
- Form validation and error handling
- Real-time data updates
- Responsive design with Tailwind CSS

#### Visualization Component

- Interactive 3D charts using Three.js
- Multiple chart types (Quarterly, Performance, Product)
- Hover effects and tooltips
- Camera controls for navigation

## 🔌 API Endpoints

### Base URL

```
http://127.0.0.1:8000/api
```

### Endpoints

#### 1. Get All Sales Data

```http
GET /sales-data
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "product_name": "Product A",
      "q1_sales": 1000.0,
      "q2_sales": 1200.0,
      "q3_sales": 1100.0,
      "q4_sales": 1300.0,
      "target": 5000.0,
      "created_at": "2024-03-21T10:00:00.000000Z",
      "updated_at": "2024-03-21T10:00:00.000000Z"
    }
  ]
}
```

#### 2. Create New Sales Record

```http
POST /sales-data
```

**Request Body:**

```json
{
  "product_name": "Product B",
  "q1_sales": 1500.0,
  "q2_sales": 1600.0,
  "q3_sales": 1700.0,
  "q4_sales": 1800.0,
  "target": 6000.0
}
```

**Response:**

```json
{
  "data": {
    "id": 2,
    "product_name": "Product B",
    "q1_sales": 1500.0,
    "q2_sales": 1600.0,
    "q3_sales": 1700.0,
    "q4_sales": 1800.0,
    "target": 6000.0,
    "created_at": "2024-03-21T10:30:00.000000Z",
    "updated_at": "2024-03-21T10:30:00.000000Z"
  }
}
```

#### 3. Update Sales Record

```http
PUT /sales-data/{id}
```

**Request Body:**

```json
{
  "product_name": "Product B Updated",
  "q1_sales": 1600.0,
  "q2_sales": 1700.0,
  "q3_sales": 1800.0,
  "q4_sales": 1900.0,
  "target": 7000.0
}
```

#### 4. Delete Sales Record

```http
DELETE /sales-data/{id}
```

**Response:**

```json
{
  "message": "Sales data deleted successfully"
}
```

## 🚧 Challenges Encountered and Solutions

### 1. React Installation Issues

**Problem**: React modules not found with "module has no exports" error
**Solution**:

- Identified corrupted React installation in node_modules
- Used `npm install react@18.2.0 react-dom@18.2.0 --force` to reinstall
- Verified React compatibility with Three.js libraries

### 2. CORS Configuration

**Problem**: Frontend unable to connect to Laravel API due to CORS restrictions
**Solution**:

- Configured CORS middleware in Laravel
- Updated `config/cors.php` to allow frontend domain
- Added proper headers for API communication

### 3. Three.js Integration

**Problem**: React 19 compatibility issues with @react-three/fiber
**Solution**:

- Downgraded to React 18.2.0 for compatibility
- Used React Three Fiber and Drei for 3D components
- Implemented proper component structure for 3D rendering

### 4. Database Connection

**Problem**: Missing .env file causing database connection failures
**Solution**:

- Created proper .env file with database credentials
- Set correct permissions for Laravel storage directory
- Configured MySQL connection parameters

### 5. API Error Handling

**Problem**: Generic error messages not providing useful feedback
**Solution**:

- Implemented detailed error logging in Laravel controller
- Added comprehensive error handling in React components
- Created user-friendly error messages and validation

## 📁 Complete Folder Structure

```
aallie-task/
├── backend/
│   ├── app/
│   │   ├── Console/
│   │   ├── Exceptions/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/
│   │   │   │       └── SalesDataController.php
│   │   │   ├── Middleware/
│   │   │   └── Kernel.php
│   │   ├── Models/
│   │   │   ├── SalesData.php
│   │   │   └── User.php
│   │   └── Providers/
│   ├── config/
│   │   ├── app.php
│   │   ├── cors.php
│   │   └── database.php
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   │   └── 2024_03_21_000000_create_sales_data_table.php
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   ├── composer.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── DataTable.js
│   │   │   └── Visualization.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🚀 Recommendations for Future Improvements

### 1. Performance Enhancements

- Implement data pagination for large datasets
- Add caching layer using Redis
- Optimize 3D rendering performance
- Implement lazy loading for components

### 2. User Experience

- Add data export functionality (CSV, PDF)
- Implement user authentication and authorization
- Add data filtering and search capabilities
- Create customizable dashboard layouts

### 3. Advanced Features

- Real-time data updates using WebSockets
- Advanced 3D chart types (scatter plots, surface plots)
- Data analytics and insights
- Automated reporting system

### 4. Technical Improvements

- Add comprehensive unit and integration tests
- Implement CI/CD pipeline
- Add API documentation using Swagger
- Implement logging and monitoring

### 5. Security Enhancements

- Add input sanitization and validation
- Implement rate limiting
- Add API authentication
- Secure database connections

### 6. Deployment

- Docker containerization
- Environment-specific configurations
- Production-ready database setup
- CDN integration for static assets

## 📝 Usage Instructions

1. **Start Backend Server**

   ```bash
   cd backend
   php artisan serve
   ```

2. **Start Frontend Development Server**

   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**

   - Frontend: http://localhost:3000
   - Backend API: http://127.0.0.1:8000/api

4. **Add Sample Data**

   - Use the "Add New Record" form
   - Fill in product name and quarterly sales data
   - Click "Add Record" to save

5. **View 3D Visualizations**
   - Switch between chart types using the dropdown
   - Interact with 3D charts using mouse controls
   - Hover over bars to see detailed information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **AHMED JAMAL** - Initial work

## 🙏 Acknowledgments

- Laravel team for the excellent PHP framework
- React team for the powerful frontend library
- Three.js community for 3D graphics capabilities
- Tailwind CSS for the utility-first CSS framework
