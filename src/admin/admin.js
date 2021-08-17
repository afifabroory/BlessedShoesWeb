import {
  read,
  insert,
  update,
  remove,
  init_dbChange
} from "../database/database";

import {
  createInputEl, 
  createSelectEl,
  createCheckEl,
  createDivEl,
  createBtnEl
} from '../utils/admin_utils'

import {
  default_attrs,
  update_attrs,
  delete_attrs
} from './admin_const'

var dbOpState;
var storage = window.sessionStorage;
const insertBefore = (parent, newEl, el) => parent.insertBefore(newEl, el);

function initOperationListener() {
  document.querySelector("#dbOp").addEventListener("change", () => {
    var currentState = document.querySelector("#dbOp").value;
    if (dbOpState !== currentState) {
      var option = parseInt(document.querySelector("#dbOp").value);
      switch(option) {
        case 0:
          document.querySelector("div").remove();
          defaultAdmin(false);
          break;
        case 1:
          updateAdmin();
          break;
        case 2:
          deleteAdmin();
          break;
      }

      dbOpState = currentState;
    }
  })
}

// This function add new element if user signed
function defaultAdmin(init=true) {
  if (init) {
    if (window.sessionStorage.length === 0) {
      console.log("length 0");
      const response = read("/");
      response.then((data) => {
        for (var child in data) {
          storage.setItem(child, JSON.stringify(data[child]));
        }
      })
    } 
    document.querySelector("#admin_login").remove();
    
    var dataDiv = document.createElement("div");
    dataDiv.setAttribute("id", "data");

    var hrDiv = document.createElement("hr");
    hrDiv.setAttribute("id", "mid")

    document.body.prepend(dataDiv);
    document.body.prepend(hrDiv);
  }

  var parent = document.createElement("div");
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

  initOperationListener();
}

function updateAdmin() {
  var selectState = document.querySelector("#dbOp").selectedIndex;
  document.querySelector("#input").remove();
  defaultAdmin(false);
  document.querySelector("#dbOp").getElementsByTagName("option")[selectState].selected = "selected";

  document.querySelector("#div-shoesID>#shoesID").removeAttribute("value");

  document.querySelector("#div-shoesNo").remove();
  document.querySelector("#div-Btn").remove();
  
  document.querySelector("#shoesID").disabled = false;
  document.querySelector("#shoesBrand").disabled = false;
  document.querySelector("#shoesSize").disabled = false;
  
  var parent = document.querySelector("#input");
  const beforeEl = document.querySelector("#div-shoesBrand");

  createSelectEl(
   update_attrs[0], "shoesNo", "No: ", 
    parent, false, insertBefore, beforeEl
  )

  createCheckEl(update_attrs[1], "Change Status To All", false, parent)
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

  document.querySelector("#div-shoesID>#shoesID").removeAttribute("value");

  document.querySelector("#div-Btn").remove();
  document.querySelector("#div-shoesService").remove();
  document.querySelector("#div-shoesStatus").remove();
  document.querySelector("#div-shoesNo").remove();

  document.querySelector("#shoesID").disabled = false;
  document.querySelector("#shoesBrand").disabled = true;
  document.querySelector("#shoesSize").disabled = true;

  var parent = document.querySelector("#input");
  const beforeEl = document.querySelector("#div-shoesBrand");
  
  for (var key in delete_attrs[2]) {
    createInputEl(delete_attrs[2][key][0], delete_attrs[2][key][1], delete_attrs[2][key][2], parent);
  }

  createSelectEl(
    delete_attrs[0], "shoesNo", "No: ", 
    parent, false, insertBefore, beforeEl
  )
  createCheckEl(delete_attrs[1], "Delete All", false, parent)

  var btnParent = createDivEl("Btn", parent);
  for (var key in delete_attrs[3]) {
    createBtnEl(delete_attrs[3][key][0], delete_attrs[3][key][1], delete_attrs[3][key][2], btnParent);
  }
}

export { defaultAdmin }