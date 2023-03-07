import "./App.css";
import "./bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

type Url = {
  urlId: number;
  url: string;
}

type Date = {
  dateId: number;
  date: string;
}

function App(): JSX.Element {
  const [datesArray, setDatesArray] = useState<Date[]>([]);
  const [urlsArray, setUrlsArray] = useState<Url[]>([]);
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  function getData(req: string): void {
    fetch(`https://httpbin.org/${req}`, {
      method: `${req.toUpperCase()}`,
    })
      .then((res) => res.json())
      .then((res) => setUrlsArray(prev => [...prev, {urlId : prev.length + 1, url: res.url}]))
      .then(() => setDatesArray(prev => [...prev,{dateId: prev.length + 1, date: new Date().toLocaleString()}]));
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
                    <tr key={date.dateId}>{date.date}</tr>
                  ))}
                </td>
                <td>
                  <tr>URL запроса</tr>
                  {urlsArray.map((url) => (
                    <tr key={url.urlId}>{url.url}</tr>
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
