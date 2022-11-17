# Introduction

This document attempts to provide a high-level overview of VTK for those unfamiliar with it. It uses the [VTK Users Guide](https://vtk.org/wp-content/uploads/2021/08/VTKUsersGuide.pdf) as it's source. All credit to the original authors, problems are probably mine.

# System Overview
- System Architecture
    - Low-Level Object Model
    - Rendering Engine
    - Visualization Pipeline

# The Basics
- Creating Simple Models
    - Procedural Source Object
    - Reader Source Object
- Using VTK Interactors
    - vtkRenderWindowInteractor
    - Interactor Styles
- Filtering Data
- Controlling the Camera
    - Instantiation
    - Simple Manipulation
    - View Direction
    - Perspective vs Orthogonal Views
    - Saving/Restoring Camera State
- Controlling Lights
- Controlling 3D Props
    - vtkProp3D
    - Actors
    - Level-Of-Detail Actors
    - Assemblies
    - Volumes
    - vtkLODProp3D
- Texture
- Picking
- Coordinate Systems (vtkCoordinate)
- Controlling vtkActor2D
- Text Annotation
- Special Plotting Classes
    - Scalar Bar
    - X-Y Plots
    - Bounding Box Axes (vtkCubeAxesActor2D)
    - Labeling Data
- Transforming Data
- Antialiasing
- Translucent Polygonal Geometry
- Animation (vtkAnimationScene)

# Visualization Techniques
- vtkDataSet
    - Data Attributes
    - Color Mapping
    - Contouring
    - Glyphing
    - Streamlines
    - Stream Surfaces
    - Cutting
    - Merging
    - Appending
    - Probing
    - Color An Isosurface with Another Scalar
    - Extract Subset of Cells
    - Extract Cells as Polygonal Data
- Visualizing Polygonal Data (vtkPolyData)
- Visualizing Structured Grids (vtkStructuredGrid)
- Visualizing Rectilinear Grids (vtkRectilinearGrid)
- Visualizing Unstructured Grids (vtkUnstructuredGrid)

# Image Processing and Visualization
- vtkImageData
- Subsampling
- Warp
- Image Display
    - Viewer
    - Actor
    - vtkImagePlaneWidget
- Image Sources
    - ImageCanvasSource2D
    - ImageEllipsoidSource
    - ImageGaussianSource
    - ImageGridSource
    - ImageNoiseSource
    - ImageSinusoidSource
- Image Processing
    - Convert Scalar Type
    - Change Spacing, Origin, or Extent
    - Append Images
    - Map Image to Color
    - Image Luminance
    - Histogram
    - Gradient
    - Gaussian Smoothing
    - Image Flip
    - Image Permute
    - Image Mathematics
    - Image Reslice
    - Iterate Through an Image

# Volume Rendering
- vtkVolume
- vtkPiecewiseFunction
- vtkColorTransferFunction
- vtkVolumeProperty (color, opacity, shading)
- Volume Mapper
- Cropping a Volume
- Clipping a Volume
- Controlling Normal Encoding
- Volumetric Ray Casting for vtkImageData
- Fixed Point Ray Casting
- 2D/3D Texture Mapping
- Volumetric Ray Casting for vtkUnstructuredGrid
- ZSweep
- Projected Tetrahedra

# Information Visualization
- Relationships in Tabular Data
- Graph Visualization
- Views and Representations
- Graph Algorithms
- Databases
- Statistics
- Processing Multi-Dimensional Data

# Geospatial Visualization

# Building Models

# Time Varying Data

# Reading and Writing Data
- Readers
    - Data Object
    - Data Set
    - Image and Volume
    - Rectilinear Grid
    - Structured Grid
    - Polygonal Data
    - Unstructured Grid
    - Graph
    - Table
    - Composite Data
- Writers
    - Data Object
    - Data Set
    - Image and Volume
    - Rectilinear Grid
    - Structured Grid
    - Polygonal Data
    - Unstructured Grid
    - Graph
    - Table
    - Composite Data
- Importers
- Exporters
- Creating Hardcopy (saving images)
- Creating Movie Files
- Working with Field Data

# Interaction, Widgets and Selections
- Interactors
    - vtkRenderWindowInteractor
    - Interactor Styles
    - vtkInteractorStyle
    - Adding vtkRenderWindowInteractor Observers
- Widgets
    - Bindings
    - Cursor Management and Highlighting
    - Hierarchies
    - Timers
    - Priorities
    - Point Placers
- Tour of Widgets
    - Measurement
    - Probing or Manipulating Underlying Data
    - Annotation
    - Segmentation / Registration
    - Misc
- Selections
    - Types
        - Index
        - Pedigree ID
        - Global ID
        - Frustum
        - Value
        - Threshold
        - Location
        - Block

# Contributing Code
- Standard Methods: Creating and Deleting Objects
- Copying Objects and Protected Methods
- Using STL
- Managing Include Files
- Writing a VTK Class
- Object Factories

# Managing Pipeline Execution
- Data Arrays - vtkDataArray
- Datasets - vtkDataSet
- Image Data - vtkImageData
- Rectilinear Grids - vtkRectilinearGrid
- Point Sets - vtkPointSet
- Structured Grids - vtkStructuredGrid
- Polygonal Data - vtkPolyData
- Unstructured Grids - vtkUnstructuredGrid
- Cells - vtkCell
- Supporting Objects for Data Sets
    - vtkPoints
    - vtkCellArray
    - vtkCellTypes
    - vtkCellLinks
- Field and Attribute Data
    - vtkFieldData
    - vtkDataSetAttributes
- Selections
    - vtkSelection
    - vtkSelectionNode
- Graphs
    - vtkGraph
    - vtkDirectedGraph
    - vtkUndirectedGraph
    - vtkMutableDirectedGraph and vtkMutableUndirectedGraph
    - vtkDirectedAcyclicGraph
    - vtkTree
- Tables (vtkTable)
- Multi-Dimensional Arrays
    - vtkArray
    - vtkTypedArray
    - vtkDenseArray
    - vtkSparseArray
    - vtkArrayData
# vtkRenderWindow

# Coding Resources
- Object Diagrams
    - Foundations
    - Cells
    - Datasets
    - Topology and Attribute Data
    - Pipeline
    - Sources and Filters
    - Mappers
    - Graphics
    - Volume Rendering
    - Imaging
    - OpenGL Renderer
    - Picking
    - Transformation Hierarchy
    - Widgets and Interaction Style
- Summary of Filters
    - Source Objects
    - Imaging Filters
    - Visualization Filters
    - Mapper Objects
    - Actor (Prop) Objects
    - Views and Informatics
- VTK File Formats

