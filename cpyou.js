$( document ).ready(function() {

memaddr=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
helpon=0;
levels=[
{ "level": "01",
  "goal": "Add the numbers in memory, put the result in M0xF",
  "registers":{ "A":0x00000000, 
                "B":0x00000000, 
                "C":0x00000000, 
                "R":0x00000000
              },
  "flags": [0, 0, 0, 0, 0, 0, 0, 0],
  "history": [],
  "stack": [],
  "memory": {"M0x0": 0x1009F6AB, "M0x1": 0x55610FFF, "M0x2": 0x0055ABBF},
  "instruction": [],
  "left": 10, //Best: 6
  "condition": "state['memory']['M0xF']==0x65c0b269"
  
},
{ "level": "02",
  "goal": "Calculate M0x0 % M0x1 and put the result in M0xF",
  "registers":{ "A":0x00000000, 
                "B":0x00000000, 
                "C":0x00000000, 
                "R":0x00000000
              },
  "flags": [0, 0, 0, 0, 0, 0, 0, 0],
  "history": [],
  "stack": [],
  "memory": {"M0x0": 0x02107010, "M0x1": 0x0109AE00},
  "instruction": [],
  "left": 30, 
  "condition": "state['memory']['M0xF']==0x0106c210"
  
}]

// Initial state
initialstate={ 
        "registers":{ "A":0x00000000, 
                      "B":0x00000000, 
                      "C":0x00000000, 
                      "R":0x00000000
                    },
        "flags": [0, 0, 0, 0, 0, 0, 0, 0],
        "history": [],
        "stack": [],
        "memory": {},
        "instruction": [],
        "left": 50,
        "level": "--",
        "goal": "--",
        "condition": "1==0"
}

// Copy (?) initial state to avoid referencing it
state=jQuery.extend(true, {}, initialstate);

// Register button functions
$("button, input[value='A']").click(function(){ addinst("A") });
$("button, input[value='B']").click(function(){ addinst("B") });
$("button, input[value='C']").click(function(){ addinst("C") });
$("button, input[value='R']").click(function(){ addinst("R") });
// Instruction button functions
$("button, input[value='RUN']").click(function(){ runinst() });
$("button, input[value='CLR']").click(function(){ clrinst() });
$("button, input[value='MOV']").click(function(){ addinst("MOV") });
$("button, input[value='ADD']").click(function(){ addinst("ADD") });
$("button, input[value='SUB']").click(function(){ addinst("SUB") });
$("button, input[value='PUT']").click(function(){ addinst("PUT") });
$("button, input[value='POP']").click(function(){ addinst("POP") });
$("button, input[value='CMP']").click(function(){ addinst("CMP") });
$("button, input[value='RPT']").click(function(){ addinst("RPT") });
$("button, input[value='SHL']").click(function(){ addinst("SHL") });
$("button, input[value='SHR']").click(function(){ addinst("SHR") });
$("button, input[value='NOP']").click(function(){ addinst("NOP") });
// History button functions
$("button, input[value='0']").click(function(){ rptinst(0) });
$("button, input[value='1']").click(function(){ rptinst(1) });
$("button, input[value='2']").click(function(){ rptinst(2) });
$("button, input[value='3']").click(function(){ rptinst(3) });
$("button, input[value='4']").click(function(){ rptinst(4) });
$("button, input[value='5']").click(function(){ rptinst(5) });
// Memory button functions
$("button, input[value='0x0']").click(function(){ addinst("M0x0") });
$("button, input[value='0x1']").click(function(){ addinst("M0x1") });
$("button, input[value='0x2']").click(function(){ addinst("M0x2") });
$("button, input[value='0x3']").click(function(){ addinst("M0x3") });
$("button, input[value='0x4']").click(function(){ addinst("M0x4") });
$("button, input[value='0x5']").click(function(){ addinst("M0x5") });
$("button, input[value='0x6']").click(function(){ addinst("M0x6") });
$("button, input[value='0x7']").click(function(){ addinst("M0x7") });
$("button, input[value='0x8']").click(function(){ addinst("M0x8") });
$("button, input[value='0x9']").click(function(){ addinst("M0x9") });
$("button, input[value='0xA']").click(function(){ addinst("M0xA") });
$("button, input[value='0xB']").click(function(){ addinst("M0xB") });
$("button, input[value='0xC']").click(function(){ addinst("M0xC") });
$("button, input[value='0xD']").click(function(){ addinst("M0xD") });
$("button, input[value='0xE']").click(function(){ addinst("M0xE") });
$("button, input[value='0xF']").click(function(){ addinst("M0xF") });
// Add another one for updating the screen when a button is pressed
$("button, input").on("click", update);
// Detect when the help image is pressed to close it
$("#everything #help").on("click", cyclehelp);

// Intercept links
$('#everything').delegate('a', 'click', function(event) {
  event.preventDefault();
  lvl=event.currentTarget.href.slice(-2)

  // Show/hide help
  if (lvl=="lp"){
    cyclehelp();
  }

  // Process level links
  else{
    loadlevel(parseInt(lvl))
  }
});

// Show or hide the help screen by modifying the div height
function cyclehelp(){
  helpon=(helpon+1)%2;
  jQuery('#help').css('height', 630*helpon);
}

// Load a new level
function loadlevel(n){
  nlvl=levels[n-1]
  if (nlvl!=undefined) {
    state=jQuery.extend(true, {}, nlvl)
    update()
  }
}

// Adds stuff to the current instruction 
function addinst(inst){

  if (state["instruction"].length<3) {state["instruction"].push(inst)}
}

// Clears the current instruction
function clrinst(){ 

  state["instruction"]=[] 
}

// Puts a function from the history into the instruction slot
function rptinst(n){
  ni=state["history"][state["history"].length-n-1]
  if (ni!=undefined) {state["instruction"]=ni.slice(-3)}
}

// Adds instruction to history
function addhist(){

  state["history"].push(state["instruction"])
  if (state["history"].length>6) {state["history"].splice(undefined,1)}
}

// Checks the status for problems
function checkst(){

  if (state["stack"].length>16) {alert("Stack Overflow!\nGame over")}
  else if (state["stack"].length>14) {state["flags"][7]=1}
  else if (state["stack"].length<=14) {state["flags"][7]=0}

  if (state["left"]<=0) {alert("No more moves!\nGame over")}

  if (eval(state["condition"])) {
    alert("That's right!")
    state=jQuery.extend(true, {}, initialstate)
  }
}

// Runs the current instruction
// Instruction set:
//
// [X] MOV X Y -> Moves the contents of X to Y
// [X] ADD     -> Adds A and B and puts the result in R
// [X] SUB     -> Subtracts A and B and puts the result in R
// [X] PUT X   -> Puts a value from X (A, B or R) in the stack
// [X] POP X   -> Gets a value from the stack (Puts it in A or B)
// [X] CMP     -> Compares A and B
// [X] SHL X   -> Shifts bits to the left in X (A or B)
// [X] SHR X   -> Shifts bits to the right in X (A or B)
// [X] NOP     -> Does nothing
//
// Flags:
//
// 0      1         2           3   4   5   6   7
// Sign | Compare | Not Equal | X | X | X | X | Stack Full warning
function runinst(){

  st=state["instruction"]

  if (st.length==0) {return}

  if (st[0]=="MOV") {
    if (["A", "B", "R", "C"].indexOf(st[1])==-1 && st[1].indexOf("M0x")==-1) {return}
    if (["A", "B", "R"].indexOf(st[2])==-1 && st[2].indexOf("M0x")==-1) {return}
    from="memory"
    if (["A", "B", "R", "C"].indexOf(st[1])!=-1) {
      from="registers"
    }
    to="memory"
    if (["A", "B", "R"].indexOf(st[2])!=-1) {
      to="registers"
    }

    state[to][st[2]]=state[from][st[1]]
  }

  else if (st[0]=="SHR") {
    if (st.length!=2){return}
    if (["A", "B"].indexOf(st[1])==-1) {return}

    state["registers"][st[1]]=state["registers"][st[1]]>>1
  }

  else if (st[0]=="SHL") {
    if (st.length!=2){return}
    if (["A", "B"].indexOf(st[1])==-1) {return}

    state["registers"][st[1]]=state["registers"][st[1]]<<1
  }

  else if (st[0]=="ADD") { 
    if (st.length!=1) {return}
    state["registers"]["R"] = state["registers"]["A"]+state["registers"]["B"]
  }

  else if (st[0]=="SUB") { 
    if (st.length!=1) {return}
    res = state["registers"]["A"]-state["registers"]["B"]
    if (res<0){
      res=abs(res)
      state["flags"][0]=1
    }
    state["registers"]["R"]=res
  }

  else if (st[0]=="PUT") {
    if (st.length!=2) {return}
    if (["A", "B", "R"].indexOf(st[1])==-1) {return}
    state["stack"]=[state["registers"][st[1]]].concat(state["stack"])
  }

  else if (st[0]=="POP") {
    if (st.length!=2) {return}
    if (["A", "B", "R"].indexOf(st[1])==-1) {return}
    state["registers"][st[1]]=state["stack"].pop()
  }

  else if (st[0]=="CMP"){
    if (st.length!=1) {return}
    if (state["registers"]["A"]>state["registers"]["B"]) {state["flags"][1]=1}
    else {state["flags"][1]=0}
    if (state["registers"]["A"]!=state["registers"]["B"]) {state["flags"][2]=1}
  }

  else if (st[0]=="NOP"){
    if (st.length!=1) {return}
  }

  state["left"]-=1
  addhist()
  clrinst()
  checkst()
}

// Update the screen with the new state
function update(){

  $("#registers #regdata").eq(0).text( ("0000000"+state["registers"]["A"].toString(16)).slice(-8) )
  $("#registers #regdata").eq(1).text( ("0000000"+state["registers"]["B"].toString(16)).slice(-8) )
  $("#registers #regdata").eq(2).text( ("0000000"+state["registers"]["C"].toString(16)).slice(-8) )
  $("#registers #regdata").eq(3).text( ("0000000"+state["registers"]["R"].toString(16)).slice(-8) )

 
  for (i=0; i<16; i++){
    // Update all the stack information
    nextst=state["stack"][i]
    if (nextst==undefined){nextst="00000000"}
    $("#stack #stackdata").eq(i).text(("0000000"+nextst.toString(16)).slice(-8))
    // Reset all memory
    $("#memory #memdata").eq(i).text("00000000")
    // Update history
    nexthi=state["history"][state["history"].length-i-1]
    if (nexthi==undefined){nexthi=[]}
    $("#history #histdata").eq(i).text(nexthi.join(" "))
    // Update flag data
    $("#registers #flagdata").eq(i).text(state["flags"][i])
  }

  // Update memory from dict
  memaddr.forEach(function(currentValue){
    i=currentValue
    val=state["memory"]["M0x"+i]
    if (val!=undefined){
      $("#memory #memdata").eq(parseInt(i, 16)).text( ("0000000"+val.toString(16)).slice(-8) )
    }
  })
    
  $("#levelno").text(state["level"])
  $("#goal").text(state["goal"])
  $("#instructions #instleft").text(state["left"])
  $("#instructions #instruction").text(state["instruction"].join(" "))
  $("#stack #stacklen").text(state["stack"].length)

  checkst()
}

update();

});//end of ready