/**
Library System
You are building a digital catalogue for a local library. The library holds different types of items — currently books and DVDs — and staff need to be able to manage them through a simple web application.
What the system should do:
    The system must be able to store and manage library items. Each item has basic information such as an ID, title, and year. Books and DVDs have their own additional details. The system should be able to display a readable summary of any item.
    The library catalogue itself should allow staff to add new items and view everything currently stored.
    Items need to be saved and restored between sessions — so the system should support exporting the catalogue to a file and loading it back. If a file contains invalid data, the system should handle it without crashing.
    Finally, build a web page where staff can add items, browse the catalogue, load a saved file, and download the current catalogue.
Extension
    Once the core system works, improve it in one way of your choice. This could be anything that makes the system more useful or robust — for example, searching for items, adding a new item type, or preventing invalid input.
Requirements:
    Use classes
    Write tests alongside your code as you build
*/
class LibraryItem {
    id: string;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean; // UUS LAIENDUS: Näitab, kas ese on hetkel välja laenutatud

    constructor(id: string, title: string, author: string, year: number, isBorrowed: boolean = false) {
        // Kontrollime, et kohustuslikud tekstiväljad poleks tühjad tühikud
        if (id.trim() === "") throw new Error("ID cannot be empty");
        if (title.trim() === "") throw new Error("Title cannot be empty");
        
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = isBorrowed; // Vaikimisi on uus ese raamatukogus kohal (false)
    }

    // Standardne komplekt "getter" meetodeid andmete kättesaamiseks
    getId(): string { return this.id; }
    getTitle(): string { return this.title; }
    getAuthor(): string { return this.author; }
    getYear(): number { return this.year; }
    
    /**
     * UUS LAIENDUS: Vahetab laenutuse olekut. 
     * Kui oli kohal, märgib laenutatuks ja vastupidi.
     */
    toggleBorrow(): void {
        this.isBorrowed = !this.isBorrowed;
    }

    /**
     * Tagastab eseme kohta loetava kokkuvõtte ekraanil kuvamiseks.
     */
    getSummary(): string {
        const status = this.isBorrowed ? " [LAENUTATUD]" : " [SAADAVAL]";
        return `[Item] ${this.title} (${this.year})${status}`;
    }

    /**
     * Muudab objekti andmed tekstireaks, mida saab faili salvestada.
     * Väljad eraldatakse püstkriipsuga (|).
     */
    toFillLine(): string {
        return `ITEM|${this.id}|${this.title}|${this.author}|${this.year}|${this.isBorrowed}`;
    }
}

/**
 * Raamatu klass, mis on LibraryItem-i alamklass (pärineb sellest).
 */
class Book extends LibraryItem {
    pages: number;
    ISBN: string;

    constructor(id: string, title: string, author: string, year: number, pages: number, ISBN: string, isBorrowed: boolean = false) {
        // super() kutsub välja LibraryItem-i constructor-i, et täita baasandmed
        super(id, title, author, year, isBorrowed);
        
        // Valideerime raamatule spetsiifilised andmed
        if (!Number.isFinite(pages) || pages <= 0) throw new Error("Pages must be a positive number");
        this.pages = pages;
        this.ISBN = ISBN;
    }

    // Kirjutame baasklassi getSummary üle, et kuvada raamatu lisainfot
    getSummary(): string {
        const status = this.isBorrowed ? " [LAENUTATUD]" : " [SAADAVAL]";
        return `[Raamat] "${this.title}" - ${this.author} (${this.year}), ${this.pages} lk.${status}`;
    }

    // Kirjutame salvestusrea üle, et ka leheküljed ja ISBN faili jõuaksid
    toFillLine(): string {
        return `BOOK|${this.id}|${this.title}|${this.author}|${this.year}|${this.pages}|${this.ISBN}|${this.isBorrowed}`;
    }
}

/**
 * DVD klass, mis on samuti LibraryItem-i alamklass.
 */
class DVD extends LibraryItem {
    duration: number; // Kestvus minutites

