// JavaScript source code

a = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

var temp_str = document.getElementById("temp").textContent;
if (temp_str.length == 0) {
    var temp = 0;
} else {
    var temp = parseInt(temp_str);
}

function updateHeading() {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var c = table.rows.length;

    var tr1 = table.getElementsByTagName("tr")[0];

    var i;
    for (i = 1; i < c; i++) {
        var tr = table.getElementsByTagName("tr")[i];
        var x = tr.childNodes[0].textContent;

        tr1.childNodes[i + 2].innerHTML = x;
    }
}

function newNode() {
    var tr = document.getElementsByTagName("tr")[0];      // Get the first <tr> element in the document
    var headnode = document.createElement('th');
    tr.appendChild(headnode);

    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var c = table.rows.length;

    // add new cell to end of the all rows
    var i;
    for (i = 1; i < c; i++) {
        var node = document.createElement('td');
        var att = document.createAttribute("contenteditable");
        att.value = "true";
        node.setAttributeNode(att);

        var trInner = document.getElementsByTagName("tr")[i];
        trInner.appendChild(node);
    }

    // create new row
    var node2 = document.createElement('tr');

    var headnode2 = document.createElement('th');
    var att2 = document.createAttribute("contenteditable");
    att2.value = "true";
    headnode2.setAttributeNode(att2);

    var letter = a[temp];
    headnode2.innerHTML = letter;
    temp += 1;
    if (temp == 26) {
        temp = 0;
    }
    document.getElementById("temp").innerHTML = temp;
    document.getElementById("inp2").value = temp;

    node2.appendChild(headnode2);

    var x = tr.childElementCount;
    for (i = 0; i < x - 1; i++) {
        var innerNode = document.createElement('td');
        var att2 = document.createAttribute("contenteditable");
        att2.value = "true";
        innerNode.setAttributeNode(att2);

        node2.appendChild(innerNode);
    }
    table.appendChild(node2);

    updateHeading("table")
    fill("0", false)
}

function fill(val, all) {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var c = table.rows.length;

    var i;
    for (i = 1; i < c; i++) {
        var tr = table.getElementsByTagName("tr")[i];
        var c1 = tr.childElementCount;

        for (j = 1; j < c1; j++) {
            if (val == "0") {
                if ((all) || (tr.childNodes[j].textContent != "1")) {
                    tr.childNodes[j].innerHTML = "0";
                }
            } else {
                if ((all) || (tr.childNodes[j].textContent != "0")) {
                    tr.childNodes[j].innerHTML = "1";
                }
            }
        }
    }
}

function delRow() {
    var index = document.getElementById("delIndex").value;

    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var c = table.rows.length;

    if ((index != 0) && (index < c)) {
        // delete column
        var i;
        for (i = 0; i < c; i++) {
            var tr = document.getElementsByTagName("tr")[i];
            tr.deleteCell(i);
        }

        // delete row
        table.getElementsByTagName("tr")[index].remove();

        updateHeading();
        document.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML = "";
    }
}

function reset() {
    var index = 1;

    var c = arr.length;

    var i;
    for (i = 0; i < c; i++) {
        delRow();
    }

    temp = 0;
    document.getElementById("temp").innerHTML = temp;
    document.getElementById("inp2").value = temp;
}

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
    document.getElementById("inp2").value = temp;
}

function fillTable(index, letter, matrix) {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];

    // add headnode to the first row
    var tr = table.getElementsByTagName("tr")[0];      // Get the first <tr> element
    var headnode = document.createElement('th');
    tr.appendChild(headnode);

    // create new row
    var node = document.createElement('tr');
    var headnode2 = document.createElement('th');

    var att = document.createAttribute("contenteditable");
    att.value = "true";
    headnode2.setAttributeNode(att);
    headnode2.innerHTML = letter;

    node.appendChild(headnode2);
    table.appendChild(node);

    // matrix = [0, 1, 0, 0, 1]

    var c = matrix.length;
    // add all cells to the row
    var i;
    for (i = 0; i < c; i++) {
        var node2 = document.createElement('td');
        var att = document.createAttribute("contenteditable");
        att.value = "true";
        node2.setAttributeNode(att);
        node2.innerHTML = matrix[i].trim();

        var trInner = table.getElementsByTagName("tr")[index];
        trInner.appendChild(node2);
    }

    updateHeading()
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
    //scorenode.innerHTML = parseFloat(score);
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

graph_txt = document.getElementById("graph_text").textContent;
if (graph_txt.length == 0) {
    newNode();
    newNode();
} else {
    document.getElementById("scores").style.display = "block";

    arr = graph_txt.split("-");
    name_list = document.getElementById("name_list").textContent;

    name_list = name_list.replace("[", "");
    name_list = name_list.replace("]", "");
    name_list = name_list.replaceAll("'", "");
    name_list = name_list.replaceAll(" ", "");
    name_list = name_list.split(",");

    // ex. arr =        [ "A: 1, 1, 0", "B: 1, 1, 0", "C: 0, 0, 0", "" ]
    // ex. name_list =  [ "A", "B" ]

    // if there are nodes that do not have an outbound connection to other nodes
    if ((arr.length - 1) != name_list.length) {
        check = true;
    }
    else {
        check = false;
    }

    var i = 0;
    arr.forEach(function (item, index) {
        var row = arr[index];
        if (row.length != 0) {
            // {"0":{"2":1},"1":{"2":0,"3":0},"2":{"1":1},"3":{"1":1}}

            // ex. row: A: 1, 1, 0
            // ex. row: C: 0, 0, 0

            row = row.replaceAll(" ", "");
            row = row.split(":");
            letter = row[0];
            matrix = row[1].split(",");

            fillTable(index + 1, letter, matrix, "table");

            // auth_list = [0.3903882032022076, 0.3903882032022076, 0.21922359359558485]
            // hub_list = [0.5615528128088302, 0.4384471871911697, 0.0]

            // auth_list = [0.5, 0.5]
            // [0.5, 0.5]

            // if all zero
            if (check && (!name_list.includes(letter))) {
                fillScoreTable(index, letter, "0", "auth_table");
                fillScoreTable(index, letter, "0", "hub_table");
            } else {
                // matrix = [0.2, 0.2, 0.2]

                auth_scores = document.getElementById("auth_list").textContent;
                hub_scores = document.getElementById("hub_list").textContent;

                auth_scores = auth_scores.replace("[", "");
                auth_scores = auth_scores.replace("]", "");
                auth_scores = auth_scores.split(",");

                hub_scores = hub_scores.replace("[", "");
                hub_scores = hub_scores.replace("]", "");
                hub_scores = hub_scores.split(",");

                fillScoreTable(index, letter, auth_scores[i], "auth_table");
                fillScoreTable(index, letter, hub_scores[i], "hub_table");

                i += 1;
            }
        }
    })
}
