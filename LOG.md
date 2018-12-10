# La Pela

La Pela is a web application to track personal finances. It is also an exercise
in configuring a realistic application using modern web technologies. This is
the appication's log, where I'll track the initial setup of the build pipeline.

## Chapter 1: A Basic Hello World Client Application

The first step consists in creating the initial application, without too many
bells and whistles. Just show "Hello World" in a client page.

### Steps
1. Create the main application directory `mkdir lapela`
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
