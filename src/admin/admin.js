 import {
  read,
  insert,
  update,
  remove,
  ServerValue
} from "../database/database";

import {
  getData,
  storeData,
  removeData
} from "../database/local_database"

// import {
//   createInputEl, 
//   createSelectEl,
//   createCheckEl,
//   createDivEl,
//   createBtnEl,
//   createOptionEl
// } from '../utils/elUtils'

// import {
//   default_attrs,
//   update_attrs,
//   delete_attrs,
//   status_option_index
// } from './admin_const'

// import { 
//   showUpdate,
//   showDelete, 
//   clearInsert,
//   clearUpdate,
//   clearDelete,
//   update_state_listener, 
//   insert_state_listener,
//   insertBtn_disabled,
//   updateBtn_disabled,
//   toggle_update,
//   toggle_delete
// } from "../utils/admin_data"

// import {
//   validateInsertData
// } from "../utils/validate"
// import e from "cors"; // WTF is this?

// var dbOpState;
// const insertBefore = (parent, newEl, el) => parent.insertBefore(newEl, el);

// function randomID(length=3) {
//   const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   var result = '';

//   for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

//   return result;
// }

// function initOperationListener() {
//   document.querySelector("#dbOp").addEventListener("change", () => {
//     var currentState = document.querySelector("#dbOp").value;
//     if (dbOpState !== currentState) {
//       var option = parseInt(document.querySelector("#dbOp").value);
//       switch(option) {
//         case 0:
//           document.querySelector("div").remove();
//           defaultAdmin(false);
//           initBtnListener_Insert();
//           insert_state_listener();
//           break;
//         case 1:
//           updateAdmin();
//           init_idChange(showUpdate);
//           init_noChange(showUpdate);
//           update_state_listener(); // TODO: Update To All Status Checkbox should, enable when status is changed.
//           initBtnListener_Update();
//           break;
//         case 2:
//           TODO: 
//           "Delete This Transanction" should change to more clearer meaning. 
//           deleteAdmin();
//           init_idChange(showDelete);
//           init_noChange(showDelete);
//           initBtnListener_Delete();
//           break;
//       }
//       dbOpState = currentState;
//       initOperationListener();
//     }
//   })
// }

// This function is used in update and delete operation
// function init_idChange(fn) {
//   var shoesID = document.querySelector("#shoesID");
  
//   shoesID.addEventListener("input", () => {
//       var key = document.querySelector("#shoesID").value.toUpperCase();

//       var data = getData(key);
//       if (key.length === 3) {
//         if (!data) {
//           read(key).then((dataDB) => {
//               if (dataDB) {
//               /**
//                * Case when data didn't found in localStorage.
//                * But, found in database
//                */
//               storeData(key, JSON.stringify(dataDB));
//               fn(dataDB);
//             } else {
//               fn(false);
//             }
//           })
//         } else {
//           fn(data); // Case when data found in localStorage
//         }
//       } else {
//         fn(false);
//       }
//   });
// }

// function init_noChange(fn) {
//   var shoesID = document.querySelector("#shoesID");
//   var shoesNo = document.querySelector("#div-shoesNo>#shoesNo");

//   shoesNo.addEventListener("change", () => {
//     var key = shoesID.value;
//     fn(getData(key), false);
//   });
// }

// function get_InsertInput() {
//   var shoesBrand = document.querySelector("#div-shoesBrand>#shoesBrand").value;
//   var shoesSize = document.querySelector("#div-shoesSize>#shoesSize").value;
//   var service = document.querySelector("#div-shoesService>#shoesService").value;
//   var status = document.querySelector("#div-shoesStatus>#shoesStatus").value;
  
//   return {
//     Service: service, 
//     ShoesBrand: shoesBrand, 
//     Size: shoesSize, 
//     Status: status
//   }
// }

