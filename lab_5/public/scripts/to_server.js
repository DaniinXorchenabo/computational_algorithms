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
            draw_formula([...Object.values(data["task1"])])
            get_data_for_graph([...Object.values(data["task1"])]);
            draw_graph([data["task2"]["lagrangian_graph"], data["task2"]["func_graph"]], "graph_task2")
            draw_graph([data["task3"]["func_graph"], data["task3"]["new_table"]], "graph_task3")

            document.getElementById("task_2_a").innerText = data["task2"]["lagrangian"];
            document.getElementById("task_2_R").innerText = data["task2"]["R_func"] + " <= " + data["task2"]["eps"];
            document.getElementById("task_3_D").innerText = data["task3"]["d_eps"];
            draw_table(data["task3"]["new_table"]);

        }
    }
});