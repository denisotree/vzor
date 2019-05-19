#!/usr/bin/env bash
gunicorn --reload vzor.wsgi -c ./gunicorn.py -b 0.0.0.0:8000