// function get_UpdateInput() {
//   var shoesBrand = document.querySelector("#div-shoesBrand>#shoesBrand").value;
//   var shoesSize = document.querySelector("#div-shoesSize>#shoesSize").value;
//   var service = document.querySelector("#div-shoesService>#shoesService").value;
//   var status = document.querySelector("#div-shoesStatus>#shoesStatus").value;
  
//   return {
//     Service: service, 
//     ShoesBrand: shoesBrand, 
//     Size: shoesSize, 
//     Status: status
//   }
// }

// function initBtnListener_Insert() {
//   var btn = document.querySelector("#div-Btn");
  
//   Add btn (DO: Save data unti; user click Post)
//   btn.children.addBtn.addEventListener("click", () => {
//     var shoesNo = parseInt(document.querySelector("#div-shoesNo>#shoesNo").value) + 1;
//     document.querySelector("#div-shoesNo>#shoesNo").value = shoesNo;

//     var ID = document.querySelector("#div-shoesID>#shoesID").value;
//     var data = getData(ID);

//     if (!data) {
//       storeData(ID, JSON.stringify([]))
//       data = getData(ID);
//     }
    
//     data.push(get_InsertInput());
    
//     console.log(data);
//     var index = status_option_index[data[data.length-1].Status];
//     if (index === 1) {
//       Case when status are Done
//       data[data.length-1].TimestampOut = ServerValue.TIMESTAMP;
//     }

//     storeData(ID, JSON.stringify(data));

//     clearInsert();
//     btn.children.addBtn.disabled = true;
//     btn.children.cancelBtn.disabled = false;
//   })

//   Insert Btn (DO: Post to database)
//   btn.children.insertBtn.addEventListener("click", () => {
//     var ID = document.querySelector("#div-shoesID>#shoesID").value;
//     var data = getData(ID);
//     console.log(data);

//     var newData = get_InsertInput();

//     var index = status_option_index[newData.Status];
    
//     Case when status are Done
//     if (index === 1) newData.TimestampOut = ServerValue.TIMESTAMP;

//     if (validateInsertData(newData)) {
//       if (!data) {
//         Case when admin only input 1 shoes
//         newData = [newData];
//         newData["timestampIn"] = ServerValue.TIMESTAMP;
//         newData["timestampOut"] = 0;

//         insert(ID, newData);
//       } else {
//         Case when admin input more than 1 shoes
//         data.push(newData); // Get user input when user didn't click add btn
//         data["timestampIn"] = ServerValue.TIMESTAMP;
//         data["timestampOut"] = 0;
//         insert(ID, data); // COMMENT ID: 1
//       }
//     } else {
//       COMMENT ID: 1
//       data["timestampIn"] = ServerValue.TIMESTAMP;
//       data["timestampOut"] = 0;
//       insert(ID, data); // If user already click add btn and then, click insert btn with empty input
//     }

//     You may wondering, why at code section at comment #1 are not store data to localStorage.
//     Simply it's because we already store to localStorage when user click add btn.

//     clearInsert()

//     Clear new
//     storeData("ID", JSON.stringify(randomID()));
//     document.querySelector("#div-shoesID>#shoesID").value = getData("ID");
//     document.querySelector("#div-shoesNo>#shoesNo").value = 1;

//     btn.children.addBtn.disabled = true;
//     btn.children.insertBtn.disabled = true;
//     btn.children.cancelBtn.disabled = true;
//     btn.children.insertBtn.innerText = "INSERT"
//   });

//   btn.children.cancelBtn.addEventListener("click", () => {
//     var ID = document.querySelector("#div-shoesID>#shoesID").value;
//     document.querySelector("#div-shoesNo>#shoesNo").value = 1;
//     removeData(ID);
//     clearInsert();
//     insertBtn_disabled(true);
//   })
// }

// function initBtnListener_Update() {
//   document.querySelector("#div-Btn>#updateBtn").addEventListener("click", () => {
//     var ID = document.querySelector("#div-shoesID>#shoesID").value;
//     var i = parseInt(document.querySelector("#div-shoesNo>#shoesNo").value);

