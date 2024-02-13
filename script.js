document.addEventListener('DOMContentLoaded', function() {
  async function main() {
    let books = await loadBooks(); 

    const addBookButton = document.querySelector("#addBook");
    addBookButton.addEventListener('click', function() {
      const bookNameInput = document.querySelector("#bookName");
      const bookStatusSelect = document.querySelector("#bookStatus");

      const bookName = bookNameInput.value;
      const bookStatus = bookStatusSelect.value;

      if (bookName) {
        const newBook = addBook(bookName, bookStatus); // Add book and get the updated book
        books.push(newBook); 
        renderBooks(books); 
        bookNameInput.value = ''; // Reset input field
      }
    });

    const saveButton = document.querySelector("#save-btn");
    saveButton.addEventListener("click", async function() {
      await saveBooks(books); // Save books to the server
    });

    // Adding an event listener to filter books by status
    const filterSelect = document.querySelector("#filterStatus");
    filterSelect.addEventListener('change', function() {
      const status = filterSelect.value;
      filterBooksByStatus(status);
    });

    renderBooks(books);
  }

  function filterBooksByStatus(status) {
    const filteredBooks = [];
    for (let book of books) { // Loop through all books
      if (book.status === status || status === 'All') {
        filteredBooks.push(book);
      }
    }
    renderBooks(filteredBooks); // Render only filtered books
  }

  
    function renderBooks(books) {
      const bookList = document.querySelector("#bookList");
      bookList.innerHTML = '';
  
      books.forEach(book => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          ${book.name}
          <span class="badge ${getBadgeColor(book.status)}">${book.status}</span>
          <button class="btn edit-btn btn-success btn-sm">Edit</button>
          <button class="btn delete-btn btn-danger btn-sm">Delete</button>
        `;
  
        // Edit book event
        li.querySelector(".edit-btn").addEventListener("click", () => processEditBook(book));
  
        // Delete book event
        li.querySelector(".delete-btn").addEventListener("click", () => {
          processDeleteBook(book);
          books = books.filter(b => b.id !== book.id); 
          renderBooks(books); 
        });
  
        bookList.appendChild(li);
      });
    }
  
    function processEditBook(book) {
      const newName = prompt("Enter the new book name:", book.name);
      const newStatus = prompt("Enter the new status (Read, To read, Wishlist):", book.status);
  
      if (newName && newStatus) {
        updateBook(book.id, newName, newStatus);
        renderBooks(books); 
      }
    }
  
    function processDeleteBook(book) {
      const confirmDelete = confirm(`Are you sure you want to delete "${book.name}"?`);
      if (confirmDelete) {
        deleteBook(book.id); 
      }
    }
  
    function getBadgeColor(status) {
      switch(status) {
        case "Read":
          return "bg-warning";
        case "To read":
          return "bg-secondary";
        case "Wishlist":
          return "bg-info";
        default:
          return "bg-primary";
      }
    }
  
    main(); 
  });
  