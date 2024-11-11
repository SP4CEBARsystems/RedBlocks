export function toSign(a) {
    return a * 2 - 1;
}

export function sq(a) {
    return a * a;
}

export function setNumber(id, value) {
    setString(id, value.toString());
}

export function setString(id, value) {
    const element = document.getElementById(id);
    if (element === null) {
        return;
    }
    element.innerHTML = value;
}

export function smoothen(a, b, factor) {
    return a * (1 - factor) + b * (factor)
}

export function setNumbers(id, values) {
    let string = "";
    values.forEach((value) => {
        string += value.toString() + " ";
    });
    setString(id, string);
}