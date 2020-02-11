#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Dou Du.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

import ipywidgets as widgets
from ipywidgets import DOMWidget
from traitlets import Unicode, Int, observe, List, Float
from ._frontend import module_name, module_version

out = widgets.Output(layout={'border':'1px soild red'});

class WidgetJmol(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('JmolModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('JmolView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    value = Unicode('Hello World!').tag(sync=True)
    script = Unicode('').tag(sync=True)
    structure = Unicode('').tag(sync=True)
    measure_distance = Float().tag(sync=True)

    atomno = Int().tag(sync=True)
    _inital_orientation = List([]).tag(sync=True)
    _current_orientation = Unicode('').tag(sync=True)
    count = Int(0).tag(sync=True)

    @observe('atomno')
    def _pick_changed(self, change):
        with out:
            print(self.atomno)

    @observe('_current_orientation')
    def _orientation_changed(self, change):
        print(self._current_orientation)

    @observe('measure_distance')
    def measure_distance_changed(self, change):
        with out:
            print(self.measure_distance)
