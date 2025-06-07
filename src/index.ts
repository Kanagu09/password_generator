const SYMBOL: string = "!\"#$%&\'()*+,-./:;<=>?@[]\\^_`{}|~";
const EXCEPTION: RegExp = /[0OlI`|]/g;
const LENGTH: number = 16;

let pass = gen();
alert(pass);
navigator.clipboard.writeText(pass);

function gen(): string {
    let str: string = "";
    // Includes lowercase letter / uppercase letter / number / symbol
    const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/g;
    while (str.search(regex) == -1) {
        str = gen_str();
    }
    return str;
}

function gen_str(): string {
    let str: string = "";
    while (str.length != LENGTH) {
        let char: string = gen_char();
        let index: number = char.search(EXCEPTION);
        if (index != -1) continue;
        str += char;
    }
    return str;
}

function gen_char(): string {
    switch (Math.floor(Math.random() * 4)) {
        case 0: return gen_char_from_range('a', 'z');
        case 1: return gen_char_from_range('A', 'Z');
        case 2: return gen_char_from_range('0', '9');
        case 3: return gen_char_from_str(SYMBOL);
        default: return "";
    }
}

function gen_char_from_str(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
}

function gen_char_from_range(start: string, end: string): string {
    const ascii_start: number = start.charCodeAt(0);
    const ascii_end: number = end.charCodeAt(0);
    const num: number = ascii_end - ascii_start + 1;
    const ascii: number = ascii_start + Math.floor(Math.random() * num);
    return String.fromCharCode(ascii);
}
