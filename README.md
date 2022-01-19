# THE OVERLOOK HOTEL

![photo of hotel clients at a party](https://user-images.githubusercontent.com/78453792/150059396-2884e7f4-4794-47ae-a64c-19a32d6192b5.png)

## Table of Contents
  - [Introduction](#introduction)
  - [Overview and Features](#overview)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Contributors](#contributors)

## Introduction <a name="introduction"></a>

Welcome to the Overlook Hotel, we're dying for you to join us....

The application is a hotel management tool where customers can log in, book a room, and view both their past and future reservations. This was the final solo project for Mod 2 of the Front End Engineering program at the Turing School of Software & Design.

## Overview and Features <a name="overview"></a>

When a user visits the application, they are presented with a photograph of some of our favorite guests! One can see that The Overlook is a place where you can have so much fun, it can be downright deadly! Click on the login button on the top right, if you dare. You can only book a room once you're logged in. 
One of the learning goals of this project was practicing some login authentication. A valid username will start with 'username' and end with a number between 1 and 50 (there are 50 users in the users API). All users have the same password: overlook2021. 

### User Login 

![login](https://user-images.githubusercontent.com/78453792/150062552-1bd78c33-daff-4c90-a075-ad9e5161e3c8.gif)

### User Dashboard

Once the user has successfully logged onto the site, you can view a user dashboard where they may see how much they have spent to date and all of their reservations--past or upcoming. All stays on this app are for one night only--the dropdown calendar does not allow multiple nights to be selected. 

![viewcurrentpastbookings](https://user-images.githubusercontent.com/78453792/150062493-59848ad9-1728-4cd9-9ee0-00311399e78c.gif)

### Search Rooms

Users may choose a date and filter available rooms by room type.

![searchrooms1](https://user-images.githubusercontent.com/78453792/150062313-d3d9c51f-b3ac-420c-b0fe-d67fa1727735.gif)

### Book a Room

If a user wants to book a room, they can click the book room button and they will see a successful message if the booking was successful. They will also see the new reservation appear in their future bookings. The user may also clear their search and search for a new date and/or type. 

![successfulbooking](https://user-images.githubusercontent.com/78453792/150062585-97dec410-3d5d-4f09-936e-c2973a34dd3f.gif)

## Technologies <a name="technologies"></a>

- Javascript
- SCSS/SASS
- HTML5
- Fetch API
- webpack
- NPM
- moment.js
- Mocha
- Chai
- EsLint 
- Lighthouse Accessibility Audit

## Setup <a name="setup"></a>

1. Clone down the [Overlook Hotel API](https://github.com/turingschool-examples/webpack-starter-kit)
2. `cd` into the directory
3. Rrun `npm install`
4. Run `npm start`
5. You should see the message: "Overlook API is now running on http://localhost:3001" in your terminal  
6. `cd` out of that directory then clone down [this repository](https://github.com/cagallo/overlook-hotel)
7. Run `npm install`
8. Run `npm start` in your terminal
9. Go to http://localhost:8080/ and you should see the website
10. Enter `control + c` in your terminal to stop the server(s) at any time.

## Contributors <a name="contributors"></a>

- [Cesare Gallo](https://github.com/cagallo)

- Code review by: [Enzo Jimenez-Soto](https://github.com/ejimenezsoto)
- Project Manager: [Nik Seif](https://github.com/niksseif)

