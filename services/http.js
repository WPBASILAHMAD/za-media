import axios from "axios";
import data from "./config";
import { getFormattedDate, getLoggerUser } from "./helper";

const { api_url } = data;

// New axio interceptor syntax from
// source: https://stackoverflow.com/questions/68714143/how-can-i-use-axios-interceptors-to-add-some-headers-to-responses
axios.interceptors.request.use(
  (config) => {
    // console.log(config.url);

    if (
      config.url !==
      "https://a9yd2tumde.execute-api.us-east-1.amazonaws.com/dev/utils/upload-images"
    )
      config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle error
    // console.log(error);
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      alert("An unexpected error occurred!");
    }
    return Promise.reject(error);
  }
);

export const getData = async (pk, sk, begin_with, table_name) => {
  try {
    const data = { pk, sk, begin_with, table_name };
    // Make the GET request to fetch categories
    const response = await axios.post(`${api_url}/db/get-data`, data);

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const saveData = async (PK, SK, item_data, table_name) => {
  try {
    const data = { PK, SK, item_data, table_name };
    // Make the GET request to fetch categories
    const response = await axios.post(`${api_url}/db/save-data`, data);

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error saving data:", error);
    throw error;
  }
};

export const updateData = async (PK, SK, item_data, table_name) => {
  try {
    const data = { PK, SK, item_data, table_name };
    // Make the GET request to fetch categories
    const response = await axios.post(`${api_url}/db/update-data`, data);

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error saving data:", error);
    throw error;
  }
};

export const deleteData = async (PK, SK, table_name) => {
  try {
    const data = { PK, SK, table_name };
    // Make the GET request to fetch categories
    const response = await axios.delete(`${api_url}/db/data`, { data });

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const deleteTodoListInBulk = async (PK, SK, table_name) => {
  try {
    const data = { PK, SK, table_name };
    // Make the GET request to fetch categories
    const response = await axios.delete(`${api_url}/todo/list`, { data });

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const fetchAllTodos = async (user_id) => {
  try {
    const response = await axios.get(`${api_url}/todo/${user_id}`);

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const updateUserStatus = async (user_name, user_email, action) => {
  try {
    const response = await axios.get(
      `${api_url}/auth/signup/${user_name}/${user_email}/${action}`
    );

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error updating user status:", error);
    throw error;
  }
};

export const sharingListWithUsers = async (
  listID,
  listTitle,
  sharedByUserID,
  newShares,
  unShares
) => {
  try {
    const data = { listID, listTitle, sharedByUserID, newShares, unShares };
    // Make the GET request to fetch categories
    const response = await axios.post(`${api_url}/todo/list/share`, data);

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const sendEmail = async (to, subject, content) => {
  try {
    const data = { to, subject, content };
    // Make the GET request to fetch categories
    const response = await axios.post(`${api_url}/utils/email`, data);

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error sending email:", error);
    throw error;
  }
};

export const logActivity = async (type, text, flag = true, user = null) => {
  try {
    user = !user ? getLoggerUser() : user;
    const data = { type, text, flag, user };
    // Make the GET request to fetch categories
    const response = await axios.post(`${api_url}/logs`, data);

    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error recording a log:", error);
    throw error;
  }
};

// fetching Langs, countries, brands, logs etc
export const getAppData = async () => {
  try {
    const response = await axios.get(`${api_url}/utils/app-data`, data);
    // Return the categories from the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error getting app data:", error);
    throw error;
  }
};

export const getLogsData = async () => {
  try {
    // Get current date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    // Calculate date 30 days ago
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const start_date = formatDate(startDate);
    const end_date = formatDate(endDate);

    // Fetch data for the last 30 days including today
    const response = await axios.get(`${api_url}/logs`, {
      params: {
        start_date,
        end_date,
      },
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error getting app data:", error);
    throw error;
  }
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
