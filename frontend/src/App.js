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

		
      contractAddress="0x1519B713b3981f203EC9Bc2229b5732fb1eD96b0";
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

      const provider= await new ethers.BrowserProvider(window.ethereum);
      const signer= await  provider.getSigner();
      contractProvider= await new ethers.Contract(contractAddress, abi, provider);
      contractSigner= await new ethers.Contract(contractAddress, abi, signer);

	  DEFAULT_ADMIN_ROLE=await contractProvider.DEFAULT_ADMIN_ROLE();
	  VIEWER_ROLE=await contractProvider.VIEWER_ROLE();
	  EDITOR_ROLE=await contractProvider.EDITOR_ROLE();
    //   const result=await contractSigner.grantViewerRole("0xBD4194419E3e2861764edc29557c3A9E6C166123");
	//   const res=await contractProvider.hasRole(VIEWER_ROLE,"0xBD4194419E3e2861764edc29557c3A9E6C166123");
    //   console.log(res);
	}
	
	initializer();
  })



  




  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="App">

  <div className="loginContainer">
        <h1>Admin</h1>
        <div className="input-container1">
          <div className="div2">
            <h3>Change Admin Role</h3>
            <input type="text" name="uname" placeholder="Enter Role"  required /> &nbsp; &nbsp;
            <input type="text" name="uname" placeholder="Enter New Admin Role" required />
          <button className="stakeBut" ><p>Chnage Role Admin</p></button>
          </div>
        </div>

        <div className="input-container2">
          <div className="div2">
            <h3>Grant Editor Role</h3>
            <input type="text" name="uname" placeholder="Enter User Address"   required /> &nbsp; &nbsp;
          <button className="stakeBut" ><p>Grant Editor Role</p></button>
          </div>
        </div>

        <div className="input-container2">
          <div className="div2">
            <h3>Grant Viewer Role Role</h3>
            <input type="text" name="uname" placeholder="Enter User Address"  required /> &nbsp; &nbsp;
          <button className="stakeBut" ><p>Grant Viewer Role</p></button>
          </div>
        </div>
  </div>



      <div className="loginContainer">
        <h1>Editor</h1>
        <div className="input-container3">
          <div className="div2">
            <h3>Add Event</h3>
            <input type="text" name="uname" placeholder="name"  required /> &nbsp;
            <input type="text" name="uname" placeholder="start date"  required />&nbsp;
             <input type="text" name="uname" placeholder="end date"   required /> &nbsp;
            <input type="text" name="uname" placeholder="Total participants"   required />
          <button className="stakeBut" ><p>Add details</p></button>
          </div>
        </div>

        <div className="input-container3">
          <div className="div2">
            <h3>change event details</h3>
			<input type="text" name="uname" placeholder="id" required />
            <input type="text" name="uname" placeholder="name"   required /> &nbsp;
            <input type="text" name="uname" placeholder="start date"  required />&nbsp;
             <input type="text" name="uname" placeholder="end date" required /> &nbsp;
            <input type="text" name="uname" placeholder="Total participants"  required />
          <button className="stakeBut" ><p>Make changes</p></button>
          </div>
        </div>

        <div className="input-container3">
          <div className="div2">
            <h3>Mark Event as Completed</h3>
            <input type="text" name="uname" placeholder="event id"required /> &nbsp;<br></br>
          <button className="stakeBut" ><p>Completed</p></button>
          </div>
        </div>
      </div>

      <div className="loginContainer">
        <h1>Viewer</h1>
        <div className="input-container4">
          <div className="div2">
            <h3>Check Event Details</h3>
            <input type="text" name="uname" placeholder="Enter event Number" required />
            <button className="stakeBut" ><p>Show</p></button>
          </div>
        </div>

        <div className="input-container4">
          <div className="div2">
            <h3>Book Seat</h3>
            <input type="text" name="uname" placeholder="Enter event Id"  required />
            <button className="stakeBut" ><p>Book</p></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default App;
