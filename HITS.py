from graph import init_graph2, init_graph3


class HITS:
    def __init__(self, fname):
        self.string = fname

    def parse_str(self):
        self.graph = init_graph2(self.string)
        self.node_list = self.graph.nodes

    def parse_json(self):
        self.graph = init_graph3(self.string)
        self.node_list = self.graph.nodes

    def run(self, n_iter):
        for i in range(n_iter):
            [node.update_auth() for node in self.node_list]
            [node.update_hub() for node in self.node_list]
            self.graph.normalize()
        return self.graph.get_auth_hub_list()

# auth_list, hub_list = HITS('g1.txt').run(n_iter=100)
# print(auth_list)
# print(hub_list)
