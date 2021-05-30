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
    fill("0")
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

function createDict() {
    // var dict = {};
    var graph = "";

    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var c = table.rows.length;

    var i;
    for (i = 1; i < c; i++) {
        var tr = table.getElementsByTagName("tr")[i];
        var c1 = tr.childElementCount;

        var n = tr.childNodes[0].textContent;
        //dict[n] = [];
        graph += n + ": ";

        for (j = 1; j < c1; j++) {
            //dict[n].push(tr.childNodes[j].textContent);
            m = tr.childNodes[j].textContent

            if (j == (c1 - 1)) {
                graph += m + "-";
            } else {
                graph += m + ", ";
            }
        }

    }

    //console.log(dict);
    console.log(graph)
    document.getElementById("inp").value = graph
    // fetch("create-graph",
    //     {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: graph.toString()
    //     }).then(function (res) {
    //     console.log(res)
    // })

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "create-graph", true);
    // xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // xhr.send(graph.toString());
}

newNode()
newNode()
fill("0")