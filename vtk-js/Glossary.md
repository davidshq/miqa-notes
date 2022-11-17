
# Data Objects
- "Data objects represent information. Data objects also provide methods to create, access, and delete this information."[2]

# Mapper Objects
- "Mapper objects correspond to the **sinks** in the functional model. Mapper objects require one or more input **data objects** and terminate the **visualization pipeline** data flow. Usually mapper objects are used to convert data into **graphical primitives**, but they may write out data to a file or interface with another software system or devices. Mapper objects that write data to a computer file are termed **writer objects**."[1]

# Process Objects
- "Process objects operate on input data to generate output data. A process object either derives new data from its inputs, or transforms the input data into a new form."[1]
- "Process objects are further characterized as **source objects**, **filter objects**, or **mapper objects**. This categorization is based on whether the objects initiate, maintain, or terminate visualization data flow."[1]

# Source Objects
- "Source objects interface to external data sources or generate data from local parameters."[1]
    - "Source objects that generate data from local parameters are called **procedural objects**."[1]
    - "Source objects that interface to external data are called **reader objects** since the external file must be read and converted to an internal form."[1]

# Visualization Pipeline
- "The pipeline consists of objects to represent data (**data objects**), objects to operate on data (**process objects**), and an indicated direction of data flow (arrow connections between objects)."[3]

[1]: VTK Visualization Toolkit 4.1, 4.2.2
[2]: VTK Visualization Toolkit 4.1, 4.2.1
[3]: VTK Visualization Toolkit 4.1, 4.2