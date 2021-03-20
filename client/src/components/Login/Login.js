import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useHistory} from 'react-router-dom';
import "./Login.css";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  async function validateForm(event) {
    var re = /\S+@\S+\.\S+/;
    if((email==="admin"||re.test(email))&&(email.length > 0 && password.length > 0))
    {
      (async () => {
        const rawResponse = await fetch('http://localhost:4000/signin', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email, password: password})
        });
        console.log(rawResponse);
      })();
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
      else if(email !=="admin" && !re.test(email))
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
    <div className="Login">
    <Card className='SignInCard shadow-lg p-3 mb-5 bg-white rounded'>
    <Card.Body>
    <Card.Title>Sign In</Card.Title>
    <Form onSubmit={validateForm}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
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
