import config from "./config.json";

const { assets_url } = config;

export async function filterNonBrokenImages(imageUrls) {
  const checkImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => reject(url);
    });
  };

  const results = await Promise.allSettled(imageUrls.map(checkImage));

  const validUrls = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  return validUrls;
}

export function getTodayDate() {
  // Create a new Date object representing the current date and time
  const today = new Date();

  // Get the year, month, and day components of the date
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");

  // Return the formatted date string in the format YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

export function getFormattedDate(d) {
  // Create a new Date object representing the current date and time
  const today = new Date(d);

  // Get the year, month, and day components of the date
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");

  // Return the formatted date string in the format YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

export function getCurrentTimestamp() {
  // Create a new Date object representing the current date and time
  const now = new Date();

  // Get the current timestamp in milliseconds since the Unix Epoch
  const timestamp = now.getTime();

  // Return the timestamp
  return timestamp;
}

export function timeAgo(timestamp) {
  timestamp = Number(timestamp);
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);
  const absSeconds = Math.abs(seconds);

  let interval = Math.floor(absSeconds / 31536000);
  if (interval >= 1) {
    return seconds < 0 ? `in ${interval} years` : `${interval} years ago`;
  }
  interval = Math.floor(absSeconds / 2592000);
  if (interval >= 1) {
    return seconds < 0 ? `in ${interval} months` : `${interval} months ago`;
  }
  interval = Math.floor(absSeconds / 86400);
  if (interval >= 1) {
    return seconds < 0 ? `in ${interval} days` : `${interval} days ago`;
  }
  interval = Math.floor(absSeconds / 3600);
  if (interval >= 1) {
    return seconds < 0 ? `in ${interval} hours` : `${interval} hours ago`;
  }
  interval = Math.floor(absSeconds / 60);
  if (interval >= 1) {
    return seconds < 0 ? `in ${interval} minutes` : `${interval} minutes ago`;
  }
  return seconds < 0 ? "in a few seconds" : "a few seconds ago";
}

// Function to get the user image by user object
export function getProfileImageByUser(user) {
  if (
    user &&
    user.user_files?.user_profile &&
    user.user_files?.user_profile[0]
  ) {
    return user.user_files.user_profile[0].file;
  }
  return `${assets_url}/user-placeholder.jpg`;
}

// utils/filterTodos.js
export const getFilterTodos = (allTodos, currentFilter, showAll) => {
  let filtered = allTodos
    .filter((todo) => {
      switch (currentFilter) {
        case "All":
          return true;
        case "Today":
          return (
            todo.status !== "completed" &&
            todo.due_date &&
            new Date(todo.due_date).toDateString() === new Date().toDateString()
          );
        case "Week":
          if (todo.status !== "completed" && todo.due_date) {
            const today = new Date();
            // Calculate start of the week (Sunday)
            const startOfWeek = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() - today.getDay()
            );
            // Calculate end of the week (Saturday)
            const endOfWeek = new Date(
              startOfWeek.getFullYear(),
              startOfWeek.getMonth(),
              startOfWeek.getDate() + 6
            );
            // Ensure endOfWeek time is set to the end of the day
            endOfWeek.setHours(23, 59, 59, 999);
            const todoDate = new Date(todo.due_date);

            return todoDate >= startOfWeek && todoDate <= endOfWeek;
          }
          return false;
        case "Important":
          return todo.starred;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (b.starred !== a.starred) {
        return b.starred ? 1 : -1;
      }
      if (a.status === "completed" && b.status !== "completed") {
        return 1;
      }
      if (b.status === "completed" && a.status !== "completed") {
        return -1;
      }
      const dateA = a.due_date ? new Date(a.due_date).getTime() : Infinity;
      const dateB = b.due_date ? new Date(b.due_date).getTime() : Infinity;
      return dateA - dateB;
    });

  // Determine the final output based on showAll flag
  return filtered;
};

export function getAdminEmails() {
  return `ceo@najeebmedia.com, qamar@zamedia.de, nitik@zamedia.de`;
}
