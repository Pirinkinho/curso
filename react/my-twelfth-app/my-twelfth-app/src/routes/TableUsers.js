// src/routes/TableUsers.js
import React, { useState, useEffect } from "react";
import { useLoaderData, useActionData } from "react-router-dom";
import Table from "./Table";
import UserForm from "./UserForm";

const TableUsers = () => {
  const users = useLoaderData();
  const userAdded = useActionData();
  const [people, setPeople] = useState(users);

  useEffect(() => {
    if (userAdded) {
      const newUser = {
        id: userAdded.id,
        name: userAdded.firstName,
        job: userAdded.company.title,
      };
      setPeople((p) => [newUser, ...p]);
    }
  }, [userAdded]);
  const removePeople = (index) => {
    setPeople(
      people.filter((character, i) => {
        return i !== index;
      })
    );
  };
  const handleSubmit = (character) => {
    setPeople([...people, character]);
  };
  const title = <h1>{people.length} Nice people!</h1>;
  return (
    <div className="container">
      <UserForm handleSubmit={handleSubmit} />
      <Table peopleData={people} removePeople={removePeople} title={title} />
    </div>
  );
};

// class TableUsers extends React.Component {
//   state = {
//     people: [],
//   };
//   removePeople = (index) => {
//     const { people } = this.state;
//     this.setState({
//       people: people.filter((character, i) => {
//         return i !== index;
//       }),
//     });
//   };
//   handleSubmit = (character) => {
//     this.setState({ people: [...this.state.people, character] });
//   };
//   render() {
//     const title = <h1>Nice People</h1>;
//     return (
//       <div className="container">
//         <Table
//           peopleData={this.state.people}
//           removePeople={this.removePeople}
//           title={title}
//         />
//         <Form handleSubmit={this.handleSubmit} />
//       </div>
//     );
//   }
// }

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const fields = Object.fromEntries(formData);
  let user = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName: fields.name,
      lastName: "test",
      age: 250,
      company: {
        title: fields.job,
      },
    }),
  });
  user = await user.json();
  return user;
}

export async function loader() {
  // throw new Error("oh an error");
  const url = "https://dummyjson.com/users";
  let usersApi = await fetch(url);
  usersApi = await usersApi.json();
  const users = usersApi.users.map((user) => {
    return {
      id: user.id,
      name: user.firstName,
      job: user.company.title,
    };
  });
  return users;
}

export default TableUsers;
