import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useHistory} from 'react-router-dom';
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [errEmail, setErrEmail] = React.useState(false);
  const [propEmail, setPropEmail] = React.useState(false);
  const [errPass, setErrPass] = React.useState(false);
  const EmptyEmail = () => (
    <div className="email-null">
      Email can't be empty.
    </div>
  );
  const EmptyPass = () => (
    <div className="pass-empty">
      Password can't be empty.
    </div>
  );
  const ProperEmail = () => (
    <div className="email-proper">
      Enter proper email.
    </div>
  );
  async function changeMailStatus()
  {
    if(email.length > 0)
    {
      setPropEmail(false);
      setErrEmail(false);
    }
  }
  async function changePwdStatus()
  {
    if(password.length > 0)
    {
      setErrPass(false);
    }
  }
  async function validateForms(event) {
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)&&(email.length > 0 && password.length > 0))
    {
      history.push('../home');
    }
    else
    {
      event.preventDefault();
      if(email.length === 0)
      {
        setErrEmail(true);
        setPropEmail(false);
      }
      else if(!re.test(email))
      {
        setPropEmail(true);
        setErrEmail(false);
      }
      else
      {
        setPropEmail(false);
        setErrEmail(false);
      }
      if(password.length === 0)
      {
        setErrPass(true);
      }
    }
  }

  return (
    <div className="Register">
    <Card className='SignUpCard shadow-lg p-3 mb-5 bg-white rounded'>
    <Card.Body>
    <Card.Title>Sign Up</Card.Title>
    <Form onSubmit={validateForms}>
    <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {setEmail(e.target.value);changeMailStatus()}}
          />
          { errEmail ? <EmptyEmail /> : null }
          { propEmail ? <ProperEmail /> : null }
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);changePwdStatus()}}
          />
          { errPass ? <EmptyPass /> : null }
        </Form.Group>
        <Button variant="warning" block size="lg" type="submit" >
          Login
        </Button>
      </Form>
      </Card.Body>
      </Card>
    </div>
  );
}
