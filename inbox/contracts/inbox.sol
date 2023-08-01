pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    function Inbox (string InitialMessage)public {
        message = InitialMessage;
        message_1 = message;

    }
    function setMessage(string newMessage) public {
        message = newMessage;
        message_1 = newMessage;
    }
    function doMath(int a,int b) {
        a+b;
        b-a;
        a*b;
        a==0;
    }
}
