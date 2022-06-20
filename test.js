function Capitalize(text) {
    const textArray = text.split(" ");
    let capText;
    for (const item of textArray) {
        const nowText = item.charAt(0).toUpperCase() + item.slice(1);
        if (item === textArray[0]) {
            capText = nowText;
        } else {
            capText = capText + " " + nowText;
        }
    }
    return capText;
}

const sentence = Capitalize(' ');
console.log(sentence);