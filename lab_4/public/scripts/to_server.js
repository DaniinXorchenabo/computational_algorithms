
setTimeout(() => {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${document.location.protocol}//${document.location.host}/calculate?n=${10}&a=${0}&b=${10}`, true);

    xhr.send();
    xhr.onreadystatechange = () => { // (3)
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log(xhr.responseText);
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            document.getElementById('rootCorrectionAs2Division').innerHTML = [...data["rootCorrectionAs2Division"]].reduce((last, i) => last + ", " + i) ;
            document.getElementById('NewtonsMethod').innerHTML = [...data["NewtonsMethod"]].reduce((last, i) => last + ", " + i) ;
            document.getElementById('show_ranges').innerHTML = [... Object.entries(data)]
                .filter(([k, v]) => k.toString().startsWith("Интервал ("))
                // .map(([key, val]) => (console.log(key, val), [key, val]))
                .reduce((last,[k, v]) => last + `<h3>${k + " " + v.toString()}</h3>`, "");
            document.getElementById('show_division2method').innerHTML = [... Object.entries(data)]
                .filter(([k, v]) => k.toString().startsWith("Метод половинного деления:"))
                // .map(([key, val]) => (console.log(key, val), [key, val]))
                .reduce((last,[k, v]) => last + `<h3>${k + " " + v.toString()}</h3>`, "");
            document.getElementById('show_Newthon_method').innerHTML = [... Object.entries(data)]
                .filter(([k, v]) => k.toString().startsWith("Метод Ньютона"))
                // .map(([key, val]) => (console.log(key, val), [key, val]))
                .reduce((last,[k, v]) => last + `<h3>${k + " " + v.toString()}</h3>`, "");
        }
    }
});