import React, { useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { auth } from "utils/nhost";

const GET_TODOS = gql`
  subscription {
    todos {
      id
      created_at
      name
      completed
    }
  }
`;

const INSERT_TODO = gql`
  mutation($todo: todos_insert_input!) {
    insert_todos(objects: [$todo]) {
      affected_rows
    }
  }
`;

export default function App() {
  const { data, loading } = useSubscription(GET_TODOS);
  const [insertTodo] = useMutation(INSERT_TODO);
  const [todoName, setTodoName] = useState("");

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Link to="/login">Login</Link>
      <div onClick={() => auth.logout()}>Logout</div>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              await insertTodo({
                variables: {
                  todo: {
                    name: todoName,
                  },
                },
              });
            } catch (error) {
              alert("Error inserting todo");
              console.log(error);
            }
            alert("Todo inseted");
            setTodoName("");
          }}
        >
          <input
            type="text"
            placeholder="todo"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <button>Add todo</button>
        </form>
      </div>
      {!data ? (
        "no data"
      ) : (
        <ul>
          {data.todos.map((todo) => {
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
