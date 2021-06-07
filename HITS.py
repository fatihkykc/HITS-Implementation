from graph import read_graph_from_matrix, read_graph_from_animgraph


class HITS:
    def __init__(self, fname):
        self.string = fname

    def parse_str(self):
        self.graph = read_graph_from_matrix(self.string)
        self.node_list = self.graph.nodes

    def parse_json(self):
        self.graph = read_graph_from_animgraph(self.string)
        self.node_list = self.graph.nodes

    def run(self, n_iter):
        for i in range(n_iter):
            [node.update_auth() for node in self.node_list]
            [node.update_hub() for node in self.node_list]
            self.graph.normalize()
        return self.graph.get_auth_hub_list()
