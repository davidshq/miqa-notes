# MIQA Notes

## Introduction
This repository contains various informational resources related to the [MIQA open source project](https://github.com/openimaging/miqa) that are not part of the core application.

Currently this includes a number of diagrams created with [draw.io](https://draw.io/) that show the flow through various portions of the MIQA application.

## Accuracy
These informational resources are not canonical and likely contain errors / incomplete information. Feel free to help improve these resources.

## Sample Images
MIQA comes with a few sample images one can load into the software and use for testing purposes. For additional NIFTI images you might use [RIDER Lung CT Collection from the Cancer Imaging Archive](https://wiki.cancerimagingarchive.net/display/Public/RIDER+Lung+CT).

## Code
Currently contains the output of objects from the TS source code for easy reference.

## Debugging
Note that not all code runs on the `django` instance, Celery related code (e.g. that in `tasks.py`) runs in the `celery` instance. If you are using a debugger on the `django` instance it will not catch the code that is executed on Celery.