#!/bin/bash
# Mix and match a set of values for position and size cue-settings

position=(10 50 90)
size=(10 50 90)
filename='position-size-'
ext=vtt

for p in ${position[*]}; do
  for s in ${size[*]}; do
cat << EOF > "$filename$p-$s.$ext"
WEBVTT

00:01.000 --> 00:02.000 position=$p% size=$s%
Events are relative to the observer.
Time is also relative to the observer.
You already know that "time flies by when you're having fun."
EOF
  done
done
