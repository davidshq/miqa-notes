https://dash.plotly.com/vtk/intro
- "In VTK, we have 3 main types of objects that are key for understanding its visualization principals. First we have the View which is just a container for any Representation of DataSource that you want to see."

# View
- "The view is a 3D View that can do Geometry rendering for meshes or Volume rendering for 3D images. The view can be configured to act as a 2D one when using parallel projection and preventing rotation when interacting with it."
- "For the interactorSettings we expect a list of mouse event type linked to an action. The example below is what is used as default:"

# Representation
- "A representation is responsible for converting a DataSource into something visual that will be available inside the View."
- "GeometryRepresentation: The geometry representation will expect a mesh and will render it as geometry rendering (think triangle sets)."
- "VolumeRepresentation: The volume representation will expect a 3D image and will render it using a Volume Rendering technique that will let you see through (foggy object)."
- "SliceRepresentation: The slice representation will expect a 3D image and will slice it along a given axis."
- "Representations should be put inside the children of a View."

# DataSource
- "A DataSource can be many things but it is mostly something that can produce data. In other words it could be a dataset or a filter that consume some data and generate new ones or even a reader that will read somekind of input (file, url...) and produce some data."
- "In dash_vtk we have several objects that falls into that category. The list below gives you an overview of those but more details information can be found later."
    - "Algorithm: Allows you to instantiate a vtk.js algorithm that could either be a filter (vtkWarpScalar) or a source (vtkLineSource, vtkConeSource, vtkPlaneSource, vtkSphereSource, vtkCylinderSource)."
    - "ImageData: What we've been calling a 3D image so far. This element will let you define each piece that comprises a 3D image."
    - "PolyData: A surface mesh (points, triangles...). This element will let you define the various piece of a mesh."
    - "Reader: Similar to an Algorithm except that readers have a common API and this element lets you leverage those."
    - "ShareDataSet: Allows you to capture any DataSource and make it available in another processing pipeline or representation without duplicating the data that gets sent from the server to the client."
    - "Mesh: Similar to PolyData except that it has a Python helper function to help you map a vtkDataSet into a single property of the Mesh."
    - "Volume: Similar to ImageData except that it has a Python helper function to help you map a vtkImageData into a single property of the Volume."

https://dash.plotly.com/vtk/structure
# PolyData
- "A PolyData is a surface mesh composed of points and cells. The cells can be:"
    - "verts: Vertex or point to show as a tiny square on the screen"
    - "lines: Lines that connect points into a one segment or multi segment line"
    - "polys: Polygons which are convex surfaces such as triangles, rectangles, circles..."
    - "strips: Triangle strips efficiently combine triangles together with no repeated points just for connectivity"
...

# Fields
- "Having a grid is a good start, but most likely you would want to attach a field to a given mesh so you can start looking at it in a 3D context."
- "Fields are arrays that map to either Points or Cells. They could be scalars or vectors of different size."
