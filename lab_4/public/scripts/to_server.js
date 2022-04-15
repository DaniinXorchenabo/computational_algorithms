
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
            document.getElementById('rootCorrectionAs2Division').innerHTML = [...data["rootCorrectionAs2Division"]].reduce((last, i) => last + ", " + i) ;
            document.getElementById('NewtonsMethod').innerHTML = [...data["NewtonsMethod"]].reduce((last, i) => last + ", " + i) ;
        }
    }
});