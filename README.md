# jmolwidgets

[![Build Status](https://travis-ci.org/EPFL/jmolwidgets.svg?branch=master)](https://travis-ci.org/EPFL/jmolwidgets)
[![codecov](https://codecov.io/gh/EPFL/jmolwidgets/branch/master/graph/badge.svg)](https://codecov.io/gh/EPFL/jmolwidgets)


A custom Jupyter Lab widget for Jmol/Jsmol

## Installation

You can install using `pip`:

```bash
pip install jmolwidgets
```

Or if you use jupyterlab:

```bash
pip install jmolwidgets
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] jmolwidgets
```
For development:
```
pip install -e .
jupyter nbextension install --py --symlink --sys-prefix jmolwidgets
jupyter nbextension enable --py --sys-prefix jmolwidgets
jlpm
jlpm run Build
jupyter labextension install . 
```
