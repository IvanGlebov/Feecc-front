# Feecc Workbench Frontend

A web interface for employee interaction with the Feecc platform.

### Before starting

Clone the repository to the directory you need. Go to the project directory and run in the command line:

```
 sudo npm install
```

This will install all required dependencies and may take some time depending on your internet speed.

### Test launching

To launch in developer mode, run the command:

```
npm run dev-server
```

### Full deployment

To prepare the application for deployment, run the command:

```
npm run build
```

After that, the `target` folder will be created in the root folder of the project, in which all the files necessary for work will be located. The root HTML file is `index.html`.

### Deployment with Docker

For ease of deployment, there is a Docker container and prepared Docker Compose.
In the root directory of the project, you need to execute two commands:

```
docker-compose build
docker-compose up
```

After that, the container will be built and launched.

## About architecture

The project is written using [Redux](https://redux.js.org/) and [immutable.js](https://immutable-js.com/), building is done using Webpack.

>When working with the Redux store, it's important to keep immutable.js in mind and not try to do something like this: `unitID: store.stages.unit.unit_internal_id`, instead of: `unitID: store.stages.getIn(['unit', 'unit_internal_id']}`. Without knowledge of immutable.js, `stagesReducer` is best left untouched.

### Configuration files

All available configuration files are located in the `.env` file. The production stages file is located in the `/configs` directory and is called `pages.csv`.

### Redux

All Redux store data is stored in `src/reducers`. The main store build and import file is located at `src/reducers/main.js`. The `src/reducers.common.js` file contains the store request types (see `types` in the `common.js` file), `fetchWrapper` и `axiosWrapper`. These two functions send all requests to the backend. The `reportError` function exists for the convenience of developing and trapping errors with Redux store.

All writes to `store`  are made in `src/reducers/stagesReducer.js`. All backend and `store` requests are handled in `src/reducers/stagesActions.js`.

### Translation

For translation, the `i18next` module and a self-written loader for translations from `.csv` are used. Translations are stored in `/public/translation.csv`.

> The first line of this file must not be changed without changing `i18next.js`.

### Basic styles

The color palette is in the `src/index.scss` file.

## About components

All padding is loaded into `App.js` depending on the state of `store` and `pathname`. Pathname will change dynamically during work, but this does not allow to freely proceed through the stages, since restoring the session will return the user to the current stage of production, if it is in progress.

Most of the logic is in `Composition.js`:

- Login.js — a component with a placeholder and requesting the server for user authorization.
- Header.js — a component for storing part of the logic for transition through pages and the logic for the page header.
- Menu.js — a component with a minimum of logic; two buttons to start the assembly and end the session.
- Composition.js — a component with the most logic. The transition through the assembly stages is placed here.
- Notifications.js — a component for displaying pop-up notifications.
- Stopwatch.js — a component for displaying stopwatches for each production stages.

## Configuration

To configure your Frontend deployment edit the environment variables, provided in `configs/config.json` file.

Environment variables:

- `socket` — insert the Workbench Daemon address here;
- `interface_language` — interface language, available en and ru options;
- `dev_show_reducers` — enabling/disabling developer mode;
- `pulling_period` — period of receiving data from the backend in milliseconds;
- `use_devtools` — using devtools;
- `show_test_schemas` — whether to show test schemes.
