# browser-gaming

## Building

Run `nx build browser-gaming` to build the library.

## Running unit tests

Run `nx test browser-gaming` to execute the unit tests via [Jest](https://jestjs.io).

## Running the prototype index.html

- Build the library
- Serve the folder via http and navigate to the index.html at the root of the library

## TODO

- Remove jank from scrolling by normalizing requestAnimationFrame invocations by time elapsed from last render
- Load assets via JavaScript instead of `<img` tags in the index.html (goal is to load this app w/ a single import statement)
- Clean up code and export reusable bits from the library
- Move non-reusable bits to a separate application that imports the reusable bits
