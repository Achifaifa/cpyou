// Instruction set:
//
// MOV X Y -> Moves the contents of X to Y
// ADD     -> Adds A and B and puts the result in R
// SUB     -> Subtracts A and B and puts the result in R
// PUT X   -> Puts a value from X (A, B or R) in the stack
// POP X   -> Gets a value from the stack (Puts it in A or B)
// CMP     -> Compares A and B
// RPT N M -> Repeats instructions N to M in the history and decreases counter until counter is 0
// SHL X   -> Shifts bits to the left in X (A or B)
// SHR X   -> Shifts bits to the right in X (A or B)
// NOP     -> Does nothing

$( document ).ready(function() {

// Initial state
state={ "registers":{ "A":"00000000", 
                      "B":"00000000", 
                      "C":"00000000", 
                      "R":"00000000"
                    },
        "flags": "00000000",
        "history": [],
        "stack": [],
        "memory": {},
        "instruction": [],
        "left": 0,
        "level": "--",
        "goal": "--"
}

// Register functions
$("button, input[value='A']").click(function(){ addinst("A") });
$("button, input[value='B']").click(function(){ addinst("B") });
$("button, input[value='C']").click(function(){ addinst("C") });
$("button, input[value='R']").click(function(){ addinst("R") });
// Instruction functions
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

$("button, input").on("click", update);

// Adds stuff to the current instruction (
function addinst(inst){

  if (state["instruction"].length<3) {state["instruction"].push(inst)}
}

// Clears the current instruction
function clrinst(){ 

  state["instruction"]=[] 
}

function rptinst(n){
  ni=state["history"][n-1]
  if (ni!=undefined) {state["instruction"]=ni}
}

// Runs the current instruction
function runinst(){

  addhist()
  clrinst()
}

// Adds instruction to history
function addhist(){

  state["history"].push(state["instruction"])
  if (state["history"].length>6) {state["history"].splice(undefined,1)}
}
  

// Update the screen with the new state
function update(){

  $("#registers #regdata").eq(0).text(state["registers"]["A"])
  $("#registers #regdata").eq(1).text(state["registers"]["B"])
  $("#registers #regdata").eq(2).text(state["registers"]["C"])
  $("#registers #regdata").eq(3).text(state["registers"]["R"])

 
  for (i=0; i<16; i++){
    // Update all the stack information
    nextst=state["stack"][i]
    if (nextst==undefined){nextst="00000000"}
    $("#stack #stackdata").eq(i).text(nextst)
    // Reset all memory
    $("#memory #memdata").eq(i).text("00000000")
    // Update history
    nexthi=state["history"][state["history"].length-i-1]
    if (nexthi==undefined){nexthi=""}
    $("#history #histdata").eq(i).text(nexthi)
    // Update flag data
    $("#registers #flagdata").eq(i).text(state["flags"][i])
  }
  
  $("#levelno").text(state["level"])
  $("#goal").text(state["goal"])
  $("#instructions #instleft").text(state["left"])
  $("#instructions #instruction").text(state["instruction"].join(" "))
  $("#stack #stacklen").text(state["stack"].length)
}

update();

});//end of ready