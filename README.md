# Webpack Hello World

Webpack Hello World is an exercise in configuring an application using
modern web technologies.

## Chapter 1: A Basic Hello World Client Application

The first step consists in creating the initial application, without too many
bells and whistles. Just show "Hello World" in a client page.

### Steps
1. Create the main application directory `mkdir webpack-hello-world`
2. Init the git repository `git init .`
3. Init the NPM package `npm init -y`
4. Create a `client` directory `mkdir client`
5. Create a `client/index.html`, `client/index.js` and `client/styles.css`
6. Visit index.html in browser

## Chapter 2: Serving the Application from Express

After we have a static web page with its style, now we should serve it from an
application server. For this, we'll need to copy the client application into a
static directory the web server uses. In a more realistic appliction, these
would be served by a static server such as Nginx, but we are concentrating on
the Node / JS stack for now.

### Steps
1. Create a `server` directory `mkdir server`
2. Install express `npm i -S express`
3. Install morgan `npm i -S morgan`
4. Create a `server/index.js`
5. Create a `.gitignore` file and add `node_modules` and `server/public`
6. Create a `server/public` directory
7. Add scripts `clean:assets` and `copy:assets` to package.json


## Chapter 3: Bundling the Client Files

Now that we have a functional server and client application, we will bundle the
client code into a single file. This will allow us to perform transformations on
the code (such as compiling it from Typescript, minify it, etc) and bundle it
into a single file.

### Steps
1. Install webpack `npm i -D webpack webpack-cli`
2. Create a `webpack.config.js` file
3. Add a `build` step to `package.json`
4. Modify the `copy:assets` step to copy the bundle
5. Modify the `index.html` to use the bundle instead of `index.js`
6. Modify `.gitignore` not track `dist`

## Chapter 4: Bundling the Styles, Generating HTML and enabling Hot Reload

Right now we needed to explicitly add the script name into the HTML. This is not
great since we may have multiple bundles, or change the bundle names. Also, we
are just processing the Javascript code, and not the style. In this chapter we
will add bundling code for CSS and also generate the HTML automatically.

## Steps
1. Install `html-webpack-plugin`, `style-loader` and `css-loader` `npm i -D html-webpack-plugin style-loader css-loader`
2. Modify `webpack.config.js` to use those plugins
3. Modify `client/index.js` to include the `styles.css` file. Also add some logging.
4. Modify `client/index.html` to not include anything
5. Modify `copy:assets` in `package.json` to only copy the contents of `dist`
6. Install `webpack-dev-server`
7. Add a `dev` script in `package.json` to run hot reload

## Chapter 5: Use Tailwind

Now that our application has all functionality and the build pipeline performs
all the steps to generate our bundle and copy it to the server's public
directory. We can switch to more powerful tools that will help us for
larger-scale applications. First, we need a better CSS solution. There are many
options such as SCSS or Less. In this guide I will use a slightly more complex
one, Tailwind, which generates utility classes.

## Steps
1. Install Tailwind and its dependencies, PostCSS `npm i -D tailwindcss postcss-cli postcss-loader`
2. Initialize the tailwind configuration `./node_modules/.bin/tailwind init tailwind.config.js`
3. Create a `postcss.config.js` file
4. Update `webpack.config.js` to run postcss before css-loader
5. Update `styles.css` to include Tailwind directives
6. Update `client/index.html` to use Tailwind classes

## Chapter 6: Optimize Bundle Sizes

If you run `npm run build` and look at the `dist` directory contents, you'll see
that the `bundle.js` file is huge! This is because Tailwind generates many
classes for styling, and the CSS has comments that we don't need. There's three
problems with this: First, the browser loads the styles and the scripts in one
call, while it could load both in parallel. Second, the size contributed by
Tailwind is not justified, because we are not even using most of the
styles. Finally, our JS code contains a lot o comments and long variable names
that, while useful for development, add precious space to our bundle. In this
chapter we will solve these problems by separating the CSS from the JS code,
then purging the unused CSS classes, and finally uglifying the JS code.

Fortunately, we don't need to do anything to minify the JS code. Just run
`NODE_ENV=production npm run build` and look at the `bundle.js`. It should be
much smaller. Now variables have short names and comments are gone! However, we
still need to tell webpack to do the same for the CSS.

## Steps
1. Install `mini-css-extract-plugin` `npm i -D mini-css-extract-plugin`
2. Uninstall `style-loader`
3. Modify `webpack.config.js` to use mini-css-extract-plugin
4. Install `optimize-css-assets-webpack-plugin`
5. Modify `webpack.config.js` to use optimize-css-assets-webpack-plugin
6. Since we have overriden the minimizers, we need to add a JS one.
7. Install `npm i -D uglifyjs-webpack-plugin` and add it to `webpack.config.js`
8. Install `purgecss-webpack-plugin` and `glob` `npm i -D purgecss-webpack-plugin glob`
9. Add purgecss-webpack-plugin and a Tailwind processor to `webpack.config.js`
10. Add a `deploy` script in `package.json`

## Chapter 7: Generate Source Maps

If you run `deploy` and load your page, you should see the network requests are
quite small, probably less than 2KB per file. However, one side effect of this
is when you try to debug your code, you'll just see gibberish. The solution for
this is to add source maps, which are files that map the minimized code into the
original source.

## Steps
1. Add the `devtool: source-map` entry to `webpack.config.js` and `sourceMap: true` to `uglifyjs-webpack-plugin`
2. Modify the `optimize-css-assets-webpack-plugin` to generate annotations

## Chapter 8: Switch to Typescript

We now have a full build pipeline that can process our JS and CSS source code
and bundle and optimize it for a production-grade application. The next step is
to switch from vanilla JS to Typescript.

## Steps
1. Install `typescript` and `ts-loader` `npm i -D typescript ts-loader`
2. Install the `express` types `npm i -D @types/express`
3. Rename all `.js` files to `.ts`
4. Create `tsconfig.json`
5. Add `ts-loader` and `.ts` extensions to `webpack.config.js`
6. Install `ts-node` to run the server `npm i -D ts-node`
7. Add a `server` script to `package.json` to run the server

## Chapter 9: Add Code Linting and Prettifying

After configuring all the pipelines to generate all our code, it is time to make
sure the code itself looks great. There are two tools that help us with this:
code prettifyers and code linters. The first type just format source files so
that they follow a set of conventions such as using single quotes instead of
double quotes. The second type of tools is more complex and performs static
analysis on the code to ensure there are no potential bugs, for example when we
forget to declare a member access type in Typescript.

## Steps
1. Install `prettier` globally `npm i -g prettier`
2. Create a `.prettierrc` file
3. Configure your editor to use prettier, format on save, etc.
4. Install `tslint`, `tslint-loader` and its configurations `npm i -D tslint tslint-loader tslint-config-prettier tslint-config-standard`
5. Create a `tslint.json` configuration file
6. Modify `webpack.config.js` to process `.ts` files with `tslint`

## Chapter 10: Add React

Having configured Typescript and the rest of the pipeline, we can now move our
client-side code to React. We'll use everything we have until now, plus add a
new loader for .ts and .tsx files that compiles JSX + Typescript into Javascript.

## Steps
1. Install `react`, `react-dom` and their types `npm i -S react react-dom` `npm i -D @types/react @types/react-dom`
2. Modify `webpack.config.js` to add support for `.tsx` files
3. Modify `tsconfig.json` to enable `jsx` support
4. Modify `index.html` and `client/index.ts` to mount a react component
5. Rename `client/index.ts` to `client/index.tsx`
6. Create a `client/component/HelloWorld.tsx` file
