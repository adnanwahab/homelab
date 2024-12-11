#!/bin/bash

# Run ncdu while excluding node_modules directories
ncdu --exclude 'node_modules' .
