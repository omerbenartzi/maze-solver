from flask import Flask, request, jsonify, json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class UnionFind:
    def __init__(self, n):
        self.up = []
        self.weight = []
        self.height = []
        self.numOfSets = n
    
        for i in range(n):
            self.up.append(-1)
            self.weight.append(1)
            self.height.append(0)

    def find(self, i):
        while self.up[i] != -1:
            i = self.up[i]
        return i

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)

        if root_i == root_j:
            return
        
        if self.weight[root_i] > self.weight[root_j]:
            
            self.up[root_j] = root_i
            self.weight[root_i] = self.weight[root_i] + self.weight[root_j]
            self.height[root_i] = self.height[root_i] + self.height[root_j] + 1
        else:
            self.up[root_i] = root_j
            self.weight[root_j] = self.weight[root_i] + self.weight[root_j]
            self.height[root_j] = self.height[root_i] + self.height[root_j] + 1

        self.numOfSets -= 1

class Node:
    def __init__(self, i, j):
        self.i = i
        self.j = j
        self.label = 0

    def __str__(self):
        return str(self.i ) + " " + str(self.j)

class Graph:
    def __init__(self):
        self.vertices = {}

    def add_vertice(self, v):
        self.vertices[v] = []

    def add_edge(self, v, u):
        self.vertices[v].append(u)

    def get_vertice(self, i, j):
        for v in self.vertices:
            if v.i == i and v.j == j:
                return v

        return None

    def bfs(self, node):
        s = self.get_vertice(node.i, node.j)
        visited = {}
        queue = []

        v_c = dict(self.vertices)
        queue.append(s)

        while len(queue) > 0:
            s = queue.pop(0)
            visited[s] = 0

            for v in v_c[s]:
                if v not in visited:
                    queue.append(v)
                    v.label = s.label + 1
            v_c[s] = []


def create_union(maze):
    union = UnionFind(len(maze) * len(maze[0]))
   
        
    for i, row in enumerate(maze):
        for j, cell in enumerate(row):
            if j + 1 < len(maze[0]):
                if (cell == maze[i][j+1]):
                    union.union(pixel_to_id(maze, i, j), pixel_to_id(maze, i, j + 1))
            if i + 1 < len(maze):
                if (cell == maze[i+1][j]):
                    union.union(pixel_to_id(maze, i, j), pixel_to_id(maze, i + 1, j))
    return union

def create_graph(maze, union, group):
    g = Graph()

    for i, row in enumerate(maze):
        for j, cell in enumerate(row):
            if union.find(pixel_to_id(maze, i, j)) == union.find(group):
                g.add_vertice(Node(i, j))

    for v in g.vertices:
        for u in g.vertices:
            if (v != u):
                if (v.i == u.i and v.j == u.j + 1) or (v.i == u.i + 1 and v.j == u.j):
                    g.add_edge(v, u)
                    g.add_edge(u, v)

    return g

def solve(maze):
    start_i = -1
    start_j = -1
    end_i = -1
    end_j = -1,
    for i, row in enumerate(maze):
        for j, cell in enumerate(row):
            if cell == 1:
                if start_i == -1:
                    start_i = i
                    start_j = j
                    maze[i][j] = 0
                elif end_i == -1:
                    end_i = i
                    end_j = j
                    maze[i][j] = 0

    union = create_union(maze)
    has_sol = union.find(pixel_to_id(maze,start_i, start_j)) == union.find(pixel_to_id(maze, end_i, end_j))
    if not has_sol:
        maze[start_i][start_j] = 1
        maze[end_i][end_j] = 1
        return maze
    

    g = create_graph(maze, union, pixel_to_id(maze, end_i, end_j))
    g.bfs(Node(start_i, start_j))

    # Draw path
    v = g.get_vertice(end_i, end_j)
    visited = {}
    while not (v.i == start_i and v.j == start_j):
        visited[v] = 0
        vert = g.vertices[v]
        min_v = vert[0]
        for u in vert:
            if u.label < min_v.label:
                if u not in visited:
                    min_v = u

        maze[v.i][v.j] = 3
        visited[min_v] = 0
        v = min_v

    maze[start_i][start_j] = 1
    maze[end_i][end_j] = 1

    return maze

def pixel_to_id(maze, i, j):
    return len(maze[i]) * i + j

@app.route('/api/solve', methods=['POST'])
@cross_origin()
def get_quote():
    data = request.json
    solved_maze = solve(data)
    return jsonify(solved_maze)


if __name__ == '__main__':
    app.run('0.0.0.0', 5000)