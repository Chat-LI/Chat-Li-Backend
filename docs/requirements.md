# Software Requirements

## Vision

### What is the vision of this product?

‘Chat-LI’ is a CLI that allows users to communicate via the terminal. Users will be able to create accounts as well as rooms by using the ‘Chat-LI’ API. After this they can use the CLI to chat with other users connected to the same room. Be a command line hero with ‘Chat-Li’ and enjoy communicating with friends in a new exciting, and colorful, way!

### What pain point does this project solve?

People want to communicate. This is a streamlined, stripped-down CLI program that allows them to communicate with others.

### Why should we care about your product?

We provide a space for connecting. We create a place where you can chat about topics of interest with a group of other interested users. You can also choose to chat privately with other users.

## Scope (In/Out)

IN - What will your product do

- The app will be a CLI file that a user executes to start the app
- Users will be able to log in as a unique user
- The app will allow users to chat in their command line
- The app will have "rooms" centered around various interests

OUT - What will your product not do

- Users message history will not persist

### Minimum Viable Product vs

What will your MVP functionality be?

- user can log in and have credentials verified
- users can chat with other users in public topic rooms
- admins can create and delete rooms

### Stretch

- private rooms
- chat commands
- direct private messages

## Functional Requirements

1. An admin can create and delete user accounts
1. A user can update their profile information
1. A user can search all of the products in the inventory

### Data Flow(MVP)

User executes CLI file to start the app. User is then prompted to register/login and is authenticated. User is asked if they want to join a room and is presented with a list of available rooms. User chooses a room by typing the name/number of that room. User is now inside of room. Once inside, User is a ble to interact with other users by typing comments and posting them via the "return" key. User can log out by running "ctrl + c".

## Non-Functional Requirements (301 & 401 only)

1. Security: user must create an account and log in to use the app.
1. Testability: bug-free due to thorough unit testing. We will have CI/CD to implement this.