    constructor(id: string, title: string, director: string, year: number, duration: number, isBorrowed: boolean = false) {
        // Direktor läheb baasklassi "author" väljale
        super(id, title, director, year, isBorrowed);
        
        if (!Number.isFinite(duration) || duration <= 0) throw new Error("Duration must be a positive number");
        this.duration = duration;
    }

    getSummary(): string {
        const status = this.isBorrowed ? " [LAENUTATUD]" : " [SAADAVAL]";
        return `[DVD] "${this.title}" - ${this.author} (${this.year}), Kestvus: ${this.duration} min.${status}`;
    }

    toFillLine(): string {
        return `DVD|${this.id}|${this.title}|${this.author}|${this.year}|${this.duration}|${this.isBorrowed}`;
    }
}

/**
 * Raamatukogu peaklass, mis haldab esemete nimekirja, otsingut ja failide laadimist.
 */
class Library {
    items: LibraryItem[] = [];

    constructor() {
        this.items = [];
    }

    /**
     * Lisab uue eseme raamatukokku.
     * TURVALISUSE LAIENDUS: Kontrollib, et sama ID-ga asja poleks juba olemas.
     */
    addItem(item: LibraryItem): void {
        if (this.items.some(i => i.getId() === item.getId())) {
            throw new Error(`Item with ID "${item.getId()}" already exists!`);
        }
        this.items.push(item);
    }

    getAll(): LibraryItem[] {
        return this.items;
    }

    /**
     * UUS LAIENDUS: Otsingusüsteem.
     * Filtreerib esemeid pealkirja või autori nime järgi (tõstutundetu).
     */
    search(query: string): LibraryItem[] {
        const q = query.toLowerCase().trim();
        if (q === "") return this.items; // Kui otsing on tühi, tagasta kõik
        
        return this.items.filter(item => 
            item.getTitle().toLowerCase().includes(q) || 
            item.getAuthor().toLowerCase().includes(q)
        );
    }

    /**
     * Muudab kogu raamatukogu sisu üheks pikaks tekstiks (iga ese uuel real),
     * et seda saaks failina alla laadida.
     */
    toText(): string {
        return this.items.map((i) => i.toFillLine()).join("\n");
    }

    /**
     * Loeb tekstifailist sisse salvestatud raamatukogu andmed.
     * Tagastab nimekirja vigadest, kui mõni rida oli vigane.
     */
    loadFromText(text: string): string[] {
        const lines = text.split(/\r?\n/);
        const errors: string[] = [];
        this.items = []; // Tühjendame praeguse nimekirja, et faili andmed ei seguneks vanadega
        let lineNo = 0;

        for (const raw of lines) {
            lineNo += 1;
            const line = raw.trim();
            if (line === "") continue; // Hüppame tühjadest ridadest üle
            
            try {
                // Tükeldame rea püstkriipsude kohalt ja eemaldame tühikud
                const parts = line.split("|").map((p) => p.trim());
                const type = (parts[0] ?? "").toUpperCase();
                
                if (type === "BOOK") {
                    if (parts.length < 8) throw new Error("Not enough fields for BOOK");
                    const isBorrowed = parts[7] === "true"; // Teeme tekstist tagasi boolean väärtuse
                    this.addItem(new Book(parts[1]!, parts[2]!, parts[3]!, Number(parts[4]), Number(parts[5]), parts[6]!, isBorrowed));
                } else if (type === "DVD") {
                    if (parts.length < 7) throw new Error("Not enough fields for DVD");
                    const isBorrowed = parts[6] === "true";
                    this.addItem(new DVD(parts[1]!, parts[2]!, parts[3]!, Number(parts[4]), Number(parts[5]), isBorrowed));
                } else if (type === "ITEM") {
                    if (parts.length < 6) throw new Error("Not enough fields for ITEM");
                    const isBorrowed = parts[5] === "true";
                    this.addItem(new LibraryItem(parts[1]!, parts[2]!, parts[3]!, Number(parts[4]), isBorrowed));
                } else {
                    throw new Error(`Unknown type: ${parts[0] ?? ""}`);
                }
            } catch (e: any) {
                // Kui reas oli viga (nt tekst numbri kohal), salvestame vea, aga programm ei jookse kokku
                errors.push(`Line ${lineNo}: ${e.message}`);
            }
        }
        return errors;
    }
}