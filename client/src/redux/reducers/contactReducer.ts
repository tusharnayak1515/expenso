const initState = {
    contacts: [],
    contact: null
  };
  
  const contactReducer = (state = initState, action: any) => {
    if (action.type === "set-contacts") {
      const { contacts } = action.payload;
      return {
        ...state,
        contacts: contacts
      };
    }
    else if (action.type === "set-contact") {
      const { contact } = action.payload;
      return {
        ...state,
        contact: contact
      };
    }
    else if (action.type === "logout") {
      return {
        ...state,
        contact: null,
        contacts: []
      };
    }
    else {
      return state;
    }
  };
  
  export default contactReducer;