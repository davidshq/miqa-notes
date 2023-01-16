# Requirements
https://kitware.github.io/vtk-js/docs/develop_requirement.html
- Only two dependencies:
    - Node.js
    - Git
- Install vtk.js within project:
    - `npm install @kitware/vtk.js --save`
- For contributing to vtk.js:
    - `git clone https://github.com/kitware/vtk-js.git`
    - `cd vtk-js`
    - `npm install`

# Creating a new class in vtk.js
https://kitware.github.io/vtk-js/docs/develop_class.html
- Most people likely won't be creating a new class for vtk.js, but this documentation is helpful in understanding how vtk.js classes are structured.
- "vtk.js does not rely on the class definition that was brought in with the ES6 specification. Instead, vtk.js provides a closure based infrastructure which lets us compose methods into specific instances without any hierarchical constraint."
    - "Due to our closure paradigm methods can be used outside of their instance context and can be directly be passed as callbacks. Therefore their usage does not require this to be referenced each time."
-  "By convention, we create a directory for each of our classes. The name of the directory must be the name of the class capitalized without its “vtk” prefix (although when importing a class, we will add the “vtk” prefix)."
    - "The definition of that class should be held in an “index.js” file within that directory."
    - "The reason to use a directory instead of a simple JavaScript file is to enable the association of several resources to a specific class like a constants file, several tests, an example, and/or additional documentation."
- "That class should belong to a *module* and that module should be owned by a *kit*."
    - "*Kits* correspond to the root directories underneath the *Sources* directory of the repository."
    - "Each *kit* contains several *modules* which are the immediate child directories within."
    - "Within each *module* you find its class definitions."
- Current kits/modules (top-level = kits, children = modules)
    - Common
        - Core
        - DataModel
        - System
    - Filters
        - General
        - Sources
    - IO
        - Core
    - Interaction
        - Style
    - Rendering
        - Core
        - Misc
        - OpenGL
        - SceneGraph

## Class definition
- "The design inspiration originated from Douglas Crockford with functional inheritance, but we went further in some ways, too."
- https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c
```js
// MyClass/index.js

import macros         from '@kitware/vtk.js/macros';
import vtk            from '@kitware/vtk.js/vtk';
import vtkParentClass from '@kitware/vtk.js/Kit/Module/ParentClass';
import vtkOtherClass  from '@kitware/vtk.js/Kit/Module/OtherClass';
import Constants      from '@kitware/vtk.js/Kit/Module/MyClass/Constants';

const { Representation } = Constants;  // { POINT: 0, WIREFRAME: 1, ... }

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

// Add module-level functions or api that you want to expose statically via
// the next section...

function moduleScopedMethod() {
  // do stuff
}

function moduleScopedStaticMethod() {
  // do more stuff
}

// ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

export const STATIC = {
  moduleScopedStaticMethod,
};

// ----------------------------------------------------------------------------
// vtkMyClass methods
// ----------------------------------------------------------------------------

function vtkMyClass(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkMyClass');

  // Capture "parentClass" api for internal use
  const superClass = Object.assign({}, publicAPI);

  // Public API methods
  publicAPI.exposedMethod = () => {
    // This is a publicly exposed method of this object
  };

  publicAPI.overriddenMethod = () => {
    superClass.overriddenMethod();
    // let's add my custom code here
    // ...
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  myProp1: [0, 0, 0],
  // myProp2: null,     // Do not initialize internal objects here
  myProp3: true,
  myProp4: 6,
  myProp5: [1, 2, 3, 4],
  myProp6: Representation.WIREFRAME,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  vtkParentClass.extend(publicAPI, model, initialValues);

  // Internal objects initialization
  if (model.myProp2) {
    model.myProp2 = vtk(model.myProp2);
  } else {
    model.myProp2 = vtkOtherClass.newInstance();
  }

  // Create get-only macros
  macros.get(publicAPI, model, ['myProp2', 'myProp4']);

  // Create get-set macros
  macros.setGet(publicAPI, model, ['myProp3']);

  // Create set macros for array (needs to know size)
  macros.setArray(publicAPI, model, ['myProp5'], 4);

  // Create get macros for array
  macros.getArray(publicAPI, model, ['myProp1', 'myProp5']);

  // Create get-set macros for enum type
  macros.setGet(publicAPI, model, [
    { name: 'myProp6', enum: Representation, type: 'enum' },
  ]);

  // For more macro methods, see "Sources/macros.js"

  // Object specific methods
  vtkMyClass(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macros.newInstance(extend, 'vtkMyClass');

// ----------------------------------------------------------------------------

export default Object.assign({ newInstance, extend }, STATIC, Constants);
```

