// Plotly.react('my_graph_time', [], layout);

const updating_graph_data = ([key, value, default_obj]) => {
    console.log(key, value, default_obj)
    return Object.assign(default_obj, {
        x: [...Object.keys(value)].map(Number),
        y: [...Object.values(value)],
        name: key
    })
}


const draw_graph = (data_for_graph, sort_data, data_from_server, graph_text = "") => {

    const get_data_for_showing_graph = (formatted_data, flag) => {
        return updating_graph_data([graph_text, formatted_data, data_for_graph])

    }

    const layout_generator = (graph_name) => {
        return {
            title: graph_name,
            uirevision: 'true',
            xaxis: {autorange: true},
            yaxis: {autorange: true}
        };
    }

    const graph_drawer = (graph_id, graph_name, formatted_data, default_obj) => {

        const layout = layout_generator(graph_name);

        let local_data = [updating_graph_data([graph_name, formatted_data, default_obj])];
        console.log(local_data);
        layout.title = graph_name;
        layout.xaxis.autorange = true;
        layout.yaxis.autorange = true;

        Plotly.react(graph_id, local_data, layout);
    }

    let graph_data =
        {mode: 'lines', line: {color: "#fc7e0d"}};

    // const raw_data = data_for_graph;
    // let formatted_data = raw_data.concat(graph_data);
    // console.log(formatted_data);
    // console.log("***", raw_data)
    graph_drawer("my_graph", "", data_for_graph, graph_data);



}