# Project for CS: Web Development 2020

## NBA Stats

API used for getting data https://www.balldontlie.io/

## Challenge

The main Challenge for this project was using react without any external state management package.

I introduced my implementation of redux like flow, on each page, there is only one point of truth for data, this data is handled by JS Closure and every react component is subscribed to this object and re-renders depending on state change.

Also, i have not used react's built-in state functionality in any of my components, so react is used only for View components and nothing else.

# Commands

- `npm run build`: Build files to the `dist` folder.
- `npm run start:dev`: Run `webpack-dev-server` at `localhost:9000`.
- `npm run start`: Builds files and runs a local production server on `localhost:8080`
- `npm run run lint:(js|styles|html)`: linter stuff