## Constants definition
```js
// MyClass/Constants.js
export const Representation = {
  POINT: 0,
  WIREFRAME: 1,
  SURFACE: 2,
};

export const Format = {
  ASCII: 0,
  BINARY: 1,
}

export default {
  Representation,
  Format,
};
```

## API documentation
- "If you want to go beyond the code being the sole source of documentation, you can add your own markdown file to further document it with code snippets, member variables, and method usage."
- "For that you need to add an api.md within the class directory"
- See page for example.

# Creating a new example in vtk.js
https://kitware.github.io/vtk-js/docs/develop_example.html
- "This guide illustrates how to add an example to the vtk.js repository and how to run and debug it."
- "each VTK class can have one example but many examples can be added using the standalone approach."

# Creating a test in vtk.js
https://kitware.github.io/vtk-js/docs/develop_test.html

# Building vtk.js
https://kitware.github.io/vtk-js/docs/develop_build.html

# Developing widgets
https://kitware.github.io/vtk-js/docs/develop_widget.html
- "Widgets allow users to interact with scene objects and drive functionality through clicking, dragging, and touch."

## Widget architecture

### Widget Manager
- "The `vtkWidgetManager` is the object that manages the creation/suppression/focus of widgets within a view."
    - "There is exactly one `vtkWidgetManager` per renderer."
    - Link the widgetManager and renderer like so `widgetManager.setRenderer(renderer);`
- "Each widget manager can give the focus to at most one widget at any given time."
    - "The focus defines which widget is active and should handle events."
    - "Note that it is still possible to respond to events without having the focus (see Widget Behavior)."
    - To give focus to a widget: `widgetManager.grabFocus(widget);`
    - "A call to `widgetManager.enablePicking()` allows the user to interact with widgets."
        - Releases focus of previous holding widget.

### Widget creation
- "A widget is created by `vtkWidget.newInstance(INITIAL_VALUES)` where `vtkWidget` is the base class of the widget being created and `INITIAL_VALUES` are the arguments given to the constructor of the widget."
    - "Note that some parameters cannot be changed later on."
    - "During this call the “widget state” is created. It is unique to a widget instance. This allows for synchronization of the same widget across renderers (a change of the widget state in one view is directly rendered in all other views)."
- "The widget must then be set with `widgetManager.addWidget(widget, viewType)`."
    - `viewType` informs `widgetManager` what types of representations it should build.
    - "`addWidget()` returns a handle to the widget specific to the renderer the widget manager is linked to."
        - "A widget can be added to multiple widget managers. Each widget manager will return a handle for its specific renderer."

### Widget suppression
- "Removing a widget from a view is done by `widgetManager.removeWidget(widget)`."
    - "Once a widget is removed from all widget managers, it can be safely deleted by `widget.delete()`."

### Widget state
- "The widget state stores widget data used across renderers."
- "The widget state is composed of sub-states(i.e. Object) made of properties that describe particular aspects of the widget."
- "The widget state must be built using `vtkStateBuilder`. There are four ways to build sub-states."

#### Static sub-state
```js
.addStateFromMixin({
    labels: ['{LABEL0}'], // Which representations can use that sub-state to render
    mixins: ['origin', 'color', 'scale1', 'visible'], // Fields that store sub-state useful data
    name: '{NAME}', // Uniquely identifies the sub-state
    initialValues: { // Values at sub-state creation
      scale1: 0.1,
      origin: [1, 2, 3],
      visible: false,
    }
})
```
- To get sub-state, `state.get{NAME}()`
- "A sub-state can have multiple labels so it can be used simultaneously by multiple representations. This allows to render complex widgets by using multiple simple and reusable representations rather that one complex representation per widget."
- "Since mixins are meant to be used by representations for render purpose they are standardized and limited in their choice. The complete list of mixins can be found in `StateBuilder`."
- "Values stored in sub-states can be accessed through `subState.get{NAME}()` and `subState.set{NAME}()`"
    - "Modifying a sub-state triggers a render of the scene."
- "`initalValues` is the content at sub-state creation. It is not necessary to have all of them specified because mixins already define default values."

#### Dynamic sub-state
- "Dynamic sub-states are resizable arrays of sub-states. It is possible to add and remove sub-states on the fly."
    - "For example if the user selects a set of points, every time a point is added, the position of that point is added to the widget state)."
