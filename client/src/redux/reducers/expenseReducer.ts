const initState = {
  expense: null,
  expenses: [],
  categories: [],
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
    const { expenses } = action.payload;
    return {
      ...state,
      expenses: expenses
    };
  }
  else if (action.type === "update-expense") {
    const { expenses } = action.payload;
    return {
      ...state,
      expenses: expenses
    };
  }
  else if (action.type === "delete-expense") {
    const { expenses } = action.payload;
    return {
      ...state,
      expenses: expenses
    };
  }
  else if (action.type === "set-categories") {
    const { categories } = action.payload;
    return {
      ...state,
      categories: categories
    };
  }
  else if (action.type === "logout") {
    return {
      ...state,
      expense: null,
      expenses: [],
      categories: []
    };
  }
  else {
    return state;
  }
};

export default expenseReducer;