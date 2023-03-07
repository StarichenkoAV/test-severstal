import "./App.css";
import "./bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function App(): JSX.Element {
  const [datesArray, setDatesArray] = useState<String[]>([]);
  const [urlsArray, setUrlsArray] = useState<String[]>([]);
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  function getData(str: string): void {
    fetch(`https://httpbin.org/${str}`, {
      method: `${str.toUpperCase()}`,
    })
      .then((res) => res.json())
      .then((res) => setUrlsArray(prev => [...prev, res.url]))
      .then(() => setDatesArray(prev => [...prev, new Date().toLocaleString()]));
  }

  const handleGetClick = (): void => {
    getData("get");
  };

  const handlePostClick = (): void => {
    getData("post");
  };

  const handleDeleteClick = (): void => {
    getData("delete");
  };

  const handleClear = (): void => {
    setDatesArray([]);
    setUrlsArray([]);
  };

  return (
    <div className="App">
      <h2>Тестовое задание</h2>
      <div className="button-box">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleGetClick}
        >
          Get
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePostClick}
        >
          Post
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
      <footer>
        <Button variant="primary" onClick={handleShow}>
          Show info
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-hover">
              <tbody>
                <td>
                  <tr>Время запроса</tr>
                  {datesArray.map((date) => (
                    <tr>{date}</tr>
                  ))}
                </td>
                <td>
                  <tr>URL запроса</tr>
                  {urlsArray.map((url) => (
                    <tr>{url}</tr>
                  ))}
                </td>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Clear info
            </Button>
          </Modal.Footer>
        </Modal>
      </footer>
    </div>
  );
}

export default App;
