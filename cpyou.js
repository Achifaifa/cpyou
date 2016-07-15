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
  "program": {},
  "ppointer": 0,
  "stack": [],
  "memory": {"M0x0": 0x1009F6AB, "M0x1": 0x55610FFF, "M0x2": 0x0055ABBF},
  "instruction": [],
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
  "program": {},
  "ppointer": 0,
  "stack": [],
  "memory": {"M0x0": 0x02107010, "M0x1": 0x0109AE00},
  "instruction": [],
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
  "program": {},
  "ppointer": 0,
  "stack": [],
  "memory": {},
  "instruction": [],
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
$("button, input[value='RUN']").click(function(){ runinst(state["instruction"], 0) });
$("button, input[value='CLR']").click(function(){ clrinst() });
$("button, input[value='<--']").click(function(){ modprog("<--") });
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
$("button, input[value='GTO']").click(function(){ addinst("GTO") });
$("button, input[value='JNG']").click(function(){ addinst("JNG") });
$("button, input[value='JGE']").click(function(){ addinst("JGE") });
$("button, input[value='JLE']").click(function(){ addinst("JLE") });
$("button, input[value='JZR']").click(function(){ addinst("JZR") });
// History button functions
$("button, input[value='0']").click(function(){ rptinst(0) });
$("button, input[value='1']").click(function(){ rptinst(1) });
$("button, input[value='2']").click(function(){ rptinst(2) });
$("button, input[value='3']").click(function(){ rptinst(3) });
$("button, input[value='4']").click(function(){ rptinst(4) });
$("button, input[value='5']").click(function(){ rptinst(5) });
// Program button functions
$("button, input[value='RSI']").click(function(){ modprog("RSI") });
$("button, input[value='STP']").click(function(){ modprog("STP") });
$("button, input[value='CPY']").click(function(){ modprog("CPY") });
$("button, input[value='EXE']").click(function(){ modprog("EXE") });
$("button, input[value='RMI']").click(function(){ modprog("RMI") });
$("button, input[value='DEL']").click(function(){ modprog("DEL") });
$("button, input[value='v']").click(function(){ modprog("v") });
$("button, input[value='vv']").click(function(){ modprog("vv") });
$("button, input[value='^']").click(function(){ modprog("^") });
$("button, input[value='^^']").click(function(){ modprog("^^") });
// Memory button functions
$("button, input[value='M0x0']").click(function(){ addinst("M0x0") });
$("button, input[value='M0x1']").click(function(){ addinst("M0x1") });
$("button, input[value='M0x2']").click(function(){ addinst("M0x2") });
$("button, input[value='M0x3']").click(function(){ addinst("M0x3") });
$("button, input[value='M0x4']").click(function(){ addinst("M0x4") });
$("button, input[value='M0x5']").click(function(){ addinst("M0x5") });
$("button, input[value='M0x6']").click(function(){ addinst("M0x6") });
$("button, input[value='M0x7']").click(function(){ addinst("M0x7") });
$("button, input[value='M0x8']").click(function(){ addinst("M0x8") });
$("button, input[value='M0x9']").click(function(){ addinst("M0x9") });
$("button, input[value='M0xA']").click(function(){ addinst("M0xA") });
$("button, input[value='M0xB']").click(function(){ addinst("M0xB") });
$("button, input[value='M0xC']").click(function(){ addinst("M0xC") });
$("button, input[value='M0xD']").click(function(){ addinst("M0xD") });
$("button, input[value='M0xE']").click(function(){ addinst("M0xE") });
$("button, input[value='M0xF']").click(function(){ addinst("M0xF") });
// Program button functions
$("button, input[value='P0x0']").click(function(){ modprog("P0x0"); addinst("P0x0") });
$("button, input[value='P0x1']").click(function(){ modprog("P0x1"); addinst("P0x1") });
$("button, input[value='P0x2']").click(function(){ modprog("P0x2"); addinst("P0x2") });
$("button, input[value='P0x3']").click(function(){ modprog("P0x3"); addinst("P0x3") });
$("button, input[value='P0x4']").click(function(){ modprog("P0x4"); addinst("P0x4") });
$("button, input[value='P0x5']").click(function(){ modprog("P0x5"); addinst("P0x5") });
$("button, input[value='P0x6']").click(function(){ modprog("P0x6"); addinst("P0x6") });
$("button, input[value='P0x7']").click(function(){ modprog("P0x7"); addinst("P0x7") });
$("button, input[value='P0x8']").click(function(){ modprog("P0x8"); addinst("P0x8") });
$("button, input[value='P0x9']").click(function(){ modprog("P0x9"); addinst("P0x9") });
$("button, input[value='P0xA']").click(function(){ modprog("P0xA"); addinst("P0xA") });
$("button, input[value='P0xB']").click(function(){ modprog("P0xB"); addinst("P0xB") });
$("button, input[value='P0xC']").click(function(){ modprog("P0xC"); addinst("P0xC") });
$("button, input[value='P0xD']").click(function(){ modprog("P0xD"); addinst("P0xD") });
$("button, input[value='P0xE']").click(function(){ modprog("P0xE"); addinst("P0xE") });
$("button, input[value='P0xF']").click(function(){ modprog("P0xF"); addinst("P0xF") });
// Add another one for updating the screen when a button is pressed
$("button, input").on("click", update);
// Detect when the help image is pressed to close it
$("#everything #help").on("click", cyclehelp);

