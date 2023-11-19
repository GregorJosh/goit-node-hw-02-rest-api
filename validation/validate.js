//import ansi from "node_modules/ansi-colors-es6.js";

export const validate = async (schema, fields) => {
    try {
      const result = await schema.validateAsync(fields);
  
      return [true, result];
    } catch (error) {
      console.log(error);
  
      return [false, error.message];
    }
  };
  