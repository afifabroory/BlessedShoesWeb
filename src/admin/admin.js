import {
  insert,
  adminRead,
  ServerValue
} from "../database/database";

import {
  getData,
  storeData,
  removeData
} from "../database/local_database"

// TODO:
// 1. Enabled add button when certain condition meet to enabled of disabled add button.
// 2. Also develop next and back button for exsisting data, 
//    if user already click add button but doesn't input data then ignore data.
//    also  if user already input data then ask user to click add button to save data.
//    BACK button are active when user click NEXT button. NEXT button are disabled when no more data.
// 3. If user already input data but doesn't insert data to database but click CANCEL button, then
//    tell user data are not stored to database. If user click yes then discard data if user click
//    no then back to popup.
// 4. Create new feature to clear data fast also create feature to generate new ID.
// 5. Create procedure to make sure ID are not exist in database.
// 6. Create new row element after input to send message something wrong to user.
// 7. Create success popup after user click insert button.
// 8. Add data to display data.
// 9. Filter display data to show only In Progress data.
// 10. Sort data by TIMESTAMP to display data. Using FIFO principle which is first item are in upper.
// 11. Input condtion handling (e.g. empty input, wrong input, etc.)

function generateID(length = 3) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const BANNED_ID = ["SEX", "ASS", "CUM", "GAY", "S3X", "GOD", "XXX", "TIT", "A55"];
  var result = '';

  while (true) {
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

      if (!BANNED_ID.includes(result)) break;
  }

  storeData("ID", JSON.stringify(result));
  return result;
}

function getParentOfDepth(n, element) {
  for (var i = 0; i < n; i++) element = element.parentNode;
  return element;
}

function getInputData() {
  /**
   * ID as a Key
   * Fromat data example:
   * AAA : {
   *  [
   *    {Service: -, Shoesbrand: -, Size: -, Status: - },
   *    {Service: -, Shoesbrand: -, Size: -, Status: - }
   *  ]
   * }
   */
  var data = {};
  data["Service"] = document.querySelector("#shoesBrand>td>#shoesBrand").value;
  data["ShoesBrand"] = document.querySelector("#shoesSize>td>#shoesSize").value;
  data["Size"] = document.querySelector("#shoesService>td>#shoesService").value;
  data["Status"] = document.querySelector("#shoesStatus>td>#shoesStatus").value;
  return data;
}

function clearInputData() {
  document.querySelector("#shoesNo>td>#shoesNo").value = "1";
  document.querySelector("#shoesBrand>td>#shoesBrand").value = "";
  document.querySelector("#shoesSize>td>#shoesSize").value = "";
  document.querySelector("#shoesService>td>#shoesService").children[0].selected = true
  document.querySelector("#shoesStatus>td>#shoesStatus").children[0].selected = true;
}

function insertOnClick() {
  // Insert data to database button
  var dataLocal = getData("CURRENT_DATA");
  if (!dataLocal) {
      dataLocal = {};
      dataLocal[0] = getInputData();
      dataLocal["timestampIn"] = ServerValue.TIMESTAMP;
      dataLocal["timestampOut"] = 0;
  }

  var id = document.querySelector("#shoesID>td>#shoesID").value;
  insert(id, dataLocal);
  clearInputData();
  document.querySelector("#shoesID>td>#shoesID").value = generateID(); // Regenerate ID
  if (getData("CURRENT_DATA")) removeData("CURRENT_DATA");
}

function addOnClick() {
  // Add data more than one.
  // If "CURRENT_DATA" already exits in sessionStorage that's mean data are not stored.

  var dataLocal = getData("CURRENT_DATA");
  if (dataLocal) {
      // If CURRENT_DATA already exists.
      var dataLength = -2;
      for (var key in dataLocal) dataLength++;
      dataLocal[dataLength] = getInputData();
  } else {
      dataLocal = {};
      dataLocal[0] = getInputData();
      dataLocal["timestampIn"] = ServerValue.TIMESTAMP;
      dataLocal["timestampOut"] = 0;
  }
  var nextNo = parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) + 1;
  storeData("CURRENT_DATA", JSON.stringify(dataLocal));
  clearInputData();
  document.querySelector("#shoesNo>td>#shoesNo").value = nextNo;
}

