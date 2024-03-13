const initState = {
    transactions: [],
    transaction: null
  };
  
  const transactionReducer = (state = initState, action: any) => {
    if (action.type === "set-transactions") {
      const { transactions } = action.payload;
      return {
        ...state,
        transactions: transactions
      };
    }
    else if (action.type === "set-transaction") {
      const { transaction } = action.payload;
      return {
        ...state,
        transaction: transaction
      };
    }
    else if (action.type === "logout") {
      return {
        ...state,
        transaction: null,
        transactions: []
      };
    }
    else {
      return state;
    }
  };
  
  export default transactionReducer;