import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Adjust the base URL as needed

// Function to fetch partner events with authorization token
export const fetchPartnerEvents = async () => {
  try {
    console.log("Starting fetchPartnerEvents");

    const token = localStorage.getItem("token"); // Adjust this if you store the token differently
    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log("Token found:", token);

    console.log("Sending request to fetch partner events");
    const response = await axios.get(
      `${API_BASE_URL}/api/partner/dashboard/events`,
      {
        headers: { 
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
        },
      }
    );

    console.log("Fetched partner events successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching partner events:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Example function to fetch partner information
export const fetchPartnerInfo = async () => {
  try {
    console.log("Starting fetchPartnerInfo");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log("Token found:", token);

    console.log("Sending request to fetch partner info");
    const response = await axios.get(`${API_BASE_URL}/api/partnerInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetched partner info successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching partner information:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw new Error(`Error fetching partner information: ${error.message}`);
  }
};

// Example function to fetch summary statistics
export const fetchSummaryStatistics = async () => {
  try {
    console.log("Starting fetchSummaryStatistics");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log("Token found:", token);

    console.log("Sending request to fetch summary statistics");
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/summaryStatistics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Fetched summary statistics successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching summary statistics:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw new Error(`Error fetching summary statistics: ${error.message}`);
  }
};

// Function to fetch all partners
export const fetchPartners = async () => {
  try {
    console.log("Starting fetchPartners");

    const adminToken = localStorage.getItem("adminToken");
    console.log('Token retrieved from localStorage:', adminToken);
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to fetch all partners");
    const response = await axios.get(`${API_BASE_URL}/api/allpartners`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    console.log("Fetched all partners successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching partners:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to add a new partner
export const addPartner = async (partnerData) => {
  try {
    console.log("Starting addPartner");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to add a new partner");
    const response = await axios.post(
      `${API_BASE_URL}/api/allpartners`,
      partnerData,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Added new partner successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error adding partner:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to update an existing partner
export const updatePartner = async (partnerId, updatedData) => {
  try {
    console.log("Starting updatePartner");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to update partner");
    const response = await axios.put(
      `${API_BASE_URL}/api/allpartners/${partnerId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Updated partner successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error updating partner:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to delete a partner
export const deletePartner = async (partnerId) => {
  try {
    console.log("Starting deletePartner");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to delete partner");
    const response = await axios.delete(
      `${API_BASE_URL}/api/allpartners/${partnerId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Deleted partner successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error deleting partner:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to fetch all events
export const fetchEvents = async () => {
  try {
    console.log("Starting fetchEvents");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to fetch all events");
    const response = await axios.get(`${API_BASE_URL}/api/allevents`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    console.log("Fetched all events successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to add a new event
export const addEvent = async (eventData) => {
  try {
    console.log("Starting addEvent");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to add a new event");
    const response = await axios.post(`${API_BASE_URL}/api/allevents`, eventData, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    console.log("Added new event successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error adding event:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to update an existing event
export const updateEvent = async (eventId, updatedData) => {
  try {
    console.log("Starting updateEvent");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to update event");
    const response = await axios.put(
      `${API_BASE_URL}/api/allevents/${eventId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Updated event successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error updating event:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to delete an event
export const deleteEvent = async (eventId) => {
  try {
    console.log("Starting deleteEvent");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to delete event");
    const response = await axios.delete(
      `${API_BASE_URL}/api/allevents/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Deleted event successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error deleting event:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to fetch ticket sales
export const fetchTicketSales = async () => {
  try {
    console.log("Starting fetchTicketSales");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to fetch ticket sales");
    const response = await axios.get(`${API_BASE_URL}/api/alltickets`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    console.log("Fetched ticket sales successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching ticket sales:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

// Function to fetch dashboard metrics
export const fetchDashboardMetrics = async () => {
  try {
    console.log("Starting fetchDashboardMetrics");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No token found in localStorage");
      throw new Error("No token found");
    }
    console.log('Token found:', adminToken);  // Log token

    console.log("Sending request to fetch dashboard metrics");
    const response = await axios.get(`${API_BASE_URL}/api/alldashboardmetrics`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    console.log("Fetched dashboard metrics successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};
