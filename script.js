let books = [];
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const totalPagesEl = document.getElementById('totalPages');
const readPagesEl = document.getElementById('readPages');
const radios = document.getElementsByName('rating');
let edit = false;

class Book {
    constructor(title, author, totalPages, readPages, rating) {
        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.readPages = readPages;
        this.pagesLeft = totalPages - readPages;
        this.rating = rating;
    }
}

window.editBook = (title) => {
    let book = books.find(book => book.title === title);
    titleEl.value = book.title;
    authorEl.value = book.author;
    totalPagesEl.value = book.totalPages;
    readPagesEl.value = book.readPages;
    edit = title;
    render();
};

window.deleteBook = (title) => {
    books = books.filter(book => book.title !== title);
    render();
};

window.addBook = () => {
    const title = titleEl.value;
    const author = authorEl.value;
    const totalPages = totalPagesEl.value;
    const readPages = readPagesEl.value;
    if  (title && author && totalPages && readPages) {
        titleEl.value = '';
        authorEl.value = '';
        totalPagesEl.value = '';
        readPagesEl.value = '';
        let rating = 1;
        radios.forEach(radio => {
            if (radio.checked) {
                rating = radio.value;
                radio.checked = false;
            }
        });
        if (edit) {
            window.deleteBook(edit);
            edit = false;
        }
        const book = new Book(title, author, totalPages, readPages, rating);
        books.push(book);
        render();
    }

};

const render = () => {
    const table = document.getElementById('table');
    table.innerHTML = '';
    books.forEach((book) => {
        let rating = '';
        for (let i = 0; i < book.rating; i++) {
            rating += `<label class="star">&starf;</label>`;
        }
        table.innerHTML += `
<tr>
 <td>${book.title}</td>
 <td>${book.author}</td>
 <td>${book.pagesLeft}</td>
 <td>${rating}</td>
 <td>
    <img src="img/edit.png" alt="edit" onclick="editBook('${book.title}')" />
    <img src="img/delete.png" alt="delete" onclick="deleteBook('${book.title}')" />
 </td>
</tr>
`;
    });

};
