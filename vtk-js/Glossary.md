# Algorithms
VTK provides a number of algorithms which can transform data in various ways.

## Marching Cubes (vtkImabgeMarchingCubes)
- "A filter that takes as input images (e.g., 3D image region) and generates on output one or more isosurfaces."[6]
- See also: https://en.wikipedia.org/wiki/Marching_cubes

# Annotations
Text or graphics that are placed in the overlay plane of a render. See VTK Users Guide 11th, pg. 63 and following.
    - An overlay plane is placed on top of the rendering thus it does not interfere with the rendered object.

# Data Set
"In vtk a dataset consists of a structure (geometry and topology) and attribute data. The structure is defined implicitly or explicitly as a collection of cells. The geometry of the structure is contained in point coordinates plus the cell interpolation functions. The topology of the dataset structure is defined by cell types and how the cells share their defining points."[4]

# Fields
- "Fields are arrays that map to either Points or Cells. They could be scalars or vectors of different size."[12]

# Objects

## Attributes
- "We call the state of an object its attributes (also called instance variables ) and define its behavior by the operations that can be applied to it."[7]
- "Attributes have a name, a data type, and a data value. The data type of an attribute may be a primitive type in the programming language (such as a char or float in C++), or another object."[7]

## Class
- "Objects that share the same properties can be grouped using the process of classification. An object class, usually just called a class, specifies the properties that all objects in the class have."[7]

## Abstract Class
- "Classes that exist only to act as superclasses for their subclasses are called abstract classes."[7]
- "Instance creation of an abstract class is generally prohibited."[7] 
- "Abstract classes are useful for gathering attributes and methods that all subclasses will use."[7]
- "They can also define protocols for behavior for their subclasses."[7]

### Subclass
- In C++ these are called derived classes.
- Inherits and the properties from the superclass.
- It can add new properties to the subclass as well as override existing properties from the superclass.

### Superclass
- In C++ these are called base classes.

## Delegation
- "Using delegation, an object applies operations to one of its attributes that is an object."[7]

## Inheritance
- "Inheritance can be derived top-down using a process called specialization, or it can be created bottom-up, combining similar classes during a process called generalization."[7]

## Instance
- A concrete implementation of a class as an object.

## Instantiation
- The process of initializing an object from a class, includes defining initial state.

## Methods
- "The implementation of an operation for a particular class is called a method."[7]
- See Operations.

## OOP Models

### Object Model
- "The object model identifies each object in the system, its properties, and its relationships to other objects in the system. For most software systems, the object model dominates the design."[8]

### Dynamic Model
- "The dynamic model details the sequences of events and time dependencies of the system. OMT uses state diagrams to model system dynamics. Dynamic models are frequently used to design control systems and user interfaces."[8]
- "Our visualization system has limited sequence and control aspects, so we will not dwell on state diagrams."[8]

### Functional Model
- "The functional model shows how data flows through the system and how processes and algorithms transform the data. It also shows functional dependencies between processes."[8]

## Objects
- Unlike most OOP software that combines data and operations into a single object, VTK generally separates data and operations into two separate objects.[10]

## Operations
- "Operations are functions or transformations that can be applied to an object. Operations define the behavior of the object. The operations for a particular object are implemented in procedures we call methods."[7]

## Polymorphism
- "When an operation with the same name is applied to objects of different classes we call the operation polymorphic."[7]

## Properties
- The combination of attributes and operations (methods).[7]

## Data Objects
- "Data objects represent information. Data objects also provide methods to create, access, and delete this information."[2]

# Mapper Objects
- "Mapper objects correspond to the **sinks** in the functional model. Mapper objects require one or more input **data objects** and terminate the **visualization pipeline** data flow. Usually mapper objects are used to convert data into **graphical primitives**, but they may write out data to a file or interface with another software system or devices. Mapper objects that write data to a computer file are termed **writer objects**."[1]

## Process Objects
- "Process objects operate on input data to generate output data. A process object either derives new data from its inputs, or transforms the input data into a new form."[1]
- "Process objects are further characterized as **source objects**, **filter objects**, or **mapper objects**. This categorization is based on whether the objects initiate, maintain, or terminate visualization data flow."[1]

## Source Objects
- "Source objects interface to external data sources or generate data from local parameters."[1]
    - "Source objects that generate data from local parameters are called **procedural objects**."[1]
    - "Source objects that interface to external data are called **reader objects** since the external file must be read and converted to an internal form."[1]

