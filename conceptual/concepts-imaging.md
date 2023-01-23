# Camera Attributes
- Position - location of camera
- Orientation
- Focial Point - where camera is pointing
- Method of Project
- Clipping Planes

# Camera Image Plane
- "The camera image plane is located at the focal point and is typically perpendicular to the projection vector."[1]
- "Clipping planes are typically perpendicular to the direction of projection."[1]

# Clipping Planes
- "The clipping planes are used to eliminate data either too close to the camera or too far away. As a result only actors or portions of actors within the clipping planes are (potentially) visible."[1]

# Color Systems
- "The two simplified component systems that we use to describe colors are RGB and HSV color systems."[1]

# Coordinate Systems
- Model
- World
- View
- Display

# Diffuse Lighting
- "Diffuse lighting, which is also known as Lambertian reflection, takes into account the angle of incidence of the light onto an object."[1]

# Direction of Projection
- "The vector defined from the camera position to the focal point is called the direction of projection."[1]

# HSV Color System
- "The HSV system represents colors based on their hue, saturation, and value."[1]
    - "The value component is also known as the brightness or intensity component, and represents how much light is in the color."[1]

# Hue
- "The hue represents the dominant wavelength of the color and is often illustrated using a circle"[1]
- "Each location on the circumference of this circle represents a different hue and can be specified using an angle."[1]
- "When we specify a hue we use the range from zero to one, where zero corresponds to zero degrees on the hue circle and one corresponds to 360 degrees."[1]

# Image-Order Rendering Process

# Infinite Light Source
- "For an infinite light source, we assume that it is positioned infinitely far away from what it is illuminating."[1]
- "This is significant because it implies that the incoming rays from such a source will be parallel to each other."[1]
- "The intensity of the light emitted by our infinite light sources also remains constant as it travels, in contrast to the actual 1/ distance2 relationship physical lights obey."[1]

# Method of Project
- See Orthographic and Perspective Projection topics.

# Nearest Neighbor Interpolation
- [Nearest Neighbor Interpolation](https://www.giassa.net/?page_id=207)

# Object-Order Rendering Process
- "An object-order process works by rendering each object, one at a time."[1]

# Orthographic Projection
- "Orthographic projection is a parallel mapping process. In orthographic projection (or parallel projection) all rays of light entering the camera are parallel to the projection vector."[1]

# Perspective Projection
- "Perspective projection occurs when all light rays go through a common point (i.e., the viewpoint or center of projection). To apply perspective projection we must specify a perspective angle or camera view angle."[1]

# Piecewise Function
[Piecewise Function](https://www.storyofmathematics.com/piecewise-functions/)

# Point Source Lighting
- "The light sources that we are accustomed to typically radiate from a region in space (a filament in an incandescent bulb, or a light-emitting gas in a fluorescent light). The point source lighting model assumes that the light is emitted in all directions from a single point in space."[1]

# Ray-tracing (Raycasting)
- "Ray-tracing simulates the interaction of light with objects by following the path of each light ray. Typically, we follow the ray backwards from the viewer’s eyes and into the world to determine what the ray strikes. The direction of the ray is in the direction we are looking (i.e., the view direction) including effects of perspective (if desired)."[1]
- "When a ray intersects an object, we can determine if that point is being lit by our light source. This is done by tracing a ray from the point of intersection towards the light. If the ray intersects the light, then the point is being lit. If the ray intersects something else before it gets to the light, then that light will not contribute to illuminating the point. For multiple light sources we just repeat this process for each light source. The total contributions from all the light sources, plus any ambient scattered light, will determine the total lighting or shadow for that point."[1]
- "By following the light’s path backwards, ray tracing only looks at rays that end up entering the viewer’s eyes. This dramatically reduces the number of rays that must be computed by a simulation program."[1]
- "Ray tracing is an image-order process. It works by determining what happens to each ray of light, one at a time."[1]
- "Ray tracing tends to be done without any specialized hardware and therefore is a time-consuming process."[1]

# Rendering
- "The process of generating images using computers."[1]
- "Rendering processes can be broken into two categories: image-order and object-order."[1]

# RGB Color System
- "The RGB system represents colors based on their red, green, and blue intensities. This can be thought of as a three dimensional space with the axes being red, green, and blue."[1]

# Saturation
- "The saturation indicates how much of the hue is mixed into the color."

# Scene
"We call the combination of lights, camera, and actors the scene, and refer to the rendering process as rendering the scene."[1]

# Specular Lighting
- "Specular lighting represents direct reflections of a light source off a shiny object."[1]

# Surface Rendering
- "surface rendering (i.e., render the surfaces of an object)"[1]
- "Generally speaking, when we render an object using surface rendering techniques, we mathematically model the object with a surface description such as points, lines, triangles, polygons, or 2D and 3D splines. The interior of the object is not described, or only implicitly represented from the surface representation (i.e., surface is the boundary of the volume)."[1]

# Visualization
- "Practically speaking, visualization is the process that transforms data into a set of graphics primitives. The methods of computer graphics are then used to convert these primitives into pictures or animations."[1]
- "In data visualization our goal is to transform data into graphical data, or *graphics primitives*, that are then rendered."[1]

# Volume Rendering
- "Such objects cannot be rendered using a model based exclusively on surface interactions. Instead, we need to consider the changing properties inside the object to properly render them."[1]
- "volume rendering (i.e., render the surface and interior of an object)."[1]


# Footnotes:
[1]: https://kitware.github.io/vtk-examples/site/VTKBook/03Chapter3/