function setBreakAttr(inputDiv) {  
  inputDiv.append(document.createElement("br"));
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  return el;
}

function createDivEl(valID, parent, isLast=true, el=null, func=null) {
  var div = document.createElement("div");
  div.setAttribute("id", `div-${valID}`);
  
  if (!isLast) func(parent, div, el);
  else parent.append(div);

  return div;
}

function createBtnEl(elAttr, labelText, disable, parent, isLast=true, func=null, el=null) {
  var btn = document.createElement("button");
  btn.setAttribute("id", elAttr.id);
  btn.innerText = labelText;
  btn.disabled = disable;

  parent.append(btn);
}

/** 
 * elAttr are sets of attribute.
 * labelText are label for this element.
 */
function createInputEl(elAttr, labelText, disable, parent, isLast=true, func=null, el=null) {
  parent = createDivEl(elAttr.id, parent, isLast, el, func);
  var label = document.createElement("label");
  label.setAttribute("for", elAttr.id);
  label.innerText = labelText;
  parent.append(label);

  var input = document.createElement("input");
  input = setAttributes(input, elAttr)
  input.disabled = disable;
  parent.append(input);
  setBreakAttr(parent); // TODO: ???
}

function createCheckEl(elAttr, labelText, disable, parent, isLast=true, func=null, el=null) {
  parent = createDivEl(elAttr.id, parent, isLast, el, func);

  var input = document.createElement("input");
  input = setAttributes(input, elAttr)
  input.disabled = disable;

  var label = document.createElement("label");
  label.setAttribute("for", elAttr.id);
  label.innerText = labelText;
  
  if (isLast) {
    parent.append(input);
    parent.append(label);
  }
}

function createSelectEl(vals, valID, labelText, parent, isLast=true, func=null, el=null, disabled=false) {
  parent = createDivEl(valID, parent, isLast, el, func);

  var select = document.createElement("select");
  select.setAttribute("id", valID);
  select.disabled = disabled;
  
  var label = document.createElement("label");
  label.setAttribute("for", valID);
  label.innerText = labelText;
  parent.append(label);

  for(var key in vals) {
    var option = document.createElement("option");

    option.setAttribute("value", key);
    option.innerHTML = vals[key];
    select.append(option);
  }
  
  parent.append(select);
  setBreakAttr(parent); // TODO
}

function createOptionEl(parent, data=[0], isReset=false, custMsg="- ENTER ID FIRST -") {  

  var elementLen = parent.childNodes.length; // TODO: Change this line to childCounts?
  for (var i = 0; i < elementLen; ++i) {
    parent.removeChild(parent.childNodes[0]);
  }

  var values_IT = data.values(), current_IT;
  var i = 0, index = 0;
  do  {    
    current_IT = values_IT.next();
    
    if (current_IT.value) {
      var option = document.createElement("option");
      option.setAttribute("value", index);
      
      if (!isReset) option.innerHTML = (i+1);
      else option.innerHTML = custMsg;

      parent.append(option); ++i;
    } 
    ++index;
  } while (!current_IT.done);
}

export {
    createInputEl, 
    createSelectEl,
    createCheckEl,
    createOptionEl,
    createDivEl,
    createBtnEl
}