function inputHandler() {

  document.querySelector("#insertBtn").addEventListener("click", () => {

      /* Popup part */
      if (document.querySelector(".popup>.content>div")) document.querySelector(".popup>.content>div").remove(); // Clear popup content
      document.querySelector(".popup>.popuptitle").innerText = "Insert Data";
      document.querySelector("#insertupdate").innerText = "INSERT";
      document.querySelector(".popup>.popup-buttons>#cancel").addEventListener("click", () => {
          // Cancel data
          document.querySelector(".popup-container").style.display = "none";
          document.querySelector("#insertupdate").removeEventListener("click", insertOnClick);
          document.querySelector("#addBtn").removeEventListener("click", addOnClick);
      })

      /* Template part */
      var template = document.querySelector("#insertUpdateTemplate").content.cloneNode(true).children[0];
      template.children[1].children[0].addEventListener("click", () => {
          // back
      })
      template.children[1].children[1].addEventListener("click", () => {
          // add data
      })
      template.children[1].children[2].addEventListener("click", () => {
          // next
      })
      template.children[0].children[0].children[0].children[1].children[0].value = getData("ID"); // ID input
      template.children[0].children[0].children[2].children[1].children[0].addEventListener("input", () => {
          // Shoes brand input

      })
      template.children[0].children[0].children[3].children[1].children[0].addEventListener("input", (e) => {
          // Shoes size input
          import("../utils/validate").then(valid => {
              var shoesSize = document.querySelector("#insertUpdate>#input>tbody>#shoesSize>td:last-child>input").value

              if (shoesSize.length === 4) {
                  shoesSize = shoesSize.slice(0, -1);
              } else if (shoesSize.length > 4) {
                  shoesSize = "";
              }

              if (!valid.is_intOnly(shoesSize)) {
                  console.log("I AM Inside")
                  shoesSize = shoesSize.slice(0, -1);
              }

              document.querySelector("#insertUpdate>#input>tbody>#shoesSize>td:last-child>input").value = shoesSize; // Update content
          })
      })
      template.children[0].children[0].children[4].children[1].children[0].addEventListener("input", () => {
          // Shoes service input

      })
      template.children[0].children[0].children[5].children[1].children[0].addEventListener("input", () => {
          // Shoes status input

      })

      document.querySelector(".popup>.content").appendChild(template);
      document.querySelector(".popup-container").style.display = "";

      document.querySelector("#insertupdate").addEventListener("click", insertOnClick);
      document.querySelector("#addBtn").addEventListener("click", addOnClick);
  })
}

function updateHandler() {
  /* Popup part */
  document.querySelector(".popup>.popuptitle").innerText = "Update Data";
  document.querySelector(".popup>.popup-buttons>#insertupdate").innerText = "UPDATE";

  /* Template part */
  var template = document.querySelector("#insertUpdateTemplate").content.cloneNode(true);
  template.children[1].children[1].remove();
}

function deleteHandler() {

}

function displayData(data, prepend = false) {

  // Node-1
  for (var childKey in data) {
      var tree = document.querySelector("#treeTemplate").content.cloneNode(true).children[0];

      // Node-1 Icon
      tree.children[0].children[0].classList.add("closed");
      tree.children[0].children[0].addEventListener("click", (e) => {
          console.log(e);

          var displayState = Boolean(getParentOfDepth(2, e.target).children[1].style.display);

          if (!displayState) {
              getParentOfDepth(2, e.target).children[1].style.display = "none";

              var elementCount = getParentOfDepth(2, e.target).children[1].childElementCount - 2;
              for (var idx = 0; idx < elementCount; idx++) {
                  getParentOfDepth(2, e.target).children[1].children[idx].children[0].children[0].classList.remove("opened");
                  getParentOfDepth(2, e.target).children[1].children[idx].children[0].children[0].classList.add("closed");
                  getParentOfDepth(2, e.target).children[1].children[idx].children[1].style.display = "none"
              }
          } else {
              getParentOfDepth(2, e.target).children[1].style.display = "";
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
              content.children[0].children[0].innerText = `Entry date: ${new Date(dataChild[childKey2]).toLocaleDateString('id',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
              content.children[0].children[1].remove()
          } else if (childKey2 === "timestampOut") {
              treeChildContent.children[0].classList.add("leaf");
              content.children[0].children[0].innerText = `Done date: ${dataChild[childKey2]}`
              content.children[0].children[1].remove()
          } else {
              treeChildContent.children[0].addEventListener("click", (e) => {
                  var displayState = Boolean(getParentOfDepth(2, e.target).children[1].style.display);

                  if (!displayState) {
                      getParentOfDepth(2, e.target).children[1].style.display = "none";
                  } else {
                      getParentOfDepth(2, e.target).children[1].style.display = "";
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
              content.children[0].children[0].innerText = parseInt(childKey2) + 1;

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

      if (!prepend) document.querySelector("#display").appendChild(tree);
      else document.querySelector("#display").insertBefore(tree, document.querySelector("#display>li"))
  }
}

// This function add new element if user signed
function defaultAdmin() {
  document.querySelector("#admin_login").remove();
  if (!Boolean(getData("DATA"))) {
      const response = adminRead("/");
      var dataList = {};
      response.then((data) => {
          for (var child in data) {
              dataList[child] = data[child];
          }
          console.log("response")
          console.log(data);
          console.log("dataList")
          console.log(dataList);
          storeData("data", JSON.stringify(dataList));
          displayData(dataList);
      })
  } else {
      var data = getData("DATA");
      displayData(data);
  }

  if (!Boolean(getData("ID"))) generateID();

  inputHandler();
}

export {
  defaultAdmin,
  displayData
}