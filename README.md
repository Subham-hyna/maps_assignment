

# Google Maps Plugin with USA-Only Coordinates

This project is a React.js application that displays geographical coordinates as markers on a Google Map, restricted to the USA. Clicking on a marker displays an info window with the city and state information, fetched using the Google Maps Geocoding API.

---

## Features
- Fullscreen map rendering with Google Maps JavaScript API.
- Markers for coordinates within the USA.
- Info windows with city and state details using reverse geocoding.
- Responsive design for desktop and mobile.

---

## Setup and Installation

### Prerequisites
- Node.js installed on your system.
- A Google Cloud account to generate the required API keys.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/google-maps-usa-plugin.git
   cd google-maps-usa-plugin
   ```

2. **Install Dependencies**:
   Run the following command to install the required libraries:
   ```bash
   npm install
   ```

3. **Configure API Key**:
   - Obtain your API key from the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the following APIs:
     - Maps JavaScript API
     - Geocoding API
     - places API
   - Create a `.env` file in the root directory:
     ```bash
     REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
     ```

4. **Start the Application**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   - Open your browser and navigate to: `http://localhost:3000`

---

## Libraries Used

### Main Libraries
- **React.js**: Framework for building the user interface.
- **@react-google-maps/api**: Wrapper for integrating Google Maps with React.

### Additional Libraries
- **dotenv**: For managing environment variables.
- **Fetch API**: Used for making reverse geocoding requests to the Google Maps Geocoding API.

---

## Notes

1. **Coordinate Restriction**:
   - The application ensures all coordinates are within the USA using predefined geographical bounds.

2. **Info Windows**:
   - City and state information is fetched dynamically using the Google Maps Geocoding API.

3. **Deployment**:
   - For deployment, ensure to configure environment variables correctly on the hosting platform (e.g., Vercel, Netlify).

---