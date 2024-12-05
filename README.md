# Lifetest

<p align="center">
  <img width="500px" src="src/assets/images/logo-blank.png" />
</p>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

This is a project made for the Vantiva company. Its primary purpose is to serve as a front-end to a router testing system which is composed of racks, each having 4x12 routers, totalizing 48 routers total.

Every router is monitored by continuous telemetries delivered by hardware transmitted through the MQTT protocol. Information about the router status is displayed on screen. If an error occurs, the system notifies the administrator, both in the front-end and by e-mail. 

The racks employ the following procedures to the routers:
- **Power cycle**, shutting down the entire rack and powering it up again a few times a day
- **Low voltage**, the router works in a lower than normal tension
- **High voltage**, the router works in a higher than normal tension

The routers are thoroughly stressed by these methods. The condition to make sure the routers have no errors is if its internet connection leds (2G and 5G) light up and if the ethernet ports are fully functional. All the while telemetry is collected to assert the status of each router. The telemetry contains data from some sensors inside the rack, the led and the ping status. If one of the internet connection leds or ethernet port malfunctions then an error is returned in the telemetry. Falty routers can be taken out of the rack for repair.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
