//Path & fs are built in modules - Do NOT need npm install
  //Get cross platform compatibility with path
const path = require('path');
const fs = require('fs');
const solc = require('solc'); //require solidity compiler. 

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//read RAW source code from contract
const source = fs.readFileSync(inboxPath, 'utf8');


module.exports =  solc.compile(source, 1).contracts[':Inbox']; //args 1: What to compile, 2: How many different contracts to compile.







/*
Contract has two properties assigned to it
  One: Interface - Javascript ABI (Application Binary Interface)
  Two: Byte Code - RAW compiled contract


The Promise.resolve(value) method returns a Promise object that is resolved with the given value. If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value. This function flattens nested layers of promise-like objects (e.g. a promise that resolves to a promise that resolves to something) into a single layer.
[https://devdocs.io/javascript/global_objects/promise/resolve]

More on resolve
  For instance, when you run:

  path.resolve('bar', '/foo');
  The path returned will be /foo since that is the first absolute path that can be constructed.

  However, if you run:

  path.resolve('/bar/bae', '/foo', 'test');
  The path returned will be /foo/test again because that is the first absolute path that can be formed from right to left.
  [https://stackoverflow.com/questions/39110801/path-join-vs-path-resolve-with-dirname]

Info on __dirname
  __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file
  [https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname]

  The __dirname in a node script returns the path of the folder where the current JavaScript file resides. __filename and __dirname are used to get the filename and directory name of the currently executing file. The ./ gives the current working directory. It works similar to process.
  [https://www.geeksforgeeks.org/difference-between-__dirname-and-in-node-js/#:~:text=The%20__dirname%20in%20a,It%20works%20similar%20to%20process.]

inboxPath
  "So again this is going to generate a path that points directly to the inbox.sol file and we're jumping through this hoop right here of using this function to make sure that it works on either Windows or Unix based systems."

source variable
  The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
  [https://nodejs.org/api/fs.html#fs_file_system]

    What the Posix standard in Unix?
      POSIX stands for Portable Operating System Interface, and is an IEEE standard designed to facilitate application portability. POSIX is an attempt by a consortium of vendors to create a single standard version of UNIX. If they are successful, it will make it easier to port applications between hardware platforms.
      [http://www.robelle.com/smugbook/posix.html]

    What is encoding =' UTF 8?
      UTF-8 can represent any character in the Unicode standard. UTF-8 is backwards compatible with ASCII. UTF-8 is the preferred encoding for e-mail and web pages. UTF-16. 16-bit Unicode Transformation Format is a variable-length character encoding for Unicode, capable of encoding the entire Unicode repertoire.
      [https://www.w3schools.com/charsets/ref_html_utf8.asp]

      In the case of the source variable the argument utf8 specifies which type of encoding will take place on the inbox.sol file.

      //This Scripts main purpose is to return an ABI and Byte code.
      //ABI = Solidity <---> Javascript Communication layer
      //byte code - Smart contract encoded to store on blockchain

      //Ganache use to be named TestRPC

      //require('./contracts/Inbox.sol'); //BAD! When using require node will think it is javascript but we are importing solidity
*/