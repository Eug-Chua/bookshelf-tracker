const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "65ca712b1f5677401f2e6583";
const MASTER_KEY = "$2a$10$ET65v.jBHbiOASL2XFu/8.zpRLBy8o.lVMh2wT20432ybvT9BLhFW";

async function loadBooks() {
  try {
    const response = await axios.get(`${BASE_JSON_BIN_URL}/${BIN_ID}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY
      }
    });
    return response.data.record || [];
  } catch (error) {
    console.error("Failed to load books:", error);
    return [];
  }
}

function addBook(name, status) {
  const newBook = {
    id: Date.now(), 
    name: name,
    status: status
  };
  return newBook;
}

async function saveBooks(books) {
  try {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, {books}, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      }
    });
    console.log("Save successful", response.data);
  } catch (error) {
    console.error("Failed to save books:", error);
  }
}
