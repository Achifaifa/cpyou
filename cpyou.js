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
    console.log( "ready!" );

    // Initial state
    state={ "registers":{ "A":0x00000000, 
                          "B":0x00000000, 
                          "C":0x00000000, 
                          "R":0x00000000
                        },
            "flags": "00000000"
            "history": ["NOP", "NOP", "NOP", "NOP", "NOP"],
            "stack": [],
            "memory": {},
            "instruction": ""
            "level": 0
            "goal": ""
    }

    // Register functions
    $("button, input[value='A']").click(function(){console.log("clicked A register")});
    $("button, input[value='B']").click(function(){console.log("clicked B register")});
    $("button, input[value='C']").click(function(){console.log("clicked C register")});
    $("button, input[value='R']").click(function(){console.log("clicked R register")});
    // Instruction functions
    $("button, input[value='RUN']").click(function(){console.log("clicked RUN ")});
    $("button, input[value='CLR']").click(function(){console.log("clicked CLEAR")});
    $("button, input[value='MOV']").click(function(){console.log("clicked MOV instruction")});
    $("button, input[value='ADD']").click(function(){console.log("clicked ADD instruction")});
    $("button, input[value='SUB']").click(function(){console.log("clicked SUB instruction")});
    $("button, input[value='PUT']").click(function(){console.log("clicked PUT instruction")});
    $("button, input[value='POP']").click(function(){console.log("clicked POP instruction")});
    $("button, input[value='CMP']").click(function(){console.log("clicked CMP instruction")});
    $("button, input[value='RPT']").click(function(){console.log("clicked RPT instruction")});
    $("button, input[value='SHL']").click(function(){console.log("clicked SHL instruction")});
    $("button, input[value='SHR']").click(function(){console.log("clicked SHR instruction")});
    $("button, input[value='NOP']").click(function(){console.log("clicked NOP instruction")});
    // History button functions
    $("button, input[value='0']").click(function(){console.log("clicked history (0)")});
    $("button, input[value='1']").click(function(){console.log("clicked history (1)")});
    $("button, input[value='2']").click(function(){console.log("clicked history (2)")});
    $("button, input[value='3']").click(function(){console.log("clicked history (3)")});
    $("button, input[value='4']").click(function(){console.log("clicked history (4)")});
    $("button, input[value='5']").click(function(){console.log("clicked history (5)")});
    // Memory button functions
    $("button, input[value='0x0']").click(function(){console.log("clicked memory (0x0)")});
    $("button, input[value='0x1']").click(function(){console.log("clicked memory (0x1)")});
    $("button, input[value='0x2']").click(function(){console.log("clicked memory (0x2)")});
    $("button, input[value='0x3']").click(function(){console.log("clicked memory (0x3)")});
    $("button, input[value='0x4']").click(function(){console.log("clicked memory (0x4)")});
    $("button, input[value='0x5']").click(function(){console.log("clicked memory (0x5)")});
    $("button, input[value='0x6']").click(function(){console.log("clicked memory (0x6)")});
    $("button, input[value='0x7']").click(function(){console.log("clicked memory (0x7)")});
    $("button, input[value='0x8']").click(function(){console.log("clicked memory (0x8)")});
    $("button, input[value='0x9']").click(function(){console.log("clicked memory (0x9)")});
    $("button, input[value='0xA']").click(function(){console.log("clicked memory (0xA)")});
    $("button, input[value='0xB']").click(function(){console.log("clicked memory (0xB)")});
    $("button, input[value='0xC']").click(function(){console.log("clicked memory (0xC)")});
    $("button, input[value='0xD']").click(function(){console.log("clicked memory (0xD)")});
    $("button, input[value='0xE']").click(function(){console.log("clicked memory (0xE)")});
    $("button, input[value='0xF']").click(function(){console.log("clicked memory (0xF)")});

});