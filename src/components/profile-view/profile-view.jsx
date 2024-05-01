import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, Form, Container } from 'react-bootstrap';
import { UserInfo } from './user-info'
import { FavouriteMovies } from './favourite-movies';
import { UpdateUser } from "./update-user";

export const ProfileView = ({localUser, movies, token}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(storedUser.username);
  const [password, setPassword] = useState(storedUser.password);
  const [email, setEmail] = useState(storedUser.email);
  const [birthday, setBirthday] = useState(storedUser.birthday);
  const [user, setUser]= useState();
  const favoriteMovies = user === undefined ? [] : movies.filter(m => user.favoriteMovies.includes(m.title))
  
  const formData = {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
    };
    const handleSubmit = (event) => {
      event.preventDefault(event);
      fetch(`${process.env.REACT_APP_API_URL}/users/${user.username}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`          
        }
      }).then((response) => {
        if (response.ok) {
          alert("User information updated successfully");
          window.location.reload();

          return response.json()
        } else {
          alert("User information update failed");
        }
      }).then((user) => {
        if (user.ok) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user)
            }
      })
       .catch((error) => {
        console.error(error)
      });
    };

    const handleUpdate = (e) => {
        switch(e.target.type) {
            case "text":
              setUsername(e.target.value);
              break;
            case "email":
              setEmail(e.target.value);
              break;
            case "password":
              setPassword(e.target.value);
              break;
            case "date":
              setBirthday(e.target.value);
              default:
          }
      }

    const handleDeregisterUser = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${storedUser.username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        }).then((response) => {
        if (response.ok) {
            alert("User successfully deleted");
            window.location.reload();
        } else {
            alert("User account deletion failed");
        }
        }) .catch((error) => {
        console.log(error)
        });
    };

    useEffect(() => {
        if (!token) {
          return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then((response) => response.json())
          .then((data) => {
              console.log("Users data: ", data);
              const usersFromApi = data.map((resultUser) => {
              return {
                id: resultUser._id,
                username: resultUser.username,
                password: resultUser.password,
                email: resultUser.email,
                birthday: resultUser.birthday,
                favoriteMovies: resultUser.favoriteMovies
              };
            });
            setUser(usersFromApi.find((u) => u.username === localUser.username));
          //   localStorage.setItem('user', JSON.stringify(user));
            console.log("Profile Saved User: " + JSON.stringify(user));
          //   storedUser = user;
          })
          .catch((error) => {
              console.error(error);
            });
      }, [token]);

  return (
    <Container>
        <Row>
        <Card className="mb-5">
            <Card.Body>
                <Card.Title>My Profile  </Card.Title>
                    <Card.Text>
                        {
                            user && (<UserInfo name ={user.username} email={user.email} />)
                        }
                    </Card.Text>              
            </Card.Body>            
        </Card>
        <Card className="mb-5"> 
        <Card.Body>
          <UpdateUser 
           formData={formData}
           handleUpdate={handleUpdate}
           handleSubmit={handleSubmit}
           handleDeregisterUser={handleDeregisterUser}
           />
           </Card.Body>
           </Card>      
    </Row>
    <Row>
        <Col className="mb-5" xs={12} md={12}>
            {
                favoriteMovies && (<FavouriteMovies user={user} favoriteMovies={favoriteMovies} />)
            }
        </Col>
      </Row> 
        <Row>
            <Col md={5}>
                <div>
                <h3>User Profile</h3>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="signUpFormUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                        />
                    </Form.Group>

                    <Form.Group controlId="signUpFormPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </Form.Group>

                    <Form.Group controlId="signUpFormEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </Form.Group>

                    <Form.Group controlId="signUpFormBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="submit">
                        Update User Info
                    </Button>
                </Form>
                </div>
            </Col>
            <Col md={2}></Col>
            <Col md={5}>
                <div>
                <h3>Favorite Movies</h3>
                <p></p>
                <span>Place marker</span>
                </div>
            </Col>
            <Link to="/">Back to Home</Link>
        </Row>
        <Row className="justify-content-md-center">
            <Col md={5}>
            <h3>Delete your Profile</h3>
                <Form onSubmit={handleDeregisterUser}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">
                    Deregister
                </Button>
                </Form>
            </Col>
        </Row>
    </Container>
  );
};

