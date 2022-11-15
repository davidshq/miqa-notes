import macro from '../../../macros';
import vtk from '../../../vtk';
import vtkDataSetAttributes from '../../../Common/DataModel/DataSetAttributes';
import Constants from '../../../Common/DataModel/DataSet/Constants';

// Global Methods
const DATASET_FIELDS = ['pointData', 'cellData', 'fieldData'];

/**
 * vtkDataSet methods
 *
 * @param {*} publicAPI
 * @param {*} model
 */
function vtkDataSet(publicAPI, model) {
    // Set our className
    model.classHierarchy.push('vtkDataSet');

    // Add dataset attributes
    DATASET_FIELDS.forEach((fieldName) => {
        if (!model[fieldName]) {
            model[fieldName] = vtkDataSetAttributes.newInstance();
        } else {
            model[fieldName] = vtk(model[fieldName]);
        }
    });

    const superShallowCopy = publicAPI.shallowCopy;
    publicAPI.shallowCopy = (other, debug = false) => {
        superShallowCopy(other, debug);
        DATASET_FIELDS.forEach((fieldName) => {
            model[fieldName] = vtkDataSetAttributes.newInstance();
            model[fieldName].shallowCopy(other.getReferenceByName(fieldName));
        });
    };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
    // pointData: null,
    // cellData: null,
    // fieldData: null,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
    Object.assign(model, DEFAULT_VALUES, initialValues);

    // Object methods
    macro.obj(publicAPI, model);
    macro.setGet(publicAPI, model, DATASET_FIELDS);

    // Object specific methods
    vtkDataSet(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkDataSet');

// ----------------------------------------------------------------------------

export default { newInstance, extend, ...Constants };
