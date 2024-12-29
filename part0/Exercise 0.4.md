New Note Diagram:

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: Browser sends data to the server
    server-->>-browser: URL redirection to /exampleapp/notes

    Note Left of server: Server asks browser to perform new HTTP GET request to specified location

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>-browser: HTML Document

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>-browser: main.css StyleSheet

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>-browser: main.js Script

    Note right of browser: Exectuting JS Code that fetches JSON from server

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>-browser: data.json file 

    Note 

    browser->>+server: GET https://studies.cs.helsinki.fi/favicon.ico
    server -->>-browser: 404 File Not Found Error
```