import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import {
  Badge,
  Navbar,
  Container,
  InputGroup,
  Form,
  Button,
  Card
} from "react-bootstrap";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome"
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import User from "components/User";
import Nav from "components/Nav";
import api from "modules/api";
const portalUrl = "/portal";
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <Nav name="Kursvärderingsportalen" url={portalUrl}></Nav>
    <Router>
    <div>
      <Switch>
        <Route path={`${portalUrl}/courses/:CourseId`}>
          <Courses/>
        </Route>
        <Route path={portalUrl}>
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router>
</div>);
  }
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: []
    };
  };
  render() {
    const search = async (event) => {
      event.preventDefault();
      this.setState({
        search: await api.search(this.q.value)
      });
    }
    return <Container className="py-5 col-lg-8 col-xl-6">
    <h1>Sök kurser</h1>
    <Form className="py-3" onSubmit={search}>
      <InputGroup>
        <Form.Control
          ref={(q) => { this.q = q }}
          type="text"
          placeholder="Sök namn eller kurskod"
          aria-describedby="inputGroupAppend"
        />
        <InputGroup.Append>
          <Button><FontAwesomeIcon icon={faSearch}/></Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
    {this.state.search.map(item => <Link to={`${portalUrl}/courses/${item._id}`} key={item._id}>
    <Card className="my-3">
    <Card.Body>
    <Card.Title>{item.name}</Card.Title>
    <Badge className="float-right" variant="secondary" >{item.extent}{item.extentUnit}</Badge>
    <Card.Subtitle className="text-muted">{item._id}</Card.Subtitle>
    </Card.Body>
    </Card>
</Link>

  )}
  </Container>;
  }
}

function Courses() {
  let {
    CourseId
  } = useParams();
  var course = {};
  api.courses.get(CourseId).then(
    response => course = response
  )
  return <Container className="py-4">
    {course.name}
  </Container>
}