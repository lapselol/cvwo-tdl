# Just Do List - Task Management Web-App built with react.js and rails

- Name: Aaron Tan Gui Rong
- Matric No.: A0233197B

### Using the application

To test the web application without creating a new account, you may use 
the following email and password:

    Email: dev@dev.com
    Password: dev

## Known Bugs can be found in issues section of backend repository

## How to test locally

1. You need the following installations:
    - Ruby 2.7.0
    - Rails 6.1.4
    - PostgreSQL
    - React 17.0.2
2. Clone the backend and frontend repos:
    ```console
   $ git clone https://github.com/lapselol/cvwo-tdl
   $ git clone https://github.com/lapselol/cvwo-tdl-front
   ```
3. Install dependencies:

    in ~/tdl
    ```console
    bundle install
    ```
    in ~/tdl_api_user
    ```console
    npm install
    ```
4. Setup database:
    
    in ~/tdl
    ```console
    rake db:migrate
    ```

5. Start server:
    
    in root directory:
    ```console
    sudo service postgresql start
    ```
    in ~/tdl:
    ```console
    rails s -p 3001
    ```
    in ~/tdl_api_user
    ```console
    npm start
    ```
6. Open the web app at localhost:3000