//     var data = getData(ID);
//     data = data.filter((el) => { return el != null });
    
//     var newData = get_UpdateInput();

//     var updateTimeStamp = (data, newData, i) => {
//       var index = status_option_index[newData.Status];
//       if (index === 1) {
//         Case when status are Done
//         data[i].TimestampOut = ServerValue.TIMESTAMP;
//       } else {
//         data[i].TimestampOut = 0;
//       }
//     }

//     var changeAll = document.querySelector("#div-updateStatus>#updateStatus").checked;
//     if (changeAll) {
//       for (var l = 0; l < data.length; ++l) {
//         data[l].Status = newData.Status;
//         updateTimeStamp(data, newData, l);
//       }
//     } else {
//       data[i].Status = newData.Status;
//       updateTimeStamp(data, newData, i);
//     }

//     data[i].Service = newData.Service
//     data[i].ShoesBrand = newData.ShoesBrand
//     data[i].Size = newData.Size
    
//     update(ID, data);
//     clearUpdate();
//     toggle_update();
//     updateBtn_disabled(true);
//     document.querySelector("#div-shoesID>#shoesID").value = "";
//     document.querySelector("#div-updateStatus>#updateStatus").disabled = true;
//   });
// }

// function initBtnListener_Delete() {
//   document.querySelector("#div-Btn>#deleteBtn").addEventListener("click", () => {
//     var ID = document.querySelector("#div-shoesID>#shoesID").value;

//     var deleteAll = document.querySelector("#div-deleteAllCheck>#deleteAllCheck").checked
//     if (deleteAll) {
//       remove(ID);
//     } else {
//       var i = parseInt(document.querySelector("#div-shoesNo>#shoesNo").value);
//       remove(`${ID.toUpperCase()}/${i}`)
//     }

//     var select = document.querySelector("#div-shoesNo>#shoesNo");
//     createOptionEl(select, [0], true, "")
//     document.querySelector("#div-shoesID>#shoesID").value = "";

//     clearDelete();
//     toggle_delete();
//   });
// }

