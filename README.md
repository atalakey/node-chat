# node-chat

A NodeJS app.

The app uses the Express and the socket.io frameworks to create a chat app.

## App description (two web pages)

### join (HTTP method: GET, Path: /)
A join chat page where the user can provide his/her name and the name of the chat room to join.

### chat (HTTP method: GET, Path: /chat.html)
A chat page where the user can send messages and share his/her location to all other users in the same chat room.

## Installation

Be sure to have NodeJS installed.

### Prerequisites:
```
You must have nodejs installed.
```

### To install the prerequisites (macOS only)
```
1. Install Homebrew:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Install nodejs:

    brew install node
```

### To use the application:
``` 
1. Clone the project:

    git clone https://github.com/atalakey/node-chat.git ~/Desktop/node-chat

2. Navigate to where you cloned the project:

    cd ~/Desktop/node-chat

3. Install App local packages:

    npm install
```

## Run the App

```
- Start the node express server:

    npm start

- Start the node express server and watch any changes:

    nodemon server/server.js
```

## Run the test suite

```
- Start the mocha test framework:

    npm test

- Start the mocha test framework and watch any changes:

    npm run test-watch
```

# Disclaimer:
This app is for demo purposes only.
