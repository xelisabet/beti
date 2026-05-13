"use strict";
/*
    library.ts
    Cleaned and fixed implementation of the Library system.
    Provides LibraryItem, Book, DVD and Library classes with robust
    serialization (toText) and deserialization (loadFromText).
*/
class LibraryItem {
    id;
    title;
    author;
    year;
    constructor(id, title, author, year) {
        if (id.trim() === "")
            throw new Error("ID cannot be empty");
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getYear() {
        return this.year;
    }
    getSummary() {
        return `[Item] ${this.title} (${this.year})`;
    }
    // Generic serialization (can be overridden in subclasses)
    toFillLine() {
        return `ITEM|${this.id}|${this.title}|${this.author}|${this.year}`;
    }
}
class Book extends LibraryItem {
    pages;
    ISBN;
    constructor(id, title, author, year, pages, ISBN) {
        super(id, title, author, year);
        if (!Number.isFinite(pages) || pages <= 0)
            throw new Error("Pages must be a positive number");
        this.pages = pages;
        this.ISBN = ISBN;
    }
    getSummary() {
        return `[Book] ${this.title} by ${this.author} (${this.year})`;
    }
    toFillLine() {
        return `BOOK|${this.id}|${this.title}|${this.author}|${this.year}|${this.pages}|${this.ISBN}`;
    }
}
class DVD extends LibraryItem {
    duration;
    constructor(id, title, director, year, duration) {
        super(id, title, director, year);
        if (!Number.isFinite(duration) || duration <= 0)
            throw new Error("Duration must be a positive number");
        this.duration = duration;
    }
    getSummary() {
        return `[DVD] ${this.title} by ${this.author} (${this.year})`;
    }
    toFillLine() {
        return `DVD|${this.id}|${this.title}|${this.author}|${this.year}|${this.duration}`;
    }
}
class Library {
    items = [];
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
    toText() {
        return this.items.map((i) => i.toFillLine()).join("\n");
    }
    // Load items from a text representation. Returns an array of error messages (empty when successful).
    loadFromText(text) {
        const lines = text.split(/\r?\n/);
        const errors = [];
        let lineNo = 0;
        for (const raw of lines) {
            lineNo += 1;
            const line = raw.trim();
            if (line === "")
                continue; // skip empty lines
            try {
                const parts = line.split("|").map((p) => p.trim());
                const type = (parts[0] ?? "").replace(/\[|\]/g, "").toUpperCase();
                if (type === "BOOK") {
                    if (parts.length < 7)
                        throw new Error("Not enough fields for BOOK");
                    const id = parts[1];
                    const title = parts[2];
                    const author = parts[3];
                    const year = Number(parts[4]);
                    const pages = Number(parts[5]);
                    const isbn = parts[6];
                    this.addItem(new Book(id, title, author, year, pages, isbn));
                }
                else if (type === "DVD") {
                    if (parts.length < 6)
                        throw new Error("Not enough fields for DVD");
                    const id = parts[1];
                    const title = parts[2];
                    const director = parts[3];
                    const year = Number(parts[4]);
                    const duration = Number(parts[5]);
                    this.addItem(new DVD(id, title, director, year, duration));
                }
                else if (type === "ITEM") {
                    if (parts.length < 5)
                        throw new Error("Not enough fields for ITEM");
                    const id = parts[1];
                    const title = parts[2];
                    const author = parts[3];
                    const year = Number(parts[4]);
                    this.addItem(new LibraryItem(id, title, author, year));
                }
                else {
                    throw new Error(`Unknown type: ${parts[0] ?? ""}`);
                }
            }
            catch (e) {
                const msg = e && e.message ? e.message : String(e);
                errors.push(`Line ${lineNo}: ${msg} -- '${line}'`);
            }
        }
        return errors;
    }
}
// No exports: this file is intended to be used directly in the browser build for the exercise
// End of module
