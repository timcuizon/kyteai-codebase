class Shoelace_Algorithm():
  def __init__(self, vertices):
      self.vertices = vertices

  def calculate_polygon_surface_area(self):
      n = len(self.vertices)
      area = 0

      for i in range(n):
        x1, y1 = self.vertices[i]
        x2, y2 = self.vertices[(i + 1) % n]  # Next vertex (wraps around to the first vertex)
        area += (x1 * y2 - x2 * y1)

      total_area = 0.5 * abs(area)

      return total_area

  def calculate_polygon_width_height(self):
        x_values = [vertex[0] for vertex in self.vertices]
        y_values = [vertex[1] for vertex in self.vertices]

        width = max(x_values) - min(x_values)
        height = max(y_values) - min(y_values)

        return width, height

# ==Implementation
# shoelace_algorithm = Shoelace_Algorithm(vertices)
# shoelace_algorithm.calculate_polygon_surface_area()