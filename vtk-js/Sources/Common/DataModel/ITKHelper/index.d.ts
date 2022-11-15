/**
 * For purposes of limiting the amount of source code one needs to understand
 * the functions related to `vtkPolyData` have been removed, only `vtkImageData`
 * will be considered.
 */
import vtkImageData from "../ImageData";

export interface IOptions {
    pointDataName?: string;
    scalarArrayName?: string;
    cellDataName?: string;
}

/**
 * Converts an itk-wasm Image to a vtk.js vtkImageData.
 * Requires an itk-wasm Image as input.
 * @param itkImage
 * @param {IOptions} [options]
 */
export function convertItkToVtkImage(itkImage: any, options?: IOptions): vtkImageData;

/**
 * Converts a vtk.js vtkImageData to an itk-wasm Image.
 * Requires a vtk.js vtkImageData as input.
 * @param {vtkImageData} vtkImage
 * @param {IOptions} [options]
 */
export function convertVtkToItkImage(vtkImage: vtkImageData, options?: IOptions): any;


/**
 * vtkITKHelper is a helper which provides a set of functions to work with
 * itk-wasm module.
 */
export declare const vtkITKHelper: {
    convertItkToVtkImage: typeof convertItkToVtkImage,
    convertVtkToItkImage: typeof convertVtkToItkImage,
};
export default vtkITKHelper;
