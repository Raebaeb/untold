const apiURL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000/"
  : process.env.API_URL;