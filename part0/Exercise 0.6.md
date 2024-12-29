New note in Single page app diagram

Situation where User creates a new note
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>+server: GET request to https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>-browser: HTML Document spa.html

    browser->>+server: GET request to https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>-browser: main.css StyleSheet 

    browser->>+server: GET request to https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>-browser: spa.js script

    Note right of browser: Browser starts executing the JS code

    browser->>+server: GET request to https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>-browser: data.json file

    Note right of browser: Browser requests for logo of the page
    browser->>+server: GET request to https://studies.cs.helsinki.fi/favicon.ico
    server-->>-browser: 404 file not found error 

    browser->>+server: POST data to the server at https://studies.cs/helsinki.fi/exampleapp/new_note_spa
    server-->>-browser: 201 created
    Note left of server: 201 means new resoucrse has been created on the server
```