document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const searchForm = document.getElementById('searchBook');
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    
    let books = JSON.parse(localStorage.getItem('books')) || [];
    
    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    function generateBookElement(book) {
        const bookElement = document.createElement('div');
        bookElement.setAttribute('data-bookid', book.id);
        bookElement.setAttribute('data-testid', 'bookItem');
        
        bookElement.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai' : 'Selesai dibaca'}</button>
                <button data-testid="bookItemDeleteButton">Hapus</button>
                <button data-testid="bookItemEditButton">Edit</button>
            </div>
        `;
        
        bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
            book.isComplete = !book.isComplete;
            saveBooks();
            renderBooks();
        });
        
        bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
            books = books.filter(b => b.id !== book.id);
            saveBooks();
            renderBooks();
        });
        
        bookElement.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', () => {
            const newTitle = prompt('Edit Judul:', book.title);
            const newAuthor = prompt('Edit Penulis:', book.author);
            const newYear = prompt('Edit Tahun:', book.year);
            if (newTitle && newAuthor && newYear) {
                book.title = newTitle;
                book.author = newAuthor;
                book.year = parseInt(newYear, 10);
                saveBooks();
                renderBooks();
            }
        });
        
        return bookElement;
    }
    
    function renderBooks(searchQuery = '') {
        incompleteBookList.innerHTML = '';
        completeBookList.innerHTML = '';
        
        books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .forEach(book => {
                const bookElement = generateBookElement(book);
                if (book.isComplete) {
                    completeBookList.appendChild(bookElement);
                } else {
                    incompleteBookList.appendChild(bookElement);
                }
            });
    }
    
    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = document.getElementById('bookFormTitle').value;
        const author = document.getElementById('bookFormAuthor').value;
        const year = parseInt(document.getElementById('bookFormYear').value, 10);
        const isComplete = document.getElementById('bookFormIsComplete').checked;
        
        const newBook = {
            id: new Date().getTime(),
            title,
            author,
            year,
            isComplete
        };
        
        books.push(newBook);
        saveBooks();
        renderBooks();
        bookForm.reset();
    });
    
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTitle = document.getElementById('searchBookTitle').value;
        renderBooks(searchTitle);
    });
    
    renderBooks();
});