### Data Source Objects
- "Processes that create data with no input are called data source objects, or simply sources."[9]

## PolyData
- "A PolyData is a surface mesh composed of points and cells. The cells can be:"[12]
    - "verts: Vertex or point to show as a tiny square on the screen"[12]
    - "lines: Lines that connect points into a one segment or multi segment line"[12]
    - "polys: Polygons which are convex surfaces such as triangles, rectangles, circles..."[12]
    - "strips: Triangle strips efficiently combine triangles together with no repeated points just for connectivity"[12]

## Filter Objects
- "Processes with both an input and an output are called filters."[9]
- "'Filters' are VTK components that receive data from other components, modify the data in some way, and then deliver the modified data as output to be used by other components. Filters may extract some portion of a large data set, subsample data sets to coarser resolution, interpolate data sets to a finer resolution, merge multiple inputs into a combined output, split compound inputs into component parts, or a wide variety of other transformations."[5]
- "So if the output of a component is being used as the input to an actor, then it is a mapper, but if the output is being read by some other type of component ( either a mapper or another filter ), then it is a filter."[5]

# Piecewise Function
Controls the appearance of a 3D volume of scalar values. See VTK Users Guide 11th, pg. 144 and following.
    - See [Piecewise on Wikipedia](https://en.wikipedia.org/wiki/Piecewise) for understanding the concept.

# Producers

## TrivialProducer (vtkTrivialProducer)
 "Producer for stand-alone data objects...allows data objects that are hand-constructed in a program without another vtk producer to be connected."
    - The use of "hand-constructed" may be a bit misleading, this could include medical scans which were created by CT/MRI. The general concept being something that was constructed into its final data object form without needing to run through various producers in VTK to do so.
    - See [VTK documentation on vtkTrivialProducer](https://vtk.org/doc/nightly/html/classvtkTrivialProducer.html#details).
    - See ParaView documentation on [paraview.simple.TrivialProducer](https://kitware.github.io/paraview-docs/v5.9.0/python/paraview.simple.TrivialProducer.html) from some explanation of the concept.

# Proxies
See pg. 10 and following in [ParaView Scripting with Python](https://itk.org/Wiki/images/f/f9/Servermanager2.pdf). [Refactoring Guru's Proxy article](https://refactoring.guru/design-patterns/proxy) is also helpful.
    - Thus when one sees something like `View2DProxy` one can read it as "a Proxy for the View2D object".

# Representations
- "A representation is responsible for converting a DataSource into something visual that will be available inside the View."[11]
- "Representations should be put inside the children of a View."[11]

# Sinks
- "Processes that consume data with no output are called sinks (they are also called mappers because these processes map data to a final image or output)."[9]

## Types
- Proxies that can be found in vtk.js:
    - Views
        - View3D
        - View2D
    - Animations
        - AnimationManager
        - TimeStepAnimation
    - Sources
        - TrivialProducer
    - Representations
    - Proxy
        - LookupTable
        - PiecewiseFunction
        
# View
- "is just a container for any Representation of DataSource that you want to see."[11]

# Visualization Pipeline
- "The pipeline consists of objects to represent data (**data objects**), objects to operate on data (**process objects**), and an indicated direction of data flow (arrow connections between objects)."[3]
- Synonym: Visualization Network

# Footnotes
- [1]: VTK Visualization Toolkit 4.1, 4.2.2
- [2]: VTK Visualization Toolkit 4.1, 4.2.1
- [3]: VTK Visualization Toolkit 4.1, 4.2
- [4]: See the vtkDataSet section: https://kitware.github.io/vtk-js/api/Common_DataModel_DataSet.html
- [5]: https://kitware.github.io/vtk-js/api/IO_Misc_ITKImageReader.html
- [5]: https://www.cs.uic.edu/~jbell/CS526/Tutorial/Filters.html
- [6]: https://vtk.org/doc/nightly/html/classvtkImageMarchingCubes.html
- [7]: VTK Visualization Toolkit 4, 2.4
- [8]: VTK Visualization Toolkit 4, 2.5 
- [9]: VTK Visualization Toolkit 4.1, 4.1.2
- [10]: VTK Visualization Toolkit 4.1, 4.1.3
- [11]: https://dash.plotly.com/vtk/intro
- [12]: https://dash.plotly.com/vtk/structure