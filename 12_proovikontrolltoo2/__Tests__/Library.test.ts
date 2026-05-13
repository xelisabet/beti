import { Library, Book, DVD } from "./Library";

// Test 1: Kontrollib baasfunktsionaalsust (kas raamatut saab üldse lisada)
test("add book successfully", () => {
    const lib = new Library();
    lib.addItem(new Book("B1", "The Hobbit", "J.R.R. Tolkien", 1937, 310, "978-0-261-10221-7"));
    expect(lib.getAll().length).toBe(1);
});

// Test 2: Kontrollib meie lisatud turvaelementi (ID unikaalsus)
test("prevent duplicate IDs", () => {
    const lib = new Library();
    lib.addItem(new Book("B1", "Book 1", "Author", 2020, 100, "123"));
    
    // Ootame, et sama ID-ga eseme lisamisel viskaks programm veateate (toThrow)
    expect(() => {
        lib.addItem(new Book("B1", "Book 2", "Author 2", 2021, 200, "456"));
    }).toThrow();
});

// Test 3: Kontrollib laiendusena loodud otsingufunktsiooni tööd
test("search items by title or author", () => {
    const lib = new Library();
    lib.addItem(new Book("B1", "Clean Code", "Robert C. Martin", 2008, 464, "978-0132350884"));
    lib.addItem(new DVD("D1", "Inception", "Christopher Nolan", 2010, 148));

    // 1. Otsime pealkirja osalise teksti järgi
    const searchResult = lib.search("Code");
    expect(searchResult.length).toBe(1);
    expect(searchResult[0]?.getTitle()).toBe("Clean Code");

    // 2. Otsime autori järgi ja veendume, et suured/väikesed tähed ei loe ("nolan" vs "Nolan")
    const searchResult2 = lib.search("nolan");
    expect(searchResult2.length).toBe(1);
    expect(searchResult2[0]?.getTitle()).toBe("Inception");
});