# Annotations
Text or graphics that are placed in the overlay plane of a render. See VTK Users Guide 11th, pg. 63 and following.
    - An overlay plane is placed on top of the rendering thus it does not interfere with the rendered object.

# Data Set
"In vtk a dataset consists of a structure (geometry and topology) and attribute data. The structure is defined implicitly or explicitly as a collection of cells. The geometry of the structure is contained in point coordinates plus the cell interpolation functions. The topology of the dataset structure is defined by cell types and how the cells share their defining points."[4]

# Objects

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

# Visualization Pipeline
- "The pipeline consists of objects to represent data (**data objects**), objects to operate on data (**process objects**), and an indicated direction of data flow (arrow connections between objects)."[3]

# Footnotes
- [1]: VTK Visualization Toolkit 4.1, 4.2.2
- [2]: VTK Visualization Toolkit 4.1, 4.2.1
- [3]: VTK Visualization Toolkit 4.1, 4.2
- [4]: See the vtkDataSet section: https://kitware.github.io/vtk-js/api/Common_DataModel_DataSet.html
- [5]: https://kitware.github.io/vtk-js/api/IO_Misc_ITKImageReader.html