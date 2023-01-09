import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ToDO from "./artifacts/contracts/ToDO.sol/ToDO.json";
function App() {
  const style1 = {
    paddingLeft: "800px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };
  const style3 = {
    marginLeft: "400px",
    marginRight: "100px",
  };
  const style4 = {
    marginLeft: "200px",
    marginRight: "100px",
  };
  const address = "0x165a05337e03189E2bcA1413543E8155a822706b";
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [task,setTask]=useState();
  const[priority,setPriority]=useState();
  const[index,setIndex]=useState();
  const[id,setId]=useState();
  const[pid,setPid]=useState();
  useEffect(() => {
    addWalletListener();
  }, []);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    window.ethereum.on("accountChanged", async function (accounts) {
      setAccount(account[0]);
      await web3Handler();
    });
    loadContract(signer);
  };
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  const loadContract = async (signer) => {
    setContract(new ethers.Contract(address, ToDO.abi, signer));
  };
  async function addTask(){
    if(contract){
      await contract.addTask(task,priority);
    }
    else{
      alert("connect to wallet first");
    }
  }
  async function getTask(){
    if(contract){
      const tx=await contract.getTask();
      alert(tx);
    }else{
      alert("connect wallet first");
    }
  }
  async function deleteTask(){
    if(contract){
      await contract.deleteTask(index);
    }else{
      alert("connect to walllet first");
    }
  }
  async function updateStatus(){
    if(contract){
     try{
      await contract.updateStatus(id,pid);
     }catch(e){
      if(e.message.search("No such Task Exists")!=-1){
        alert("No such Task Exists");
      }
     }
    }
    else{
      alert("connect to wallet first");
    }
  }
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>TO DO</h1>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={web3Handler}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
      <Row sm={1} md={2} className="g-4">
        <Col sm lg="2" style={style3}>
          <Card>
            <Card.Body>
              <Card.Title>Add Task</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Add Task"
                />
                <br></br>
                <br></br>
                <input
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="Priority number"
                />
                <br></br>
                <br></br>
                <Button onClick={addTask}>ADD</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style4}>
          <Card>
            <Card.Body>
              <Card.Title>Get Task</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
                <Button onClick={getTask}>get</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col sm lg="2" style={style3}>
          <Card>
            <Card.Body>
              <Card.Title>Delete Task</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setIndex(e.target.value)}
                  placeholder="Add index"
                />
                <br></br>
                <br></br>
                <Button onClick={deleteTask}>Delete</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style4}>
          <Card>
            <Card.Body>
              <Card.Title>Update Priority</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
              <input
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Add index"
                />
                <br></br>
                <br></br>
                <input
                  onChange={(e) => setPid(e.target.value)}
                  placeholder="Priority number"
                />
                <br></br>
                <br></br>
                <Button onClick={updateStatus}>update</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      
    </div>
  );
}

export default App;
