// 🏦 Bank and Account System
// Bank Class: Manages multiple accounts
class Bank {
  constructor() {
    this.accounts = []; // Stores all accounts in the bank
  }

  createAccount(name, initialDeposit) {
    if (name.trim().length === 0 || typeof name !== 'string') {
      throw new Error('Invalid name.');
    }

    if (typeof initialDeposit !== 'number' || initialDeposit < 0) {
      throw new Error('Initial deposit must be greater than or equal to 0.');
    }

    const account = new Account(name, initialDeposit);
    this.accounts.push(account);
    return account;
  }
}

// Account Class: Represents a single user's account
class Account {
  constructor(name, balance = 0) {
    this.name = name; // Account holder's name
    this.balance = balance; // Initial balance (default is 0)
    this.transactionHistory = []; // Keeps a record of all transactions
  }

  deposit(amount) {
    if (typeof amount !== 'number') {
      throw new Error('Amount must be a number');
    }

    if (amount <= 0) {
      throw new Error('Amount to be deposited must be greater than 0');
    }

    this.balance += amount;
    this.transactionHistory.push({
      transactionType: 'Deposit',
      amount: amount,
    });
  }

  withdraw(amount) {
    //amount to be withdrawn has to be greater than 0
    // account balance should be greater than or equal to the amount to be withdrawn
    if (typeof amount !== 'number') {
      throw new Error('Amount must be a number');
    }

    if (amount <= 0) {
      throw new Error('Amount to be withdraw has to be greater than 0');
    }

    if (amount > this.balance) {
      throw new Error(
        "Amount to be withdraw can't be greater than the account balance"
      );
    }

    this.balance -= amount;
    this.transactionHistory.push({
      transactionType: 'Withdrawal',
      amount: amount,
    });
  }

  transfer(amount, recipientAccount) {
    const recipientAccountExist = recipientAccount instanceof Account;

    if (typeof amount !== 'number') {
      throw new Error('Amount must be a number');
    }

    if (amount <= 0) {
      throw new Error('Amount to be transfer has to be greater than 0');
    }

    if (amount >= this.balance) {
      throw new Error(
        "Amount to be transfer can't be greater than the account balance"
      );
    }

    if (!recipientAccountExist) {
      throw new Error('Recipient Account do not exist');
    }

    this.balance -= amount;
    this.transactionHistory.push({
      transactionType: 'Transfer',
      amount: amount,
      to: recipientAccount.name,
    });

    recipientAccount.balance += amount;
    recipientAccount.transactionHistory.push({
      transactionType: 'Received',
      amount: amount,
      from: this.name,
    });
  }

  checkBalance() {
    return this.balance;
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }
  
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
  const bank = new Bank();

  // Create new accounts
  const johnAccount = bank.createAccount('John Doe', 1000);
  const janeAccount = bank.createAccount('Jane Doe', 500);
  console.log('Accounts created:', johnAccount, janeAccount);

  // Perform some operations on John's account
  johnAccount.deposit(500);
  johnAccount.withdraw(200);

  // Perform a transfer from John to Jane
  johnAccount.transfer(300, janeAccount);

  // // Check balances
  const johnFinalBalance = johnAccount.checkBalance();
  const janeFinalBalance = janeAccount.checkBalance();
  console.log("John's balance:", johnFinalBalance);
  console.log("Jane's balance:", janeFinalBalance);

  // Return balances for testing
  return {
    johnFinalBalance,
    janeFinalBalance,
    johnTransactionHistory: johnAccount.transactionHistory,
    janeTransactionHistory: janeAccount.transactionHistory,
  };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>

console.log(testBankOperations());
