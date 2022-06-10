const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const data = require('./data');
app.use(bodyParser.json());

app.get('/todos', (request, response) => response.status(200).json(data.todos));

app.post('/todos', (request, response) => {
    const newTodo = { 
        id: data.todos.length + 1,
        title: request.body.title,
        description: request.body.description,
        timestamp: request.body.timestamp,
        status: request.body.status
    }
    data.todos.push(newTodo);
    return response.status(200).json(data.todos);
});

app.put(`/todos/:id`, (request, response) => {
    const todoToUpdate = data.todos.find(todo => todo.id == request.params.id)
    todoToUpdate.title = request.body.title;
    todoToUpdate.description = request.body.description;
    todoToUpdate.timestamp = request.body.timestamp;
    todoToUpdate.status = request.body.status;
    return response.status(200).json(todoToUpdate);
})

app.listen(port);