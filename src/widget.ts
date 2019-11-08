// Copyright (c) Dou Du
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

// Import the CSS
import '../css/widget.css'

//import Jsmol librar

export
class JmolModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: JmolModel.model_name,
      _model_module: JmolModel.model_module,
      _model_module_version: JmolModel.model_module_version,
      _view_name: JmolModel.view_name,
      _view_module: JmolModel.view_module,
      _view_module_version: JmolModel.view_module_version,
      value : 'Hello World Dou'
    };
  }

  static serializers: ISerializers = {
      ...DOMWidgetModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'JmolModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'JmolView';   // Set to null if no view
  static view_module = MODULE_NAME;   // Set to null if no view
  static view_module_version = MODULE_VERSION;
}


export
class JmolView extends DOMWidgetView {
  render() {
    this.el.classList.add('custom-widget');

    this.model.on('change:value', this._value_changed, this);
  }

  _value_changed() {
      this.el.textContent = this.model.get('value');
  }
}
