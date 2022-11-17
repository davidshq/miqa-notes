# Mapper
- `/Rendering/Core/Mapper`

# Actor
- `/Rendering/Core/Actor`
    - `.newInstance()`
    - `.setMapper()`
    - `.getProperty()`
        - `.set()`
        - `.setDiffuse()`
        - `.setSpecular()`
        - `.setSpecularPower()`
        - `.setSpecularColor()`

# Source
- `/Filters/Sources/ConeSource`
- `/Filters/Sources/SphereSource`
- `/Filters/Sources/CubeSource`
- `/Filters/Sources/CylinderSource`

# Renderer
- `Rendering/Core/Renderer`
    - `.setViewport()` - Defines dimensions (height, width)
    - `.newInstance()`
    - `.setMapper()`
    - `.getProperty()`
        - Same as Actor.
    - `.addActor()`
    - `.resetCamera()`
    - `.getActiveCamera()`
    - `.azimuth()` - Camera?
    - `.resetCameraClippingRange()`

# Rendering Backends
- `Rendering/Misc/RenderingAPIs` (General Rendering)
- `/Rendering/Profiles/Geometry` (Geometric Rendering)

Provides the logic to render out using a specific backend - e.g., OpenGL or WebGPU.

# Render Window
- `/Rendering/Core/RenderWindow`
    - `.newInstance()`
    - `.newAPISpecificView()`
    - `.addView()`
    - `.setContainer()` - View?
    - `.render()`
    - `.addRenderer()`
- `/Rendering/Core/RenderWindowInteractor`
    - `.newInstance()`
    - `.setView()`
    - `.initialize()`
    - `.setInteractorStyle()`

# Interactor
- `/Interaction/Style/InteractorStyleTrackballCamera`
    - `.newInstance()`
