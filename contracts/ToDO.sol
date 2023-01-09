// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
struct Task {
    string task;
    uint256 priority;
}

contract ToDO {
    mapping(address => Task[]) internal users;
    function exist(address add) internal view returns(uint){
        for(uint i=0;i<users[add].length;i++){
            if(users[add][i].priority==0) return 0;
        }
         return 1;
    }
    function addTask(string calldata _task, uint256 _priority) external {
        Task memory tasks;
        tasks.task = _task;
        tasks.priority = _priority;
        users[msg.sender].push(tasks);
    }

    function getTask() external view returns (Task[] memory) {
        return users[msg.sender];
    }

    function deleteTask(uint256 index) external {
        delete users[msg.sender][index];
    }

    function updateStatus(uint256 _taskIndex, uint _priority) external {
        require(exist(msg.sender)!=0,"No such Task Exists");
        users[msg.sender][_taskIndex].priority = _priority;
    }
}
