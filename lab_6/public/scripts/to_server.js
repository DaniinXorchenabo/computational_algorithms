
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
                document.getElementById("task1_result").innerText = data["rectangle"]["sum"];
                document.getElementById("task2_result").innerText = data["trapezoid"]["sum"];
                document.getElementById("task3_result").innerText = data["simson"]["sum"];
                draw_table(data["rectangle"]["history"], "task1_table");
                draw_table(data["trapezoid"]["history"], "task2_table");
                draw_table(data["simson"]["history"], "task3_table");
            }
        }
    }
)