function displayData(data) {
  
  // Node-1
  for (var childKey in data) {
    var tree = document.querySelector("#treeTemplate").content.cloneNode(true).children[0];
    
    // Node-1 Icon
    tree.children[0].children[0].classList.add("closed");
    tree.children[0].children[0].addEventListener("click", (e) => {
      var displayState = Boolean(e.path[2].children[1].style.display);          
      console.log(e.path[2].children[1]);
      console.log(displayState)
      if (!displayState) {
        e.path[2].children[1].style.display = "none";

        var elementCount = e.path[2].children[1].childElementCount-2;
        for (var idx = 0; idx < elementCount; idx++) {
          e.path[2].children[1].children[idx].children[0].children[0].classList.remove("opened");
          e.path[2].children[1].children[idx].children[0].children[0].classList.add("closed");
          e.path[2].children[1].children[idx].children[1].style.display = "none"
          console.log(e.path[2].children[1].children)
        }
      } else {
        e.path[2].children[1].style.display = "";
      }

      var currentState = e.target.classList[1];
    
      if (currentState === "closed") {
        e.target.classList.remove("closed");
        e.target.classList.add("opened");
      } else if (currentState === "opened") {
        e.target.classList.remove("opened");
        e.target.classList.add("closed");
      } else {
        console.log("[Error]: No class state.")
      }
    });
    
    // Header content
    var contents = document.querySelector("#treeContent").content.cloneNode(true);
    contents.children[0].children[0].innerText = childKey;
    tree.children[0].appendChild(contents);

    var ulInner = document.createElement("ul");

    // Node-2
    var dataChild = data[childKey];
    for (var childKey2 in dataChild) {

      var treeChild = document.querySelector("#treeTemplate").content.cloneNode(true).children[0];
      var treeChildContent = treeChild.children[0];
      var content = document.querySelector("#childContent").content.cloneNode(true);

      if (childKey2 === "timestampIn") {
        treeChildContent.children[0].classList.add("leaf");
        content.children[0].children[0].innerText = `Entry date: ${dataChild[childKey2]}`
        content.children[0].children[1].remove()
      } else if(childKey2 === "timestampOut") {
        treeChildContent.children[0].classList.add("leaf");
        content.children[0].children[0].innerText =`Done date: ${dataChild[childKey2]}`
        content.children[0].children[1].remove()
      } else {
        treeChildContent.children[0].addEventListener("click", (e) => {
          var displayState = Boolean(e.path[2].children[1].style.display);
          
          if (!displayState) {
            e.path[2].children[1].style.display = "none";
          } else {
            e.path[2].children[1].style.display = "";
          }
          
          var currentState = e.target.classList[1];

          if (currentState === "closed") {
            e.target.classList.remove("closed");
            e.target.classList.add("opened");
          } else {
            e.target.classList.remove("opened");
            e.target.classList.add("closed");
          }
        });
        treeChildContent.children[0].classList.add("closed");
        content = document.querySelector("#childContent").content.cloneNode(true);               
        content.children[0].children[0].innerText = parseInt(childKey2)+1;

        // Node-3
        var ulInner2 = document.createElement("ul");
        var dataChildMeta = dataChild[childKey2];
        for (var childKey3 in dataChildMeta) {
          var treeDataChild = document.querySelector("#treeTemplate").content.cloneNode(true).children[0];
          var treeDataContent = treeDataChild.children[0];
        
          treeDataContent.children[0].classList.add("leaf");
          
          var contents = document.createElement("span");
          contents.innerText = `${childKey3}: ${dataChildMeta[childKey3]}`;
        
          treeDataContent.appendChild(contents);
          ulInner2.appendChild(treeDataChild);
          ulInner2.style.display = "none";
        }
        
        treeChild.appendChild(ulInner2);
      }

      treeChildContent.appendChild(content);
      ulInner.appendChild(treeChild);
      ulInner.style.display = "none";
    }

    tree.appendChild(ulInner);
    console.log(tree);
    document.querySelector("#display").appendChild(tree);
  }
}

