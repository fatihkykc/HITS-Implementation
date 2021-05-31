// JavaScript source code

a = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
var temp = 0;


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

    updateHeading()
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

function createDict() {
    var graph = "";

    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var c = table.rows.length;

    var i;
    for (i = 1; i < c; i++) {
        var tr = table.getElementsByTagName("tr")[i];
        var c1 = tr.childElementCount;

        var n = tr.childNodes[0].textContent;
        graph += n + ": ";

        for (j = 1; j < c1; j++) {
            m = tr.childNodes[j].textContent

            if (j == (c1 - 1)) {
                graph += m + "-";
            } else {
                graph += m + ", ";
            }
        }

    }

    document.getElementById("inp").value = graph
}

function fillGraph(index, letter, matrix) {
    // add headnode to the first row
    var tr = document.getElementsByTagName("tr")[0];      // Get the first <tr> element in the document
    var headnode = document.createElement('th');
    tr.appendChild(headnode);

    var table = document.getElementById("table").getElementsByTagName('tbody')[0];

    // create new row
    var node = document.createElement('tr');
    var headnode = document.createElement('th');
    var att = document.createAttribute("contenteditable");
    att.value = "true";
    headnode.setAttributeNode(att);
    headnode.innerHTML = letter

    node.appendChild(headnode);
    table.appendChild(node);

    var c = matrix.length;
    // add all cells to the row
    var i;
    for (i = 0; i < c; i++) {
        var node = document.createElement('td');
        var att = document.createAttribute("contenteditable");
        att.value = "true";
        node.setAttributeNode(att);
        node.innerHTML = matrix[i].trim();

        var trInner = document.getElementsByTagName("tr")[index];
        trInner.appendChild(node);
    }

    updateHeading()
}

    
graph_txt = document.getElementById("graph_text").textContent;
if (graph_txt.length == 0) {
    newNode()
    newNode()
} else {
    console.log("graph_text value: ", document.getElementById("graph_text").textContent)
    arr = graph_txt.split("-")

    arr.forEach(function (item, index) {
        var row = arr[index];
        if (row.length != 0) {
            row = row.split(":")
            letter = row[0]
            matrix = row[1].split(",")

            fillGraph(index+1, letter, matrix)
        }
    })
}