```js
.addDynamicMixinState({
  labels: ['{LABEL0}', '{LABEL1}'],
  mixins: ['origin', 'color', 'scale1', 'visible'],
  name: '{NAME}',
  initialValues: {
    scale1: 0.05,
    origin: [-1, -1, -1],
    visible: false,
  },
})
```
- "Sub-states are added via `state.add{NAME}()`. It returns a handle to the newly created sub-state."
- "Sub-states are removed via `state.remove{NAME}(handle)` where `handle` is the handle given by `add{NAME}`."
- "Sub-states can be retrieved by a call to `state.get{NAME}List()`."
- "The sub-states list can be cleared by `state.clear{NAME}List()`."

#### Pre-existing sub-state
- "Pre-existing sub-states take a pre-existing sub-state and add it to the widget state."
```js
.addStateFromInstance({
    labels: ['{LABEL0}', '{LABEL1}'],
    name: '{NAME}',
    instance,
})
```

#### Other sub-states
- "other sub-states can be created via `state.addField({ name, initialValue })`."
    - "This allows to store data not restricted to the mixin list, but these are not passed to representations for rendering. They allow for more complex widget states."
- "A widget state is the accretion of the previous sub-states. These are simply built by chaining the calls to `stateBuilder.add{...}` this way :"
```js
vtkStateBuilder
    .createBuilder()
    .addStateFromMixin({ ... })
    .addDynamicMixinState({ ... })
    .addDynamicMixinState({ ... })
    .build();
```

#### Mixins

**boundsMixin**
- "This mixin adds the properties `bounds` and `placeFactor`, as well as methods
`containsPoint`, `placeWidget`, and `setPlaceFactor`."

**colorMixin**
- "This mixin adds a color property. This is a scalar value between 0 and 1 that determines color for many HandleRepresentations, such as the SphereHandleRepresentation and CircleContextRepresentation."
    - "When determining the final color, this scalar value is mapped through a lookup table (LUT) on the internally used mapper."
- "In order to achieve custom RGB colors, the lookup table needs to be modified. For the SphereHandleRepresentation and the CircleContextRepresentation, you can call `.getMapper().getLookupTable()` to obtain a reference to the internal LUT."
    - "From there, you can modify the LUT to obtain the desired colors given the scalar values in the colorMixin."

**directionMixin**
- "This mixin adds a `direction` property, and methods `rotateFromDirections`, `rotate`, and `rotate[X/Y/Z]`."

**manipulatorMixin**
- "adds a manipulator to a state."

**nameMixin**
- "adds a `name` property."

**orientationMixin**
- "adds properties `up`, `right`, and `direction` to describe the orientation of a state."

**originMixin**
- "adds an `origin` property."

**scale1Mixin and scale3Mixin**
- "These mixins adds a single scale factor and a 3-component scale factor, respectively."
- "If scaleInPixels is set to true for a representation, then scale1 will be interpreted as the pixel height of a representation."
    - "(Only for representations that support this; grep for scaleInPixels to see which representations do.)"
    - "This means that, regardless of where a representation is in world space, it will always have approximately scale1 pixels of height."

**visibleMixin**
- "adds a `visible` flag."

### Widget Representations
- "Widget representations are the visual part of the widget. A widget can use multiple representations (for instance dots joined by a line)."
- "The representations the widget uses are selected when the widget is added to a widget manager through a call to `getRepresentationsForViewType(viewType)` where `viewType` is the view type given in parameter to `widgetManager.addWidget(...)`."
- Method should return an array like:
```js
switch (viewType) {
  case ViewTypes.DEFAULT:
  case ViewTypes.GEOMETRY:
  case ViewTypes.SLICE:
    return [
      {
        builder: vtkCircleContextRepresentation, // Class of representation to be used by the widget
        labels: ['handle', 'trail'], // Which sub-states of widget are used by representation
      },
      {
        builder: vtkPolyLineRepresentation,
        labels: ['trail'],
      },
    ];
  case ViewTypes.VOLUME:
  default:
    return [{ builder: vtkSphereHandleRepresentation, labels: ['handle'] }];
}
```
- "A representation can have multiple sub-states as input. Different sub-states can be rendered similarly. Returning different representation parameters for different view types allows for an adapted view depending on the context."
    - "For example, having a widget rendered in a 2D view and a 3D view simultaneously with different 2D and 3D widget representations."
- "Representations are automatically recomputed when sub-states are modified."
- "They are implemented as VTK.js filters since all the rendering computations happen in the `requestData(inData, outData)` method where `inData` is the list of states coming from sub-states and `outData` is a `vtkPolyData` representing the geometry to render."
- "Representations manage their own actors and mappers."
    - "Actors are usually created when the representation is created."
    - "Actors should be pushed in `model.actors` to be rendered (see `vtkRectangleContextRepresentation` for a simple example)."
