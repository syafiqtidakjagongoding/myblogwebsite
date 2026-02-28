#!/bin/bash

for file in *.png; do
    magick "$file" "${file%.png}.webp"
done

for file in *.jpg; do
    magick "$file" "${file%.jpg}.webp"
done

