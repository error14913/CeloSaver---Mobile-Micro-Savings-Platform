// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CeloSaver is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    struct SavingsGoal {
        string name;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 deadline;
        bool isActive;
        uint256 createdAt;
    }

    mapping(address => SavingsGoal[]) public userGoals;

    event GoalCreated(address indexed user, uint256 goalId, string name, uint256 targetAmount, uint256 duration);
    event Deposited(address indexed user, uint256 goalId, uint256 amount);
    event Withdrawn(address indexed user, uint256 goalId, uint256 amount);

    constructor() ERC20("CeloSaver", "CSVR") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function createGoal(
        string memory _name,
        uint256 _targetAmount,
        uint256 _durationInDays
    ) public {
        require(_targetAmount > 0, "Target must be > 0");
        require(_durationInDays > 0, "Duration must be > 0");

        uint256 goalId = userGoals[msg.sender].length;
        uint256 deadline = block.timestamp + (_durationInDays * 1 days);

        userGoals[msg.sender].push(SavingsGoal({
            name: _name,
            targetAmount: _targetAmount,
            currentAmount: 0,
            deadline: deadline,
            isActive: true,
            createdAt: block.timestamp
        }));

        emit GoalCreated(msg.sender, goalId, _name, _targetAmount, _durationInDays);
    }

    function deposit(uint256 _goalId) public payable {
        require(_goalId < userGoals[msg.sender].length, "Goal does not exist");
        SavingsGoal storage goal = userGoals[msg.sender][_goalId];
        require(goal.isActive, "Goal is not active");
        require(msg.value > 0, "Must send CELO-S");

        goal.currentAmount += msg.value;
        if (goal.currentAmount >= goal.targetAmount) {
            goal.isActive = false;
        }

        emit Deposited(msg.sender, _goalId, msg.value);
    }

    function withdraw(uint256 _goalId) public {
        require(_goalId < userGoals[msg.sender].length, "Goal does not exist");
        SavingsGoal storage goal = userGoals[msg.sender][_goalId];
        require(!goal.isActive || block.timestamp >= goal.deadline, "Goal still active");
        require(goal.currentAmount > 0, "No funds to withdraw");

        uint256 amount = goal.currentAmount;
        goal.currentAmount = 0;
        goal.isActive = false;

        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, _goalId, amount);
    }

    function getUserGoals(address _user) public view returns (SavingsGoal[] memory) {
        return userGoals[_user];
    }

    // Override required by Pausable
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}