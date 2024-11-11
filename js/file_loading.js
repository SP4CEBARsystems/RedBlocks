function test() {
    console.log("Hey")
    console.log("Again", await loadTextFile('../test.txt'));

    const string = await loadTextFile('../test.txt');

    function loadTextFile(path){
        return new Promise((resolve) => {
            fetch(path)
            .then(response => response.text())
            .then((data) => resolve(data));
        });
    }
}