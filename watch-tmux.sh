#!/bin/sh
tmux new-session -d 'tsc -w --pretty'
tmux split-window -v 'npm run test'
tmux split-window -h 'npm run start'
tmux -2 attach-session -d
