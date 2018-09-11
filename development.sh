#!/bin/bash

if [[ -z $(which tmux) ]]; then
  echo "tmux is required to run this script\n"
  echo "https://github.com/tmux/tmux/wiki"
  exit 1
fi

if [[ -z $(which entr) ]]; then
  echo "entr is required to run this script"
  echo "http://entrproject.org/"
  exit 1
fi

name=$(basename $(pwd))

function killServer {
  tmux kill-session -t $name 1>/dev/null 2>&1
}

function startServer {
  tmux new-session -d -s $name 'python -m SimpleHTTPServer'
}

trap killServer EXIT
echo "Listening on port :8000" && startServer

find . -type f -name '*.elm' ! -path '*elm-stuff*' | entr -s '\
  elm make --output Main.js src/Main.elm'
