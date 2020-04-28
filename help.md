## About CPYou 

CPYou is a game that simulates a fictional processor and uses assembly language as a tool to solve algorithmic challenges. The overall objective of the game is to solve challenges using only the instructions and registers provided.

## How to play

The current level and goal are displayed on the top of the screen.

Once a level has been successfully completed, a popup will show up to let you know. You can then select another level or try to improve the program to use as few instructions as possible.

## Tips and tricks

You don't need to be an assembly expert to play this, but you'll need to learn some things before using it. Here are some general tips and tricks, and things you'll find weird if it's your first time.

* All the data you see his in hexadecimal (Base 16)

Everything in the memory, registers, etc is in hexadecimal format. Hexadecimal (hex) is base16, and like base10 uses the symbols 0-9, it uses 16 symbols: numbers 0-9, and letters A-F. So, for example, 9-10-11 in hexadecimal would be 9-A-B. If you are wondering why, you can check this ![link](https://en.wikipedia.org/wiki/Hexadecimal#Binary_conversion)

* You only have 2 slots to do everything

If you have programmed with a higher level programming language you'll be used to working with as many variables as you want. In assembly you work with a limited number of slots you can put your information in. In this case, you have two registers, A and B, that you must use to process the information and complete the level.
If you are doing something and need to add two numbers, you'll need to save your progress somewhere else.

* You have a stack

Even if you have programmed something before, chances are you haven't bothered using stacks, but you'll need them here. More info further in this document.

* Instructions have weird names

Most of the time the instructions assume you've already placed what you want to process correctly in the registers, and will use whatever is in them as "arguments". To add two numbers A and B you'll need to put A in one register and B in another, and then run `ADD`, which will add whatever is in A and B together and will put it in R

The instructions also have weird 3 letter names. They are not the exact same names you may find in actual assembly, but they get close. They act as mnemonic rules for what the instructions do. So, for example, `ADD` stands for 'add', `CMP` stands for 'compare', and so on.

## Registers, flags and data storage

The data is provided in the first positions of the memory banks (Equivalent to RAM). The solution is usually expected in the last position of these banks. The **memory banks** are data storage positions you can access at any time and any position. You can use the MOV instruction to move things to or from the memory.

To the right of the memory banks you have the **stack**. The stack is a special data structure that allows data to be stored on top of each other. With the PUT instruction you can put data on top of the stack, and with the POP instruction you can get whatever is on top of the stack. You can't access anything on the stack that is not on the top, and you can't store more than 16 words in the stack. When the stack is full, the STW (STack Warning) flag will be 1.

The **program memory** is on the left of the screen. It's similar to the memory banks, except it can only store program instructions. You can add an instruction by composing it in the middle area (See 'instructions') and then using the '<--' button and selecting the position in which you want to store the instruction.

The middle area contains the main registers and the flags. There are two general purpose registers, a counter and a result register.

**A** and **B** are general purpose registers. You can put any data in here to be processed by the instructions, or move the data in them to memory or the stack. 

**C** is a counter register. You can set this with a number and increase (With the INC instruction) or decrease (DEC) it. This is useful to program loops. 

**R** is the result register. The results of addition, subtraction and other operations will be automatically moved here. 

**Flags** are single bits in a special flag register that show the current state of the processor. 

```
    0      1         2           3   4   5   6   7                 
    Sign | Compare | Not Equal | X | X | X | X | Stack Full warning
```

  * The **Sign (NEG)** flag activates when the result of a subtraction is less than zero. It stays on (or off) until a new subtraction is executed.
  * The **Compare (CMP)** flag activates when the data in register A is greater than the data in register B when a compare instruction is executed. Like the sign flag, it preserves the state until a new compare instruction is run.
  * The **Not Equal (NEQ)** flag activates when the data in A and B are not equal when a compare instruction is run. Again, it only updates when compare instructions are used.
  * Positions 3 to 6 are not currently used
  * The **Stack Full Warning (STW)** flag activates when the stack is full (16/16 slots used), and deactivates when less than 16 slots are used.

## Instructions

There are two types of instructions in CPYou. General instructions can be run independently (For example, to solve the easier levels), and To-memory only instructions can only be run by placing them in program memory and running the program. To-memory only instructions include jumps, loops and gotos that do not make sense as standalone instructions.

The last 3 general instructions you have ran are stored in the history (Middle bottom of the work area). You can click one of those instructions any time to bring it up again, so you don't have to compose it all over again.

This section contains all the instructions in CPYou and how they affect the state of the processor.

### General instructions

* MOV X Y
  Moves the contents of X [A, B, C, R or memory] to Y [A, B, R or memory]
* ADD
  Adds A and B and puts the result in R
* SUB
  Subtracts A and B and puts the result in R. If the result is negative it sets the NEG flag to 1.
* PUT X
  Puts a value from X [A, B or R] in the stack
* POP X
  Gets a value from the stack and puts it in X [Puts it in A or B]
* CMP
  Compares A and B. 
  If A>B then the CMP flag is 1, if A<=B CMP is 0. 
  If A!=B, NEQ flag is 1, if A==B NEQ is 0.
* SHL X
  Shifts bits to the left in X [A or B]
* SHR X
  Shifts bits to the right in X [A or B]
* NOP
  Does nothing

### To-memory only instructions

* GTO P
  Jumps to instruction P and continues the execution of the program from there.
* JNG P
  Jumps to instruction P if the negative flag is 1
* JGE P
  Jumps to instruction P if the comparison was greater or equal
* JLE P
  Jumps to instruction P if the comparison was less
* JZR P
  Jumps to instruction P if the counter register C is 0
* INC  
  Increases counter by 1
* DEC  
  Decreases counter by 1
* SET N
  Sets the counter to N

## Program management

Once the program memory has some instructions, you can try some or all of them by using the buttons under the program memory block. 


* RSI 
  Select an instruction and run it without advancing the instruction pointer.
* STP 
  Runs a step (Run instruction, advance pointer)
* EXE 
  Runs entire program. The instruction pointer will keep being modified until it reaches the last position.
* CPY 
  Copies an instruction to another slot
* RMI 
  Removes instruction
* DEL 
  Deletes entire program (Requires confirmation)
* v   
  Increases pointer
* vv  
  Moves pointer to the last instruction
* ^   
  Decreases pointer
* ^^  
  Resets pointer

Thanks for playing, and have fun!