// Intercept links
$('body').delegate('a', 'click', function(event) {
  event.preventDefault();
  lvl=event.currentTarget.href.slice(-2)

  // Show/hide help
  if (lvl=="lp"){
    cyclehelp();
  }

  // Process level links
  else {
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

// Increases the instruction pointer by n (1 or -1)
function ppointerinc(n){

  p=state["ppointer"]
  if (n==1 && p<15){state["ppointer"]+=1}
  if (n==-1 && p>0){state["ppointer"]-=1}
}

// Runs the n next instructions in the program
// Should be called with a setTimeout of 1s
function rsi(n){

  if (n==0){return}

  inst=state["program"]["P0x"+memaddr[state["ppointer"]]]
  if (inst!=undefined){
    runinst(inst, 1)
  }
  ppointerinc(1)
  update()
  setTimeout(rsi, 1000, n-1)
}

// Processes the program modification buttons
//
// RSI -> Run single instruction
// STP -> Run a step (Run instruction, advance pointer)
// EXE -> Run entire program
// CPY -> Copy an instruction to another slot
// RMI -> Remove instruction
// DEL -> Delete entire program
// v   -> Increase pointer
// vv  -> Move pointer to the last instruction
// ^   -> Decrease pointer
// ^^  -> Reset pointer
function modprog(inst){

  currentpr=$("#progstatus").text()

  // Instruction pointer movement
  if (inst=="v"){
    ppointerinc(1)
  }
  if (inst=="vv"){
    state["ppointer"]=15
  }
  if (inst=="^"){
    ppointerinc(-1)
  }
  if (inst=="^^"){
    state["ppointer"]=0
  }

  // Instruction removal
  else if (inst=="RMI"){
    $("#progstatus").text("Remove")
  }
  else if (inst=="DEL"){

    if (currentpr=="¿Clear program?") {
      state["program"]={}
      $("#progstatus").text("Idle")
    }
    else {
      $("#progstatus").text("¿Clear program?")
    }
  }

  // Program run
  if (inst=="RSI"){
    $("#progstatus").text("Run Single")
  }
  else if (inst=="STP"){
    $("#progstatus").text("Running Step")
    setTimeout(rsi,1000, 1)
    $("#progstatus").text("Idle")
  }
  else if (inst=="EXE"){
    $("#progstatus").text("Running")
    setTimeout(rsi, 1000, 15-state["ppointer"])
    $("#progstatus").text("Idle")
  }
  
  // Instruction add and copy
  else if (inst=="<--"){
    $("#progstatus").text("Select slot")
  }
  else if (inst=="CPY"){
    $("#progstatus").text("Copy")
  }
  
  // Instruction selection processing
  else if (inst.slice(0,3)=="P0x"){

    if (currentpr=="Select slot"){
      if (parseinst()==1){
        state["program"][inst]=jQuery.extend(true, [], state["instruction"]);
        state["instruction"]=[]
      }
      $("#progstatus").text("Idle")
    }
    else if (currentpr=="Copy"){
      $("#progstatus").text("Copy "+inst)
    }
    else if (currentpr.slice(0,-1)=="Copy P0x"){
      if (state["program"][inst]!=undefined){
        if (state["program"][inst].length!=0){
          state["program"][inst]=jQuery.extend(true, [], state["program"][currentpr.slice(-4)]);
        }
      }
      $("#progstatus").text("Idle")
    }
    else if (currentpr=="Remove"){
      delete state["program"][inst]
      $("#progstatus").text("Idle")
    }
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

  if (eval(state["condition"])) {
    alert("That's right!")
    state=jQuery.extend(true, {}, initialstate)
  }
}

// Returns 1 if the current instruction is legit
function parseinst(){

  inst=state["instruction"]
  
  if (["ADD","SUB","CMP","NOP"].indexOf(inst[0])!=-1 && inst.length!=1){
    return 0
  }
  if (inst[0]=="PUT" && (["A", "B", "R"].indexOf(inst[1])==-1 || inst.length!=2)){
    return 0
  }
  if (inst[0]=="POP" && (["A", "B"].indexOf(inst[1])==-1 || inst.length!=2)){
    return 0
  }
  if (["SHR", "SHL"].indexOf(inst[0])!=-1 && (["A","B"].indexOf(inst[1])==-1 || inst.length!=2)){
    return 0
  }
  if  (inst[0]=="MOV"){
    if (inst.length!=3) {
      return 0
    } 
    if (["A", "B", "R", "C"].indexOf(inst[1])==-1 && inst[1].indexOf("M0x")==-1) {
      return 0
    }
    if (["A", "B", "R"].indexOf(inst[2])==-1 && inst[2].indexOf("M0x")==-1) {
      return 0
    }
  }

  return 1
}

// Runs the current instruction
// Instruction set:
//
// General instructions
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
// To-memory only instructions
//
// [ ] GTO P   -> Goto instruction P
// [ ] JNG P   -> Jump to instruction P if the negative flag is 1
// [ ] JGE P   -> Jump to instruction P if the comparison was greater or equal
// [ ] JLE P   -> Jump to instruction P if the comparison was less
// [ ] JZR P   -> Jump to instruction P if R is 0
//
// Flags:
//
// 0      1         2           3   4   5   6   7
// Sign | Compare | Not Equal | X | X | X | X | Stack Full warning
//
// source specifies the source of the instruction
// 0 -> Regular (Instruction slot)
// 1 -> Program 
function runinst(inst, source){

  if (inst.length==0) {return}

  else if (inst[0]=="MOV") {
    if (["A", "B", "R", "C"].indexOf(inst[1])==-1 && inst[1].indexOf("M0x")==-1) {return}
    if (["A", "B", "R"].indexOf(inst[2])==-1 && inst[2].indexOf("M0x")==-1) {return}
    from="memory"
    if (["A", "B", "R", "C"].indexOf(inst[1])!=-1) {
      from="registers"
    }
    to="memory"
    if (["A", "B", "R"].indexOf(inst[2])!=-1) {
      to="registers"
    }

    state[to][inst[2]]=state[from][inst[1]]
  }

  else if (inst[0]=="SHR") {
    if (inst.length!=2){return}
    if (["A", "B"].indexOf(inst[1])==-1) {return}

    state["registers"][inst[1]]=state["registers"][inst[1]]>>1
  }

  else if (inst[0]=="SHL") {
    if (inst.length!=2){return}
    if (["A", "B"].indexOf(inst[1])==-1) {return}

    state["registers"][inst[1]]=state["registers"][inst[1]]<<1
  }

  else if (inst[0]=="ADD") { 
    if (inst.length!=1) {return}
    state["registers"]["R"] = state["registers"]["A"]+state["registers"]["B"]
  }

  else if (inst[0]=="SUB") { 
    if (inst.length!=1) {return}
    res = state["registers"]["A"]-state["registers"]["B"]
    if (res<0){
      res=Math.abs(res)
      state["flags"][0]=1
    }
    state["registers"]["R"]=res
  }

  else if (inst[0]=="PUT") {
    if (inst.length!=2) {return}
    if (["A", "B", "R"].indexOf(inst[1])==-1) {return}
    state["stack"]=[state["registers"][inst[1]]].concat(state["stack"])
  }

  else if (inst[0]=="POP") {
    if (inst.length!=2) {return}
    if (["A", "B", "R"].indexOf(inst[1])==-1) {return}
    state["registers"][inst[1]]=state["stack"][0]
    state["stack"]=state["stack"].slice(-state["stack"].length+1)
  }

  else if (inst[0]=="CMP"){
    if (inst.length!=1) {return}
    if (state["registers"]["A"]>state["registers"]["B"]) {state["flags"][1]=1}
    else {state["flags"][1]=0}
    if (state["registers"]["A"]!=state["registers"]["B"]) {state["flags"][2]=1}
  }

  else if (inst[0]=="NOP"){
    if (inst.length!=1) {return}
  }

  if (source==0 && ["GTO", "JNG", "JGE", "JLE", "JZR"].indexOf(inst[0])==-1) {
    addhist();
    clrinst();
  }

  // Program only instruction processing
  else if (source==1 && inst.length==2 && inst[1].slice(0,3)=="P0x"){

    if (inst[0]=="GTO"){
      state["ppointer"]=memaddr.indexOf(inst[1].slice(-1))-1
    }

    if (inst[0]=="JNG"){
      if (state["flags"][0]==1){
        state["ppointer"]=memaddr.indexOf(inst[1].slice(-1))-1
      }
    }

    if (inst[0]=="JGE"){
      if (state["flags"][1]==1){
        state["ppointer"]=memaddr.indexOf(inst[1].slice(-1))-1
      }
    }

    if (inst[0]=="JLE"){
      if (state["flags"][1]==0 && state["flags"][2]==1){
        state["ppointer"]=memaddr.indexOf(inst[1].slice(-1))-1
      }
    }

    if (inst[0]=="JZR"){
      if (state["registers"]["R"]==0x0){
        state["ppointer"]=memaddr.indexOf(inst[1].slice(-1))-1
      }
    }
  }

  checkst()
}

// Update the screen with the new state
function update(){

  $("#registers #regdata").eq(0).text( ("0000000"+state["registers"]["A"].toString(16)).slice(-8) )
  $("#registers #regdata").eq(1).text( ("0000000"+state["registers"]["B"].toString(16)).slice(-8) )
  $("#registers #regdata").eq(2).text( ("0000000"+state["registers"]["C"].toString(16)).slice(-8) )
  $("#registers #regdata").eq(3).text( ("0000000"+state["registers"]["R"].toString(16)).slice(-8) )
 
  for (i=0; i<32; i++){

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

    // Reset all program
    $("#program #programdata").eq(i).text("--")
  }

  memaddr.forEach(function(i){

    // Update program from dict
    val=state["program"]["P0x"+i]
    if (val==undefined){
      delete state["program"]["P0x"+i]
    }
    else if (val.length==0){
      delete state["program"]["P0x"+i]
    }
    lpoint=parseInt(i, 16)
    if (val!=undefined){
      $("#program #programdata").eq(lpoint).text( val.join(" ") )
    }
    $("#program #programdata").eq(lpoint).css("color", "#000000")

    // Update memory from dict
    val=state["memory"]["M0x"+i]
    if (val!=undefined){
      $("#memory #memdata").eq(parseInt(i, 16)).text( ("0000000"+val.toString(16)).slice(-8) )
    }
  })

  // Highlight current instruction
  $("#program #programdata").eq(state["ppointer"]).css("color", "#00bb00")

  // Update level info
  $("#levelno").text(state["level"])
  $("#goal").text(state["goal"])

  // Update current instruction
  $("#instructions #instruction").text(state["instruction"].join(" "))

  // Show stack level indicator
  $("#stack #stacklen").text(state["stack"].length)

  checkst()
}

// Initial update of the screen
update();

});//end of ready