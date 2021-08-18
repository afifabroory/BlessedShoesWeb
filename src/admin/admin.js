import {
  read,
  insert,
  update,
  remove,
  init_dbChange
} from "../database/database";

import {
  storeData
} from "../database/local_database"

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

import {
  init_idChange,
  init_noChange
} from './admin_listiner'

import { showUpdate, showDelete, update_state_listener } from "../utils/admin_data"

var dbOpState;
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
          storeData(child, JSON.stringify(data[child]));
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

  createCheckEl(update_attrs[1], "Change Status To All", true, parent)
  var btnParent = createDivEl("Btn", parent);
  for (var key in update_attrs[2]) {
    createBtnEl(update_attrs[2][key][0], update_attrs[2][key][1], update_attrs[2][key][2], btnParent);
  }

  init_idChange(showUpdate);
  init_noChange(showUpdate);
  update_state_listener();
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

  for (var key in delete_attrs[2]) {
    createInputEl(delete_attrs[2][key][0], delete_attrs[2][key][1], delete_attrs[2][key][2], parent);
  }

  const beforeEl = document.querySelector("#div-shoesBrand");

  createSelectEl(
    delete_attrs[0], "shoesNo", "No: ", 
    parent, false, insertBefore, beforeEl, true
  )
  createCheckEl(delete_attrs[1], "Delete All", true, parent)

  var btnParent = createDivEl("Btn", parent);
  for (var key in delete_attrs[3]) {
    createBtnEl(delete_attrs[3][key][0], delete_attrs[3][key][1], delete_attrs[3][key][2], btnParent);
  }

   // If data by ID found, then toggle disabled input else do nothing.
  init_idChange(showDelete)
  init_noChange(showDelete);
}

export { defaultAdmin }