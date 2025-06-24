import { useEffect } from 'react';
import './App.css';

const ethers=require("ethers");


function App() {

  var contractSigner;
  var contractProvider;
  var contractAddress=""
  var abi;
  var VIEWER_ROLE;
  var EDITOR_ROLE;
  var DEFAULT_ADMIN_ROLE;

  var role;
  var roleAdmin;
  var editorRoleAddress;
  var viewerRoleAddress;
  var name;
  var startDate;
  var endDate;
  var totalParticipants;
  var eventId;

  useEffect(()=>{

     const initializer=async()=>{

		
    contractAddress="0xc9D249847781606169b3FEadbB0114444FeaF76A";
    abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AccessControlBadConfirmation",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "neededRole",
				"type": "bytes32"
			}
		],
		"name": "AccessControlUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "EDITOR_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "VIEWER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_eventName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_eventTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalParticipants",
				"type": "uint256"
			}
		],
		"name": "addEvent",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_eventId",
				"type": "uint256"
			}
		],
		"name": "bookSeats",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_newAdmin",
				"type": "bytes32"
			}
		],
		"name": "changeRoleAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_eventId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_eventName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_eventTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalParticipants",
				"type": "uint256"
			}
		],
		"name": "editEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "grantEditorRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "grantViewerRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_eventId",
				"type": "uint256"
			}
		],
		"name": "markEventAsCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "callerConfirmation",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_eventId",
				"type": "uint256"
			}
		],
		"name": "viewEventDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "eventId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "eventName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "eventTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "seatsLeft",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					}
				],
				"internalType": "struct RBACManager.Event",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
    ];


	if (!window.ethereum) {
        alert("Install MetaMask!");
        return;
    }

  	try {
    	// checking if already connected
    	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
   		if (accounts.length === 0) {// if not connected
      		await window.ethereum.request({ method: 'eth_requestAccounts' });
   		}

    	const provider= await new ethers.BrowserProvider(window.ethereum);
    	const signer= await  provider.getSigner();
    	contractProvider= await new ethers.Contract(contractAddress, abi, provider);
    	contractSigner= await new ethers.Contract(contractAddress, abi, signer);

		DEFAULT_ADMIN_ROLE=await contractProvider.DEFAULT_ADMIN_ROLE();
		VIEWER_ROLE=await contractProvider.VIEWER_ROLE();
		EDITOR_ROLE=await contractProvider.EDITOR_ROLE();

    	console.log("Connected wallet:", await signer.getAddress());
  	} 
	catch (err) {
    	if (err.code === -32002) {
      		alert("MetaMask is already requesting access. Open the popup.");
    	} 
		else {
      		console.error("Connection error:", err);
		}
	  }
    }
	
	initializer();
  })


  const handleChange1=(event)=>{
	role=event.target.value;
  }

  const handleChange2=(event)=>{
	roleAdmin=event.target.value;
  }

  const handleChange3=(event)=>{
	editorRoleAddress=event.target.value;
  }

  const handleChange4=(event)=>{
	viewerRoleAddress=event.target.value;
  }

  const handleChange5=(event)=>{
	name=event.target.value;
  }

  const handleChange6=(event)=>{
	startDate=event.target.value;
  }

  const handleChange7=(event)=>{
	endDate=event.target.value;
  }

  const handleChange8=(event)=>{
	totalParticipants=event.target.value;
  }

  const handleChange9=(event)=>{
	eventId=event.target.value;
  }

  const changeRoleAdmin=async()=>{
	try{
	
			if(role=="VIEWER_ROLE" && roleAdmin=="EDITOR_ROLE"){
				await contractSigner.changeRoleAdmin(VIEWER_ROLE,EDITOR_ROLE);
			}
			else if(role=="EDITOR_ROLE" && roleAdmin=="VIEWER_ROLE"){
				await contractSigner.changeRoleAdmin(EDITOR_ROLE,VIEWER_ROLE);
			}
			else{
				document.getElementsByClassName("errorText1")[0].innerHTML=("Please enter the valid roles")
			}
	
		  }
		  catch(err){
			document.getElementsByClassName("errorText1")[0].innerHTML=(err.reason);
		  }
  }

  const grantEditorRole=async()=>{
	try{
	
			if(editorRoleAddress==undefined){
				document.getElementsByClassName("errorText1")[0].innerHTML=("please enter valid address");
			}
			else{
				await contractSigner.grantEditorRole(editorRoleAddress);
			}
	
		  }
		  catch(err){
			if(err.code === "CALL_EXCEPTION" && err.reason === null){
				document.getElementsByClassName("errorText1")[0].innerHTML=("You may not have the required role");
			}
			else
			document.getElementsByClassName("errorText1")[0].innerHTML=(err.info.error.message);
		  }
  }

  const grantViewerRole=async()=>{
	try{
	
			if(viewerRoleAddress==undefined){
				document.getElementsByClassName("errorText1")[0].innerHTML=("please enter valid address");
			}
			else{
				await contractSigner.grantViewerRole(viewerRoleAddress);
			}
	
		  }
		  catch(err){
			if(err.code === "CALL_EXCEPTION" && err.reason === null){
				document.getElementsByClassName("errorText1")[0].innerHTML=("You may not have the required role");
			}
			else
			document.getElementsByClassName("errorText1")[0].innerHTML=(err.info.error.message);
		  }
  }

   const createEvent = async () => {

	if(name==undefined || startDate==undefined || endDate==undefined || totalParticipants==undefined){
		document.getElementsByClassName("errorText2")[0].innerHTML=("Please enter the valid details first");
		return;
	}
	const startTimeInSeconds = Math.trunc(new Date(startDate.split('-').reverse().join('-')).getTime() / 1000);
	const endTimeInSeconds = Math.trunc(new Date(endDate.split('-').reverse().join('-')).getTime() / 1000);
	// console.log(startTimeInSeconds);
	// console.log(endTimeInSeconds);

    try {
    const tx = await contractSigner.addEvent(name, (startTimeInSeconds), (endTimeInSeconds), parseInt(totalParticipants));
    return await tx.wait();
    } 
	catch(err){
			if(err.code === "CALL_EXCEPTION" && err.reason === null){
				document.getElementsByClassName("errorText2")[0].innerHTML=("You may not have the required role");
			}
			else if(err.code === "CALL_EXCEPTION" && err.reason){
			    document.getElementsByClassName("errorText2")[0].innerHTML=(err.reason);
			}
			else{
				document.getElementsByClassName("errorText2")[0].innerHTML=(err.info.error.message);
			}
		}
	};

  const editEvent=async()=>{

	// const eventNumber=await contractSigner.eventNumber();
	// if(eventId>=eventNumber){
	// 	console.log("Please enter correct eventId");
	// 	return;
	// }

	if(name==undefined || startDate==undefined || endDate==undefined || totalParticipants==undefined){
		document.getElementsByClassName("errorText2")[0].innerHTML=("Please enter the valid details first");
		return;
	}
		const startTimeInSeconds = Math.trunc(new Date(startDate.split('-').reverse().join('-')).getTime() / 1000);
	    const endTimeInSeconds = Math.trunc(new Date(endDate.split('-').reverse().join('-')).getTime() / 1000);
			
		try{
			await contractSigner.editEvent(eventId, name, startTimeInSeconds, endTimeInSeconds, parseInt(totalParticipants));
		}
		catch(err){
			if(err.code === "CALL_EXCEPTION" && err.reason === null){
				document.getElementsByClassName("errorText2")[0].innerHTML=("You may not have the required role");
			}
			else if(err.code === "CALL_EXCEPTION" && err.reason){
			    document.getElementsByClassName("errorText2")[0].innerHTML=(err.reason);
			}
			else{
				document.getElementsByClassName("errorText2")[0].innerHTML=(err.info.error.message);
			}
		}
	}
  

  const completed=async()=>{
	try{
			if(eventId<1 || eventId==undefined){
				document.getElementsByClassName("errorText2")[0].innerHTML=("please enter valid details");
			}
			else{
				await contractSigner.markEventAsCompleted(eventId);
			}
	
		  }
		  catch(err){
			if(err.code === "CALL_EXCEPTION" && err.reason === null){
				document.getElementsByClassName("errorText2")[0].innerHTML=("You may not have the required role");
			}
			else if(err.code === "CALL_EXCEPTION" && err.reason){
			    document.getElementsByClassName("errorText2")[0].innerHTML=(err.reason);
			}
			else{
				document.getElementsByClassName("errorText2")[0].innerHTML=(err.info.error.message);
			}
		}
  }

  const showDetails=async()=>{
	try{

			if(eventId==undefined){
				document.getElementsByClassName("errorText3")[0].innerHTML=("Refresh the page and enter a valid Event Id");
				return;
			}
			const data=await contractSigner.viewEventDetails(eventId);
			document.getElementsByClassName("errorText3")[0].innerHTML=(data);
	
		  }
		  catch(err){
			if(err.code === "CALL_EXCEPTION" && err.reason === null){
				document.getElementsByClassName("errorText3")[0].innerHTML=("You may not have the required role");
			}
			else if(err.code === "CALL_EXCEPTION" && err.reason){
			    document.getElementsByClassName("errorText3")[0].innerHTML=(err.reason);
			}
			else{
				document.getElementsByClassName("errorText3")[0].innerHTML=(err.info.error.message);
			}
		}
  }

  const book=async()=>{
		try{
			if(eventId==undefined){
				document.getElementsByClassName("errorText3")[0].innerHTML=("Refresh the page and enter a valid Event Id");
				return;
			}
			await contractSigner.bookSeats(eventId);
		}
		  catch(err){
			if(err.code === "CALL_EXCEPTION" && err.reason === null){
				document.getElementsByClassName("errorText3")[0].innerHTML=("You may not have the required role");
			}
			else if(err.code === "CALL_EXCEPTION" && err.reason){
			    document.getElementsByClassName("errorText3")[0].innerHTML=(err.reason);
			}
			else{
				document.getElementsByClassName("errorText3")[0].innerHTML=(err.info.error.message);
			}
		}
  }

  




  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="App">

  <div className="loginContainer">
        <h1>Admin</h1>
        <div className="input-container1">
          <div className="div2">
            <h3>Change Admin Role</h3>
            <input type="text" name="uname" placeholder="Enter Role" onChange={handleChange1}  required /> &nbsp; &nbsp;
            <input type="text" name="uname" placeholder="Enter New Admin Role" onChange={handleChange2}  required />
          <button className="stakeBut" onClick={changeRoleAdmin}><p>Change Role Admin</p></button>
          </div>
        </div>

        <div className="input-container2">
          <div className="div2">
            <h3>Grant Editor Role</h3>
            <input type="text" name="uname" placeholder="Enter User Address"  onChange={handleChange3} required /> &nbsp; &nbsp;
          <button className="stakeBut" onClick={grantEditorRole}><p>Grant Editor Role</p></button>
          </div>
        </div>

        <div className="input-container2">
          <div className="div2">
            <h3>Grant Viewer Role Role</h3>
            <input type="text" name="uname" placeholder="Enter User Address" onChange={handleChange4} required /> &nbsp; &nbsp;
          <button className="stakeBut" onClick={grantViewerRole}><p>Grant Viewer Role</p></button>
          </div>
        </div>
		<h5 className='errorText1'></h5>
  </div>



      <div className="loginContainer">
        <h1>Editor</h1>
        <div className="input-container3">
          <div className="div2">
            <h3>Add Event</h3>
            <input type="text" name="uname" placeholder="name"  onChange={handleChange5} required /> &nbsp;
            <input type="text" name="uname" placeholder="start (dd-mm-yyyy)"  onChange={handleChange6} required />&nbsp;
             <input type="text" name="uname" placeholder="end (dd-mm-yyyy)"  onChange={handleChange7} required /> &nbsp;
            <input type="text" name="uname" placeholder="Total participants" onChange={handleChange8}  required />
          <button className="stakeBut" onClick={createEvent}><p>Add details</p></button>
          </div>
        </div>

        <div className="input-container3">
          <div className="div2">
            <h3>change event details</h3>
			<input type="text" name="uname" placeholder="id"  onChange={handleChange9} required />
            <input type="text" name="uname" placeholder="name"  onChange={handleChange5} required /> &nbsp;
            <input type="text" name="uname" placeholder="start date" onChange={handleChange6}  required />&nbsp;
             <input type="text" name="uname" placeholder="end date" onChange={handleChange7} required /> &nbsp;
            <input type="text" name="uname" placeholder="Total participants" onChange={handleChange8}  required />
          <button className="stakeBut" onClick={editEvent}><p>Make changes</p></button>
          </div>
        </div>

        <div className="input-container3">
          <div className="div2">
            <h3>Mark Event as Completed</h3>
            <input type="text" name="uname" placeholder="event id" onChange={handleChange9} required /> &nbsp;<br></br>
          <button className="stakeBut" onClick={completed}><p>Completed</p></button>
          </div>
        </div>
		<h5 className='errorText2'></h5>
      </div>

      <div className="loginContainer">
        <h1>Viewer</h1>
        <div className="input-container4">
          <div className="div2">
            <h3>Check Event Details</h3>
            <input type="text" name="uname" placeholder="Enter event Number" onChange={handleChange9}  required />
            <button className="stakeBut" onClick={showDetails}><p>Show</p></button>
          </div>
        </div>

        <div className="input-container4">
          <div className="div2">
            <h3>Book Seat</h3>
            <input type="text" name="uname" placeholder="Enter event Id" onChange={handleChange9} required />
            <button className="stakeBut" onClick={book}><p>Book</p></button>
          </div>
        </div>
		<h5 className='errorText3'></h5>
      </div>
    </div>
  </div>
  )
}

export default App;