// This function add new element if user signed
function defaultAdmin(init=true) {
  if (init) {
    document.querySelector("#admin_login").remove();
    
    var dataDiv = document.createElement("div");
    dataDiv.setAttribute("id", "data");

    var hrDiv = document.createElement("hr");
    hrDiv.setAttribute("id", "mid")

    document.body.prepend(dataDiv);
    document.body.prepend(hrDiv);
    console.log("defaultAdmin")
  }

  if (!Boolean(getData("DATA"))) {
    const response = read("/");
    var dataList = {};
    response.then((data) => {
      for (var child in data) {      
        dataList[child] = data[child];
      }
      storeData("data", JSON.stringify(dataList));
      displayData(dataList);
    })
  } else {
    var data = getData("DATA");
    displayData(data);
  }

  // TODO: Get data then fill data inside template.
   // Get Array data from localStorage

  // First child (Transaction code)
    // First inner child (Number)
      // First inside inner child (Meta)
  

  /*var parent = document.createElement("div");
  parent.setAttribute("id", "input");
  document.body.prepend(parent);

  var ID = document.createElement("h3");
  ID.innerText = "Insert, Update & Delete Data";
  parent.append(ID);
 
  createSelectEl(default_attrs[0], "dbOp", "Operation: ", parent);
  createInputEl(default_attrs[1], "ID: ",true, parent);
  for(var key in default_attrs[2]) {
    createInputEl(default_attrs[2][key][0], default_attrs[2][key][1], default_attrs[2][key][2], parent);
  }
  for(var key in default_attrs[3]) {
    createSelectEl(default_attrs[3][key][0], default_attrs[3][key][1], default_attrs[3][key][2], parent);
  }

  var btnParent = createDivEl("Btn", parent);
  for (var key in default_attrs[4]) {
    createBtnEl(default_attrs[4][key][0], default_attrs[4][key][1], default_attrs[4][key][2], btnParent);
  }

  var alphaNumeric_ID = getData("ID");
  if (alphaNumeric_ID) {
    document.querySelector("#div-shoesID>#shoesID").value = alphaNumeric_ID;
    
    var unPostData = getData(alphaNumeric_ID);
    if (unPostData) {
      alert("Waiting to post data to database!")
      
      document.querySelector("#div-shoesNo>#shoesNo").value = unPostData.length+1;

      var btn = document.querySelector("#div-Btn").children;
      btn.insertBtn.disabled = false;
      btn.cancelBtn.disabled = false;
    }
  } else {
    storeData("ID", JSON.stringify(randomID()));
    document.querySelector("#div-shoesID>#shoesID").value = getData("id");
  }
}

function updateAdmin() {
  var selectState = document.querySelector("#dbOp").selectedIndex;

  // Remove div with ID #input
  document.querySelector("#input").remove(); 

  defaultAdmin(false);
  document.querySelector("#dbOp").getElementsByTagName("option")[selectState].selected = "selected";

  document.querySelector("#div-shoesID>#shoesID").value = "";

  document.querySelector("#div-shoesNo").remove();
  document.querySelector("#div-Btn").remove();

  document.querySelector("#shoesID").disabled = false;
  document.querySelector("#shoesBrand").disabled = true;
  document.querySelector("#shoesSize").disabled = true;
  document.querySelector("#div-shoesService>#shoesService").disabled = true;
  document.querySelector("#div-shoesStatus>#shoesStatus").disabled = true;
  
  var parent = document.querySelector("#input");
  const beforeEl = document.querySelector("#div-shoesBrand");

  createSelectEl(
   update_attrs[0], "shoesNo", "No: ", 
    parent, false, insertBefore, beforeEl, true
  )

  createCheckEl(update_attrs[1], "Update Current Status To All", true, parent)
  var btnParent = createDivEl("Btn", parent);
  for (var key in update_attrs[2]) {
    createBtnEl(update_attrs[2][key][0], update_attrs[2][key][1], update_attrs[2][key][2], btnParent);
  }
}

function deleteAdmin() {
  var selectState = document.querySelector("#dbOp").selectedIndex;
  document.querySelector("#input").remove();

  defaultAdmin(false);
  document.querySelector("#dbOp").getElementsByTagName("option")[selectState].selected = "selected";

  document.querySelector("#div-shoesID>#shoesID").value = ""

  document.querySelector("#div-Btn").remove();
  document.querySelector("#div-shoesService").remove();
  document.querySelector("#div-shoesStatus").remove();
  document.querySelector("#div-shoesNo").remove();

  document.querySelector("#shoesID").disabled = false;
  document.querySelector("#shoesBrand").disabled = true;
  document.querySelector("#shoesSize").disabled = true;

  var parent = document.querySelector("#input");

  for (var key in delete_attrs[2]) {
    createInputEl(delete_attrs[2][key][0], delete_attrs[2][key][1], delete_attrs[2][key][2], parent);
  }

  const beforeEl = document.querySelector("#div-shoesBrand");

  createSelectEl(
    delete_attrs[0], "shoesNo", "No: ", 
    parent, false, insertBefore, beforeEl, true
  )
  createCheckEl(delete_attrs[1], "Delete Current Transaction ID", true, parent)

  var btnParent = createDivEl("Btn", parent);
  for (var key in delete_attrs[3]) {
    createBtnEl(delete_attrs[3][key][0], delete_attrs[3][key][1], delete_attrs[3][key][2], btnParent);
  }*/
}

export { 
  defaultAdmin
  //initOperationListener,
  //initBtnListener_Insert
}