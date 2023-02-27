import React, { useEffect, useState } from "react";
import { User } from "./Components/User";
import { AddUser } from "./Components/AddUser";
import Pagination from "./Components/Pagination";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const [itemsPerPage,setItemsPerPage] = useState(2)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  console.log(users)

  let indexOfLastItem = currentPage * itemsPerPage

  let indexOfFirstItem = indexOfLastItem - itemsPerPage
  

  let showTheseItems = users.slice(indexOfFirstItem,indexOfLastItem)

  console.log(users)
  console.log("items",itemsPerPage)

  const onAdd = async (title, body,id) => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        id:id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = async (postId, title, body) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        body: body
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = users.map((user) => {
          if (user.id === postId) {
            user.title = title;
            user.body = body;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (postId) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== postId;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <AddUser onAdd={onAdd} />
      {showTheseItems.map((user) => (
        <User
          id={user.id}
          key={user.id}
          title={user.title}
          body={user.body}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      <Pagination users = {users}showTheseItems= {showTheseItems} itemsPerPage={itemsPerPage} currentPage={currentPage}
      setCurrentPage={setCurrentPage}/>
    </div>
  );
}
