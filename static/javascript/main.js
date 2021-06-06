// JavaScript source code
function createDict() {
    var graph = "";

    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var c = table.rows.length;

    var i;
    for (i = 1; i < c; i++) {
        var tr = table.getElementsByTagName("tr")[i];
        var c1 = tr.childElementCount;

        // letter
        var n = tr.childNodes[0].textContent;
        graph += n + ": ";

        for (j = 1; j < c1; j++) {
            // must be 0 or 1
            m = tr.childNodes[j].textContent.trim();

            if ((m != "0") && (m != "1")) {
                m = "0";
            }

            if (j == (c1 - 1)) {
                graph += m + "-";
            } else {
                graph += m + ", ";
            }
        }

    }

    document.getElementById("inp").value = graph;
}

function fillScoreTable(index, letter, score, table_id) {
    if (index == 0) {
        var table = document.getElementById(table_id);
        var node = document.createElement('tr');

        var blank = document.createElement('td');
        blank.innerHTML = "";
        blank.style.backgroundColor = "black";

        node.appendChild(blank);
    } else {
        var node = document.getElementById(table_id).getElementsByTagName("tr")[0];
    }

    var headnode = document.createElement('th');
    headnode.innerHTML = letter;
    node.appendChild(headnode);

    var scorenode = document.createElement('td');
    scorenode.innerHTML = parseFloat(score).toFixed(5);
    node.appendChild(scorenode);

    var blank = document.createElement('td');
    blank.innerHTML = "";
    blank.style.backgroundColor = "black";

    node.appendChild(blank);

    if (index == 0) {
        var table = document.getElementById(table_id);
        table.appendChild(node);
    }
}

name_list = document.getElementById("name_list").textContent;
console.log(name_list);

if ((name_list != "[]") && (name_list != "")){
    document.getElementById("scores").style.display = "block";

    name_list = name_list.replace("[", "");
    name_list = name_list.replace("]", "");
    name_list = name_list.replaceAll("'", "");
    name_list = name_list.replaceAll(" ", "");
    name_list = name_list.split(",");

    // ex. name_list =  [ "A", "B" ]

    auth_scores = document.getElementById("auth_list").textContent;
    hub_scores = document.getElementById("hub_list").textContent;

    auth_scores = auth_scores.replace("[", "");
    auth_scores = auth_scores.replace("]", "");
    auth_scores = auth_scores.split(",");

    hub_scores = hub_scores.replace("[", "");
    hub_scores = hub_scores.replace("]", "");
    hub_scores = hub_scores.split(",");

    name_list.forEach(function (item, index) {
        fillScoreTable(index, item, auth_scores[index], "auth_table");
        fillScoreTable(index, item, hub_scores[index], "hub_table");
    })
} else {
    document.getElementById("scores").style.display = "none";
}
