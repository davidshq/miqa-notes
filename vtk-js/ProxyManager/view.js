import macro from 'vtk.js/Sources/macros';

/**
 * 
 * @param {*} publicAPI 
 * @param {*} model 
 */
export default function addViewHandlingAPI(publicAPI, model) {
  /**
   * 
   * @param {*} options 
   * @returns 
   */
  publicAPI.create3DView = (options) =>
    publicAPI.createProxy('Views', 'View3D', options);

  /**
   * 
   * @param {*} options 
   * @returns 
   */
  publicAPI.create2DView = (options) =>
    publicAPI.createProxy('Views', 'View2D', options);

  /**
   * 
   * @param {*} view 
   */
  publicAPI.render = (view) => {
    const viewToRender = view || publicAPI.getActiveView();
    if (viewToRender) {
      viewToRender.renderLater();
    }
  };

  /**
   * 
   * @param {*} blocking 
   */
  publicAPI.renderAllViews = (blocking = false) => {
    const allViews = publicAPI.getViews();
    for (let i = 0; i < allViews.length; i++) {
      allViews[i].render(blocking);
    }
  };

  /**
   * 
   * @param {*} enable 
   */
  publicAPI.setAnimationOnAllViews = (enable = false) => {
    const allViews = publicAPI
      .getViews()
      .filter((v) => !enable || v.getContainer());
    for (let i = 0; i < allViews.length; i++) {
      allViews[i].setAnimation(enable, publicAPI);
    }
  };

  /**
   * 
   */
  function clearAnimations() {
    model.animating = false;
    const allViews = publicAPI.getViews();
    for (let i = 0; i < allViews.length; i++) {
      allViews[i].setAnimation(false, publicAPI);
    }
  }

  /**
   * 
   * @param {*} debouceTimout 
   */
  publicAPI.autoAnimateViews = (debouceTimout = 250) => {
    if (!model.animating) {
      model.animating = true;
      const allViews = publicAPI.getViews().filter((v) => v.getContainer());
      for (let i = 0; i < allViews.length; i++) {
        allViews[i].setAnimation(true, publicAPI);
      }
      model.clearAnimations = macro.debounce(clearAnimations, debouceTimout);
    }
    model.clearAnimations();
  };

  /**
   * 
   */
  publicAPI.resizeAllViews = () => {
    const allViews = publicAPI.getViews();
    for (let i = 0; i < allViews.length; i++) {
      allViews[i].resize();
    }
  };

  /**
   * 
   * @param {*} view 
   */
  publicAPI.resetCamera = (view) => {
    const viewToRender = view || publicAPI.getActiveView();
    if (viewToRender && viewToRender.resetCamera) {
      viewToRender.resetCamera();
    }
  };

  /**
   * 
   * @param {*} source 
   */
  publicAPI.createRepresentationInAllViews = (source) => {
    const allViews = publicAPI.getViews();
    for (let i = 0; i < allViews.length; i++) {
      publicAPI.getRepresentation(source, allViews[i]);
    }
  };

  /**
   * 
   */
  publicAPI.resetCameraInAllViews = () => {
    const allViews = publicAPI.getViews();
    for (let i = 0; i < allViews.length; i++) {
      allViews[i].resetCamera();
    }
  };
}