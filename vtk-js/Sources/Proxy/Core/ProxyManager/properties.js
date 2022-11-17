// TODO: is the V for View?
export default function addVPropertyHandlingAPI(publicAPI, model) {
    // Property management

    publicAPI.getSections = () => {
      const sections = [];

      // We need a proxy source
      const source = publicAPI.getActiveSource();
      if (!source) {
        return [];
      }

      // TODO: Why is this declared here instead of after this if clause?
      const view = publicAPI.getActiveView();

      // If we have a source we get the proxy section
      if (source) {
        const section = source.getProxySection();
        // If there are ui properties, add them to our sections array
        if (section.ui.length) {
          sections.push(
            Object.assign(section, {
              collapsed: model.collapseState[section.name],
            })
          );
        }
      }

      // If we have a source and a view, get the proxy representation
      if (source && view) {
        const representation = publicAPI.getRepresentation(source, view);
        if (representation) {
          // Get the proxy's section
          const section = representation.getProxySection();
          // If there are ui properties, add them to our sections array
          if (section.ui.length) {
            sections.push(
              Object.assign(section, {
                collapsed: model.collapseState[section.name],
              })
            );
          }
        }
      }

      // If all three cases are true (2 above, this below)
      // we end up pushing three objects to the sections array
      // TODO: How does the data differ?
      if (view) {
        const section = view.getProxySection();
        if (section.ui.length) {
          sections.push(
            Object.assign(section, {
              collapsed: model.collapseState[section.name],
            })
          );
        }
      }
      return sections;
    };

    publicAPI.updateCollapseState = (name, state) => {
      model.collapseState[name] = state;
      publicAPI.modified();
    };

    publicAPI.applyChanges = (changeSet) => {
      const groupBy = {};
      const keys = Object.keys(changeSet);
      let count = keys.length;
      while (count--) {
        const key = keys[count];
        const [id, prop] = key.split(':');
        if (!groupBy[id]) {
          groupBy[id] = {};
        }
        if (changeSet[key] === '__command_execute__') {
          const obj = publicAPI.getProxyById(id);
          if (obj) {
            obj[prop]();
          }
        } else {
          groupBy[id][prop] = changeSet[key];
        }
      }

      // Apply changes
      const objIds = Object.keys(groupBy);
      count = objIds.length;
      while (count--) {
        const id = objIds[count];
        const obj = publicAPI.getProxyById(id);
        if (obj) {
          obj.set(groupBy[id]);
        }
      }
      publicAPI.modified();
      publicAPI.renderAllViews();
    };

    // Color management

    // Get, if necessary create, lookup table
    publicAPI.getLookupTable = (arrayName, options) => {
      if (!model.lookupTables[arrayName]) {
        model.lookupTables[arrayName] = publicAPI.createProxy(
          'Proxy',
          'LookupTable',
          { arrayName, ...options }
        );
      }
      return model.lookupTables[arrayName];
    };

    // Get, if necessary create, piecewiseFunction
    publicAPI.getPiecewiseFunction = (arrayName, options) => {
      if (!model.piecewiseFunctions[arrayName]) {
        model.piecewiseFunctions[arrayName] = publicAPI.createProxy(
          'Proxy',
          'PiecewiseFunction',
          { arrayName, ...options }
        );
      }
      return model.piecewiseFunctions[arrayName];
    };

    publicAPI.rescaleTransferFunctionToDataRange = (arrayName, dataRange) => {
      // lut = lookup table
      const lut = publicAPI.getLookupTable(arrayName);
      // pwf = piecewise function
      const pwf = publicAPI.getPiecewiseFunction(arrayName);
      lut.setDataRange(dataRange[0], dataRange[1]);
      pwf.setDataRange(dataRange[0], dataRange[1]);
    };
  }
