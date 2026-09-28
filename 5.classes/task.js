class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  fix() {
    this.state = this.state * 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const foundBook = this.books.find((book) => book[type] === value);
    if (foundBook === undefined) {
      return null;
    }
    return foundBook;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex((book) => book.name === bookName);
    if (index === -1) {
      return null;
    }
    return this.books.splice(index, 1)[0];
  }
}

function testCase() {
  const library = new Library("Районная библиотека");

  library.addBook(new DetectiveBook("Артур Конан Дойл", "Собака Баскервилей", 1902, 256));
  library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
  library.addBook(new Magazine("Мурзилка", 1924, 60));
  console.log("Книг в библиотеке: " + library.books.length);

  let book1919 = library.findBookBy("releaseDate", 1919);
  if (book1919 === null) {
    console.log("Книги 1919 года нет, добавляем");
    book1919 = new NovelBook("Сомерсет Моэм", "Луна и грош", 1919, 272);
    library.addBook(book1919);
  }
  console.log("Книга 1919 года: " + book1919.name);

  const issuedBook = library.giveBookByName("Пикник на обочине");
  console.log("Выдана книга: " + issuedBook.name + ". Книг осталось: " + library.books.length);

  issuedBook.state = 20;
  console.log("Книгу повредили, состояние: " + issuedBook.state);

  issuedBook.fix();
  console.log("После первой починки: " + issuedBook.state);

  library.addBook(issuedBook);
  console.log("Попытка вернуть. Книг в библиотеке: " + library.books.length);

  issuedBook.fix();
  console.log("После второй починки: " + issuedBook.state);

  library.addBook(issuedBook);
  console.log("Вторая попытка вернуть. Книг в библиотеке: " + library.books.length);
}

testCase();

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5) {
      return;
    }
    if (this.marks[subject] === undefined) {
      this.marks[subject] = [];
    }
    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (this.marks[subject] === undefined) {
      return 0;
    }
    const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0);
    return sum / this.marks[subject].length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);
    if (subjects.length === 0) {
      return 0;
    }
    const sum = subjects.reduce((acc, subject) => acc + this.getAverageBySubject(subject), 0);
    return sum / subjects.length;
  }
}

function testStudent() {
  const student = new Student("Олег Никифоров");
  student.addMark(5, "химия");
  student.addMark(5, "химия");
  student.addMark(5, "физика");
  student.addMark(4, "физика");
  student.addMark(6, "физика");
  student.addMark(1, "физика");
  console.log("Оценки: " + JSON.stringify(student.marks));
  console.log("Средний балл по физике: " + student.getAverageBySubject("физика"));
  console.log("Средний балл по биологии: " + student.getAverageBySubject("биология"));
  console.log("Общий средний балл: " + student.getAverage());

  const newStudent = new Student("Иван Новиков");
  console.log("Средний балл студента без оценок: " + newStudent.getAverage());
}

testStudent();
