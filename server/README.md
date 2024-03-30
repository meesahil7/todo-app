## Features -->

1. Able to create todo, update and delete todo.
2. One user can only access the todos only if he has a valid token.
3. The user can update or delete only those todos which were created by himself.

## Routes -->

For login -> http://localhost:8080/user/login -> payload will be email address and password -> here in this app demo email and password is set according to the assignment. The credentials will be - {email: "admin@admin.com", password: "test1234"}

For todos -> http://localhost:8080/todo/todos
http://localhost:8080/todo/create
http://localhost:8080/todo/update/:id
http://localhost:8080/todo/delete/:id

             all apis above will be accessible only if user is authenticated with valid token
