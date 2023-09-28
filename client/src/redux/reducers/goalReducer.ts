const initState = {
    goals: [],
    goal: null
  };
  
  const goalReducer = (state = initState, action: any) => {
    if (action.type === "set-goals") {
      const { goals } = action.payload;
      return {
        ...state,
        goals: goals
      };
    }
    else if (action.type === "set-goal") {
      const { goal } = action.payload;
      return {
        ...state,
        goal: goal
      };
    }
    else if (action.type === "logout") {
      return {
        ...state,
        goal: null,
        goals: []
      };
    }
    else {
      return state;
    }
  };
  
  export default goalReducer;