import macro from './../../../macros';

const { vtkErrorMacro } = macro;

/**
 * Proxy Registration Handling: addRegistrationAPI
 *
 * @param {*} publicAPI
 * @param {*} model
 */
export default function addRegistrationAPI(publicAPI, model) {
  /**
   *
   * @param {*} proxy
   * @returns
   */
  function registerProxy(proxy) {
    if (!proxy) {
      return;
    }
    model.proxyIdMapping[proxy.getProxyId()] = proxy;
    const group = proxy.getProxyGroup();
    if (!model.proxyByGroup[group]) {
      model.proxyByGroup[group] = [];
    }
    if (model.proxyByGroup[group].indexOf(proxy) === -1) {
      model.proxyByGroup[group].push(proxy);
    }
    proxy.setProxyManager(publicAPI);

    // Make sure we invoke event after the current execution path
    macro.setImmediate(() => {
      publicAPI.invokeProxyRegistrationChange({
        action: 'register',
        proxyId: proxy.getProxyId(),
        proxyName: proxy.getProxyName(),
        proxyGroup: proxy.getProxyGroup(),
        proxy,
      });
    });
  }

  /**
   * Proxy Deregistration
   *
   * @param {*} proxyOrId
   * @returns
   */
  function unRegisterProxy(proxyOrId) {
    const id = proxyOrId.getProxyId ? proxyOrId.getProxyId() : proxyOrId;
    const proxy = model.proxyIdMapping[id];

    // Unregister proxy in any group
    Object.keys(model.proxyByGroup).forEach((groupName) => {
      const proxyList = model.proxyByGroup[groupName];
      const index = proxyList.indexOf(proxy);
      if (index !== -1) {
        proxyList.splice(index, 1);
      }
    });

    delete model.proxyIdMapping[id];
    proxy.gcPropertyLinks('application');
    proxy.gcPropertyLinks('source');
    proxy.setProxyManager(null);
    publicAPI.invokeProxyRegistrationChange({
      action: 'unregister',
      proxyId: id,
      proxyName: proxy.getProxyName(),
      proxyGroup: proxy.getProxyGroup(),
      proxy,
    });
    return proxy;
  }

  /**
   * If our `model.activeSource` and argument `source` are not equal, we
   * ensure that `model.activeSourceSubscription` is not set, then
   * we set `model.activeSource` equal to `source` and set `model.activeSourceSubscription`
   * to be the current `source`s modification timestamp.
   *
   * We call `publicAPI.modifed` and `publicAPI.invokeActiveSourceChange`
   *
   * @param {*} source
   */
  publicAPI.setActiveSource = (source) => {
    if (model.activeSource !== source) {
      if (model.activeSourceSubscription) {
        model.activeSourceSubscription.unsubscribe();
        model.activeSourceSubscription = null;
      }
      model.activeSource = source;
      if (source) {
        model.activeSourceSubscription = source.onModified(publicAPI.modified);
      }
      publicAPI.modified();
      publicAPI.invokeActiveSourceChange(source);
    }
  };

  /**
   * Essentially identical to `setActiveSource` above except we are acting on
   * `model.activeView` and `model.activeViewSubscription`
   *
   * @param {*} view
   */
  publicAPI.setActiveView = (view) => {
    if (model.activeView !== view) {
      if (model.activeViewSubscription) {
        model.activeViewSubscription.unsubscribe();
        model.activeViewSubscription = null;
      }
      model.activeView = view;
      if (view) {
        model.activeViewSubscription = view.onModified(publicAPI.modified);
      }
      publicAPI.modified();
      publicAPI.invokeActiveViewChange(view);
    }
  };

  // Below we set up proxy access to the model, this allows
  // us to use the proxy to access the model, see Proxy Design Pattern


  // publicAPI.getProxyById(id) == model.proxyIdMapping[id]
  publicAPI.getProxyById = (id) => model.proxyIdMapping[id];

  // publicAPI.getProxyGroups == model.proxyByGroup
  publicAPI.getProxyGroups = () => Object.keys(model.proxyByGroup);

  // publicAPI.getProxyInGroup(name) == model.proxyByGroup[name]
  publicAPI.getProxyInGroup = (name) =>
    [].concat(model.proxyByGroup[name] || []);

  // publicAPI.getSources == model.proxyByGroup.Sources
  publicAPI.getSources = () => [].concat(model.proxyByGroup.Sources || []);

  // publicAPI.getRepresentations == model.proxyByGroup.Representations
  publicAPI.getRepresentations = () =>
    [].concat(model.proxyByGroup.Representations || []);

  // publicAPI.getViews == model.proxyByGroup.Views
  publicAPI.getViews = () => [].concat(model.proxyByGroup.Views || []);

  /**
   * Creates a proxy
   *
   * @param {*} group
   * @param {*} name
   * @param {*} options
   * @returns
   */
  publicAPI.createProxy = (group, name, options) => {
    const { definitions } = model.proxyConfiguration;
    // If the proxyConfiguration doesn't have group or group name
    if (!definitions[group] || !definitions[group][name]) {
      return null;
    }
    const definition = definitions[group][name];
    // We combine the options of the existing proxyConfiguration.definitions[group][name].options
    // with the options passed in
    const definitionOptions = { ...definition.options, ...options };
    // TODO: What is .class?
    const proxy = definition.class.newInstance({
      ...definitionOptions,
      proxyGroup: group,
      proxyName: name,
      proxyManager: publicAPI,
    });

    // Create a proxy property for each property thats exists on the model
    if (definition.proxyProps) {
      const proxyMap = {};
      Object.keys(definition.proxyProps).forEach((key) => {
        const newProxyDef = definition.proxyProps[key];
        proxyMap[key] = publicAPI.createProxy(
          newProxyDef.group,
          newProxyDef.name,
          newProxyDef.options
        );
      });
      proxy.set(proxyMap);
    }

    // Set the proxy properties equal to the model's properties
    if (definition.props) {
      proxy.set(definition.props);
    }

    registerProxy(proxy);

    if (definitionOptions.activateOnCreate) {
      // TODO: What exactly does it mean to activate?
      proxy.activate();
    }

    return proxy;
  };

  /**
   * Given a source and view we reutrn a representation.
   *
   * @param {*} source
   * @param {*} view
   * @returns
   */
  publicAPI.getRepresentation = (source, view) => {
    // If source/view is not provided, use the publicAPI to get them
    const sourceToUse = source || publicAPI.getActiveSource();
    const viewToUse = view || publicAPI.getActiveView();

    // We can only get a representation for a source and a view
    if (!sourceToUse || !viewToUse || !sourceToUse.getType()) {
      return null;
    }

    const sourceId = sourceToUse.getProxyId();
    const viewId = viewToUse.getProxyId();

    // TODO: sv2r = Source+View to Representation Mapping?
    let viewRepMap = model.sv2rMapping[sourceId];

    if (!viewRepMap) {
      viewRepMap = {};
      model.sv2rMapping[sourceId] = viewRepMap;
    }

    let rep = viewRepMap[viewId];

    // If we don't have a valid representation
    if (!rep) {
      const viewName = viewToUse.getProxyName();
      const sourceType = sourceToUse.getType();
      const definition =
        model.proxyConfiguration.representations[viewName][sourceType];
      if (!definition) {
        vtkErrorMacro(
          `No definition for representation of ${sourceType} in view ${viewName}`
        );
        return null;
      }

      // Creates a Representations proxy
      rep = publicAPI.createProxy(
        'Representations',
        definition.name,
        definition.options
      );

      model.r2svMapping[rep.getProxyId()] = { sourceId, viewId };
      viewRepMap[viewId] = rep;

      rep.setInput(sourceToUse);
      viewToUse.addRepresentation(rep);
    }
    return rep;
  };

  /**
   * Remove a proxy
   *
   * @param {*} proxy
   */
  publicAPI.deleteProxy = (proxy) => {
    const group = proxy.getProxyGroup().toLowerCase();

    if (group === 'views') {
      proxy.getRepresentations().forEach((repProxy) => {
        publicAPI.deleteProxy(repProxy);
      });
      proxy.setContainer(null);
      unRegisterProxy(proxy);
      if (publicAPI.getActiveView() === proxy) {
        publicAPI.setActiveView(publicAPI.getViews()[0]);
      }
    } else if (group === 'representations') {
      const { sourceId, viewId } = model.r2svMapping[proxy.getProxyId()];
      const view = publicAPI.getProxyById(viewId);
      view.removeRepresentation(proxy);
      delete model.r2svMapping[proxy.getProxyId()];
      delete model.sv2rMapping[sourceId][viewId];
      unRegisterProxy(proxy);
    } else if (group === 'sources') {
      const viewToRep = model.sv2rMapping[proxy.getProxyId()];
      Object.keys(viewToRep).forEach((viewId) => {
        publicAPI.deleteProxy(viewToRep[viewId]);
      });
      unRegisterProxy(proxy);
      if (publicAPI.getActiveSource() === proxy) {
        publicAPI.setActiveSource(publicAPI.getSources()[0]);
      }
    } else {
      unRegisterProxy(proxy);
    }

    // Delete the object itself
    proxy.delete();
  };
}
