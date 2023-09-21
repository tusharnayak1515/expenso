const initState = {
  expense: null,
  expenses: [],
};

const expenseReducer = (state = initState, action: any) => {
  if (action.type === "set-expenses") {
    const { expenses } = action.payload;
    return {
      ...state,
      expenses: expenses
    };
  }
  else if (action.type === "set-expense") {
    const { expense } = action.payload;
    return {
      ...state,
      expense: expense
    };
  }
  else if (action.type === "add-expense") {
    const { expense } = action.payload;
    return {
      ...state,
      expenses: [...state.expenses, expense]
    };
  }
  else if (action.type === "update-expense") {
    const { expense } = action.payload;
    return {
      ...state,
      expenses: state.expenses.map((item:any)=> item?._id === expense?._id ? expense : item)
    };
  }
  else if (action.type === "delete-expense") {
    const { expense } = action.payload;
    return {
      ...state,
      expenses: state.expenses.filter((item:any)=> item?._id !== expense?._id)
    };
  }
  else if (action.type === "logout") {
    return {
      ...state,
      expense: null,
      expenses: []
    };
  }
  else {
    return state;
  }
};

export default expenseReducer;