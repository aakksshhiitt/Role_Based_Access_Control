const {expect}= require("chai");

describe("RBAC Contract", function(){
    let deployedContract, admin, editor, viewer;

    beforeEach(async function(){
        [admin, editor, viewer]= await ethers.getSigners();
        contract=await ethers.getContractFactory("RBACManager");
        deployedContract= await contract.deploy();
    })

    it("EDITOR_ROLE is granted to the editor address",async function(){
        const editorRole=await deployedContract.EDITOR_ROLE();
        
        await deployedContract.connect(admin).grantEditorRole(editor);   // admin gives editor role access to the editor

        var isRoleGranted=await deployedContract.hasRole(editorRole, editor);    // checks if editor has editor role and return true
        expect(isRoleGranted).to.be.true;

        isRoleGranted= await deployedContract.hasRole(editorRole, viewer);  // checks if viewer has editor role and returns false
        expect(isRoleGranted).to.be.false;
    })

    it("VIEWER_ROLE is granted to the viewer address",async function(){
        const viewerRole=await deployedContract.VIEWER_ROLE();

        await deployedContract.connect(admin).grantViewerRole(viewer);     // admin gives viewer role access to the viewer

        var isRoleGranted=await deployedContract.hasRole(viewerRole, viewer);  // checks if viewer has viewer role and return true
        expect(isRoleGranted).to.be.true;

        isRoleGranted= await deployedContract.hasRole(viewerRole, editor);     // checks if editor has viewer role and returns false
        expect(isRoleGranted).to.be.false;
    })

    it("Only EDITOR_ROLE can create the new event", async function(){

        const editorRole=await deployedContract.EDITOR_ROLE();

        await deployedContract.connect(admin).grantEditorRole(editor);          //admin provide EDITOR_ROLE to editor
        await deployedContract.connect(admin).grantViewerRole(viewer);          //admin provide VIEWER_ROLE to viewer

       await expect(deployedContract.connect(editor).addEvent("event1",123456789021, 1234567890211, 100)).to.not.be.reverted;    //editor runs the add event function and it will not revert anything after making the changes

       await expect(deployedContract.connect(viewer).addEvent("event1",123456789021, 1234567890211, 100)).to.be.revertedWithCustomError(deployedContract,"AccessControlUnauthorizedAccount").withArgs(viewer.address, editorRole);  // viewer runs the add event function and it will revert with the custom error of UnauthorizedAccount.
    })

    it("Anyone who has been assigned to any role can book the seats", async function(){
        const editorRole=await deployedContract.EDITOR_ROLE();
        const viewerRole=await deployedContract.VIEWER_ROLE();

        await deployedContract.connect(admin).grantEditorRole(editor);
        await deployedContract.connect(admin).grantViewerRole(viewer);

        await deployedContract.connect(editor).addEvent("event1",123456789021, 1234567890211, 100);   // editor add the event details

        

        await expect(deployedContract.connect(editor).bookSeats(1)).to.not.be.reverted;     //editor can book the seat
        await expect(deployedContract.connect(viewer).bookSeats(1)).to.not.be.reverted;    // viewer can book the seat

    })
})