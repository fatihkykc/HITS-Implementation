import re, json

import numpy as np


class Node:
    def __init__(self, name):
        self.name = name
        self.directed_from = []
        self.directing_to = []
        self.auth = 1
        self.hub = 1

    def direct_to(self, directed_node):
        if (directed_node.name not in self.directing_to):
            self.directing_to.append(directed_node)

    def be_directed(self, directing_node):
        if (directing_node.name not in self.directed_from):
            self.directed_from.append(directing_node)

    def update_auth(self):
        self.auth = sum([node.hub for node in self.directed_from])

    def update_hub(self):
        self.hub = sum([node.auth for node in self.directing_to])


class Graph:
    def __init__(self):
        self.nodes = []

    def add_relation(self, directing_node, directed_node):
        directing_node = self.find(directing_node)
        directed_node = self.find(directed_node)

        directing_node.direct_to(directed_node)
        directed_node.be_directed(directing_node)

    def find(self, name):
        if (name not in [node.name for node in self.nodes]):
            new_node = Node(name)
            self.nodes.append(new_node)
            return new_node
        else:
            return [node for node in self.nodes if node.name == name][0]

    def display(self):
        for node in self.nodes:
            print(f'{node.name} directs to {[directed.name for directed in node.directing_to]}')

    def get_auth_hub_list(self):
        auth_list = [node.auth for node in self.nodes]
        hub_list = [node.hub for node in self.nodes]
        name_list = [node.name for node in self.nodes]

        return auth_list, hub_list, name_list

    def normalize(self):
        auths = sum([node.auth for node in self.nodes])
        hubs = sum([node.hub for node in self.nodes])

        for node in self.nodes:
            node.auth /= auths
            node.hub /= hubs


def init_graph(fname):
    with open(fname) as f:
        lines = f.readlines()

    graph = Graph()

    for line in lines:
        [parent, child] = line.strip().split(',')
        graph.add_relation(parent, child)
    # graph.sort_nodes()

    return graph


def init_graph2(graphstr):
    graph = Graph()
    lines = re.split('-', graphstr)[:-1]
    print(lines)
    parent_list = [line[0] for line in lines]
    for i in range(len(lines)):
        for j in range(len(lines[i][3:].strip().split(','))):
            if int(lines[i][3:].strip().split(',')[j]) == 1:
                graph.add_relation(parent_list[i], parent_list[j])
    graph.display()
    return graph


def init_graph3(graphstr):
    graph = Graph()
    dct = json.loads(graphstr)
    for source in dct:
        for target in dct[source]:
            if dct[source][target] == 1:
                print(source, target)
                graph.add_relation(source, target)
    graph.display()
    return graph
# graph = init_graph('g1.txt')
# graph.display()
