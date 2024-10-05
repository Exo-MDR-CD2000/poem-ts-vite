# Vite App Using PoetryDB
Vite Project Creation
## Description

We were tasked with creating a Vite project with Typescript and refactoring the previous CRUD application assignment into this new repository. The project is more of a complete rewrite from the original project. The second time working on the PoetryDB api was much smoother and I was able to resolve some older bugs from the initial project. Saving poems from the api search results now works as intended as well as creating new poems and deleting existing poems from the local database. 

If I had more time, I would have implemented a working Update method so that a user can update existing saved poems. One other developer issue I faced was trying to figure out why the delete functionality stacks delete request after the initial one. That is something else to look into later, but for now, it works as intended even if it is a brute force method.



## Usage

To get a local copy up and running follow these simple steps. This also assumes you have json-server package installed globally on your machine.

1. **Clone the repo (SSH Method Below)**
    ```sh
    git clone git@github.com:Exo-MDR-CD2000/poem-ts-vite.git
    ```
2. **Install required packages**
    ```sh
    npm install
    ```
3. **Start Json-server within the project repo in a new terminal**
    ```sh
    json-server --watch src/db/db.json
    ```
4. **Open a second terminal in the project repo to start Vite**
    ```sh
    npm run dev
    ```

You can grab a random poem and remove it off the page. Use the dropdown menus to search by author or title. Note that you can only use either or, or else the search function will default to searching by author. You can then expand the poem lines and save a poem to the local database. Test out the create new poem form and add those as well. If you want to remove poems, simply delete the poem with the red delete button. Editing functionality is not yet implemented.

## Link(s)

- Promineo Videos and Independent Research
- [Github Repo](https://github.com/Exo-MDR-CD2000/poem-ts-vite)
- [Json-server docs](https://www.npmjs.com/package/json-server)
- [FreeCodeCamp: json-server tutorial](https://www.freecodecamp.org/news/json-server-for-frontend-development/)
- [PoetryDB Docs](https://poetrydb.org/index.html)