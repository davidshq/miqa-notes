// Create a proxyManager instance and pass it a config.
myProxyManager = vtkProxyManager.newInstance({ proxyConfiguration: myProxyConfig });

// Create a source to load a scan
myScanProxy1 = myProxyManager.createProxy( 'Sources', 'TrivialProducer' );

// Create a source to load a scan
myScanProxy2 = myProxyManager.createProxy( 'Sources', 'TrivialProducer' );

// Create a source to load a scan
myScanProxy3 = myProxyManager.createProxy( 'Sources', 'TrivialProducer' );

const myProxyConfig = {
    definitions: {
        Proxy: {
            LookupTable: { 
                class: vtkLookupTableProxy,
                options: { 
                    links: [], 
                    ui: [], 
                    presetName: 'Default(Cool to Warm)',
                }
            },
            // Controls the appearance of the volume.
            PiecewiseFunction: {
                class: vtkPiecewiseFunctionProxy,
                options: {
                    links: [],
                    ui: [],
                    options: {}
                }
            }
        },
        Sources: {
            // For stand-alone data objects
            TrivialProducer:{
                class: vtkProxySource,
                options: {
                    links: [],
                    ui: [],
                    options: {
                        activateOnCreate: true,
                    }
                }
            },
            Contour: Contour,
        },
        Representations: {
            Slice: {
                class: vtkProxyRepresentation,
                options: {
                    links: proxyLinks.Slice,
                    ui: proxyUI.Slice,
                }
            },
            SliceX: {
                class: vtkSliceRepresentationProxy,
                options: {
                    links: [{ 
                        link: 'SliceX',
                        property: 'slice',
                        updateOnBind: true 
                    }].concat(proxyLinks.Slice),
                    UI: proxyUI.Slice,
                }
            },
            SliceY: {
                class: vtkSliceRepresentationProxy,
                options: {
                    links: [{
                        link: 'SliceY', 
                        property: 'slice', 
                        updateOnBind: true 
                    }].concat(proxyLinks.Slice),
                    UI: proxyUI.Slice,
                }
            },
            SliceZ: {
                class: vtkSliceRepresentationProxy,
                options: {
                    links: [{
                        link: 'SliceZ',
                        property: 'slice',
                        updateOnBind: true 
                        }].concat(proxyLinks.Slice),
                    UI: proxyUI.Slice,
                }
            },
            Volume: {
                class: vtkVolumeRepresentationProxy,
                options: {
                    links: proxyLinks.Volume,
                    ui: proxyUI.Volume,
                }
            },
        },
        Views: {
            View3D: createDefaultView(vtkView, proxyUI.View3D),
            View2D: createDefaultView(vtk2DView, proxyUI.View2D),
            View2D_X: createDefaultView(vtk2DView, proxyUI.View2D, { axis: 0 }),
            View2D_Y: createDefaultView(vtk2DView, proxyUI.View2D, { axis: 1 }),
            View2D_Z: createDefaultView(vtk2DView, proxyUI.View2D, { axis: 2 }),
            ScreenshotView2D_x: createDefaultView(vtk2DView, proxyUI.View2D, { axis: 0 }),
            ScreenshotView2D_y: createDefaultView(vtk2DView, proxyUI.View2D, { axis: 1 }),
            ScreenshotView2D_z: createDefaultView(vtk2DView, proxyUI.View2D, { axis: 2 }),
        },
    },
    representations: {
        View3D: proxyViewRepresentationMapping.View3D,
        View2D: proxyViewRepresentationMapping.View2D,
        View2D_X: { 
            ...proxyViewRepresentationMapping.View2D,
            vtkImageData: { name: 'SliceX' }, 
        },
        View2D_Y: {
            ...proxyViewRepresentationMapping.View2D,
            vtkImageData: { name: 'SliceY' },
        },
        View2D_Z: {
            ...proxyViewRepresentationMapping.View2D,
            vtkImageData: { name: 'SliceZ' },
        },
        ScreenshotView2D_x: {
            ...proxyViewRepresentationMapping.View2D,
            vtkImageData: { name: 'SliceX' },
        },
        ScreenshotView2D_y: {
            ...proxyViewRepresentationMapping.View2D,
            vtkImageData: { name: 'SliceY' },
        },
        ScreenshotView2D_z: {
            ...proxyViewRepresentationMapping.View2D,
            vtkImageData: { name: 'SliceZ' },
        },
    },
    filters: {
        vtkImageData: ['Contour'],
    },
};

const Contour = {
    class: vtkProxySource,
    options: {
      autoUpdate: false, // For now...
      algoFactory: vtkImageMarchingCubes,
      proxyPropertyMapping: {
        contourValue: { modelKey: 'algo', property: 'contourValue' },
        computeNormals: { modelKey: 'algo', property: 'computeNormals' },
        mergePoints: { modelKey: 'algo', property: 'mergePoints' },
      },
      updateDomain(self, frame) {
        const arrayToProcess = frame.getPointData().getScalars();
        frame.getPointData().getArrayByIndex(0);
        if (!arrayToProcess) {
          return;
        }
        const [min, max] = arrayToProcess.getRange();
        const step = Math.min(1, (max - min) / 500);
        self.updateProxyProperty('contourValue', {
          domain: { min, max, step },
        });
      },
      ui: [
        {
          label: 'Contour Value',
          name: 'contourValue',
          widget: 'slider',
          propType: 'slider',
          type: 'double',
          size: 1,
          domain: { min: 0, max: 1000, step: 1 },
          doc: 'Adjust contour value',
        },
        {
          label: 'Compute Normals',
          name: 'computeNormals',
          widget: 'checkbox',
          type: 'boolean',
          advanced: 0,
          size: 1,
          doc: 'Compute normal to enable smooth surface',
        },
        {
          label: 'Merge points',
          name: 'mergePoints',
          widget: 'checkbox',
          type: 'boolean',
          advanced: 0,
          size: 1,
          doc: 'Prevent point duplication by merging them',
        },
        {
          label: 'Update',
          name: 'update',
          propType: 'ExecuteProperty',
          size: 1,
        },
      ],
    },
};