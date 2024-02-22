# Propelr Test

A simple full-stack web application that allows a user to view properties from a listing and add new properties. 

* React on the frontend
* Node on the backend
* TypeScript
* Jest

# How to run

```
npm install

cd server
npm install
npm run dev

cd ../client
npm install
npm start
Y
```

Then visit `http://localhost:3001/api/properties`.

# Key decisions
* I used an MVC pattern for the backend which isn't always the most common practice with Node.JS, but I think is a really useful approach especially for a CRUD application like this.
* I decided to leave the application with the manual refresh to display properties after a property has been added. The alternative was to implement a solution using WebSocket, which I thought was too complex for the purposes of this test.

# If I had more time...

* User Authentication: registering, logging in and managing properties with a user profile and saving properties.
* Images: Implement good image storage and display, and the option to include multiple images.
* Saved property alerts: Users saving properties they are interested in, and getting alerts when similar properties come up.
* External statistics: Enrich listings with information about school ratings, neighbourhood demographics, and a map to show location.
* Messaging and communication: For buyers and sellers to be able to communicate over the platform.