- "A representation should inherit from either `vtkHandleRepresentation` or `vtkContextRepresentation`."
    - "The difference between these two base classes is that user can click and interact with handle representations but not with context ones."

### Widget behavior
- "The widget behavior is the place where the logic of the widget happens. The widget behavior is the handle returned when a widget is added to a widget manager."
- "The widget behavior receives and responds to mouse and keyboard events through handler methods."
    - "These methods are named `handle{XXX}(callData)` where `XXX` is the name of the event (like `KeyPress, KeyUp, MouseMove, LeftButtonPress,` etc…) and `callData` is the event data (it contains information like the mouse position, the keyboard state …)."
- "All events don’t need a handler method: if no handler is provided the widget behavior ignores the event."
- "Each handler must return either `macro.EVENT_ABORT` or `macro.VOID`."
    - "`macro.EVENT_ABORT` means that the event should not be propagated to other widgets whereas `macro.VOID` means that the event should be propagated."
        - "Note that the order in which widgets receive events is not guaranteed, so returning the wrong value might starve other widgets from events they expect."
- "The widget behavior has also access to the renderer, openGLRenderWindow and interactor."

#### Complex widget interaction

**Focus**
- "“Focus” as a widget concept means that a particular widget should be the only one interactable. This use-case arises when there is a primary widget."
- "When a widget is given the focus, the widget behavior is notified through the grabFocus() method. This is usually the place to setup complex interaction states such as initializing the widget behavior’s internal state (distinct from the widget state), starting animations (see Animations) or setting up the active state (see Active State)."
- "The loseFocus() method is called when the widget manager removes the focus from the widget. It can also be called by the widget behavior itself if necessary. For example, a widget might decide to lose the focus after the escape key was pressed."

**Active state**
- "The widget state can have an active sub-state. This is usually useful to flag the handle the user is interacting with and keep track of it or to change its visual appearance."
- "The active state can be set by the widget behavior with `subState.activate()`. Similarly a sub-state can be deactivated with a call to `subState.deactivate()`."
- "When the widget does not have the focus, a sub-state can be activated if the user hovers a handle. A pointer to the active handle is stored in `model.activeState`. This allows interactions to happen when the widget does not have the focus."
- "For consistency, when a focus widget sets the active state, the `model.activeState` member is set to also point to the active handle."

**Animations**
- "Animations tell vtk.js to re-render when necessary."
- "Animations are not required since the widget can trigger a render by calling `model.interactor.render()` so they are only useful if you don’t want to think about renders."
- " A widget starts an animation by calling `model.interactor.startAnimation(publicAPI)` and stops it by calling `model.interactor.cancelAnimation(publicAPI)`."

## Code architecture
- "Each widget has it’s own directory in `Sources/Widgets/Widgets3D`. In this directory there are three files:"
    - `state.js`
    - `behavior.js`
    - `index.js`
- Widgets can have all code in `state.js` but architecture concept is the same.

### state.js
- "The state.js file contains the state building function which usually looks like:"
```js
export default function generateState() {
  return vtkStateBuilder
    .createBuilder()
    .addStateFromMixin({ ... })
    .addDynamicMixinState({ ... })
    .build();
}
```
- "This function is later used in index.js to actually build the widget state."

### behavior.js
- "The behavior.js file defines the methods of the widget behavior and typically looks like:"
```js
export default function widgetBehavior(publicAPI, model) {
  model.classHierarchy.push('vtk{NAME}WidgetProp');

  publicAPI.handle{XXX} = () => {...}

  publicAPI.grabFocus = () => {...}
  publicAPI.loseFocus = () => {...}
}
```

### index.js
- "The index.js file contains the definition of the widget and glues all the parts together. The widget definition is a regular vtk.js class."
- "The widget behavior is set by setting the member `model.behavior = widgetBehavior`."
- "The widget state is built by setting the member `model.widgetState = stateGenerator()`."
- "It is in this file that the `getRepresentationsForViewType` method should be implemented."
- "The strings of the array `model.methodsToLink` describe the names of methods that should be created by vtk.js to interface directly with representations."
    - " For instance if `'{NAME}'` is in `model.methodsToLink` then vtk.js will add the `set{NAME}()` and `get{NAME}()` methods to the widget behavior. These methods internally call the same methods on each representation that expose them."

## WebGPU Examples
- Images with links to examples.

## WebXR Examples
- Images with links to examples.
