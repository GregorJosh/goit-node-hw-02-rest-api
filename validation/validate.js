import ansi from "ansi-colors-es6";

export const validate = async (schema, fields) => {
    try {
      const result = await schema.validateAsync(fields);
  
      return [true, result];
    } catch (error) {
      console.log(ansi.bold.redBright(error));
  
      return [false, error.message];
    }
  };
  