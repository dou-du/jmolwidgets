// Copyright (c) Dou Du
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

// Import the CSS
import '../css/widget.css';

// Import the underscore.js
import * as _ from 'underscore';
import $ from 'jquery';

declare var Jmol: any;

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

  initialize() {
        DOMWidgetModel.prototype.initialize.apply(this, arguments);
        this.attributes['jmol_window_id'] = _.uniqueId('jmol_window');
        this.attributes['jmol_app_id'] = _.uniqueId('jmol_app');
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
    template = _.template("<div id='jsmolapp' style='border:3px solid red; height: " + 500 +
                          "px; width: " + 500 + "px; margin:0 auto;'>");

    createDiv() {
        const jsmolwindowID = this.model.get('jmol_window_id');
        console.log(jsmolwindowID+"&*&*&*&*&*&*");
        const divstyle = $("<div id='"+ jsmolwindowID + "' style='border:3px solid red; height: " +
                             500 + "px; width: " + 500 + "px; margin:0 auto;'>");
        return(divstyle);
    }

  initialize(): void {

    const url = "https://chemapps.stolaf.edu/jmol/jsmol/JSmol.min.js";
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.onload = () => this.createView();
    document.querySelector("head")!.appendChild(script);
  }

    createView() {
        const jsmolwindowID = this.model.get('jmol_window_id');
        const jsmolappID = this.model.get('jmol_app_id');

        var that = this;
        (<any>window).set_measure = (a: any, b: any, c: any, d: any, e: any)=>{
            console.log("The distance is:" + e);
            that.model.set('measure_distance', Number(e));
            that.touch();
        };

        (<any>window).set_pickcallback = (a: any, b: any, c: any)=>{
            console.log("The picked atomno:" + c);
            that.model.set('atomno', Number(c));
            that.touch();
        };

        $(document).ready(function() {
            var Info = {
                addSelectionOptions: false,
                debug: false,
                j2sPath: "https://chemapps.stolaf.edu/jmol/jsmol/j2s",
                readyFunction: null,
                script: "background black; frank on; cartoon on; spacefill off; wireframe off; backbone 1.5; color backbone chains",
                serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",
                src: null,
                use: "HTML5",
                height:"100%",
                width:"100%",
                MeasureCallback: "set_measure",
             };

        $("#"+jsmolwindowID).html(Jmol.getAppletHtml(jsmolappID, Info));
        Jmol.script(eval(jsmolappID), "load https://files.rcsb.org/view/1zaa.pdb;");
        Jmol.script(eval(jsmolappID), 'set pickCallback "set_pickcallback"');
    });

    }

    render() {
      //  this.el.classList.add('custom-widget');
      //  this.$el.html(this.template);
    this.$el.append(this.createDiv());
    this.createView();

    this.model.on('change:script', this._script_changed, this);
    this.model.on('change:structure', this._structure_changed, this);

      //  this.model.on('change:value', this._value_changed, this);
  }

  private _script_changed(){
    const jsmolappID = this.model.get('jmol_app_id');
    Jmol.script(eval(jsmolappID), this.model.get('script'));
  }

  private _structure_changed(){
    const base_url = window.location.origin.replace('/lab','');
    const jsmolappID = this.model.get('jmol_app_id');
    const the_script: string = "load " + base_url + '/files' + this.model.get('structure');
    console.log(the_script + "%&%&%&%&%&%*********");
    Jmol.script(eval(jsmolappID), the_script);
  }
//   _value_changed() {
//       this.el.textContent = this.model.get('value');
//   }
}
