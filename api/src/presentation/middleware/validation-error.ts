import { NextFunction, Request, Response } from "express";
import { Validator } from "jsonschema";

export const validateData =
  (schema: Object) => (req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator();
    const checkValidity = validator.validate(req.body, schema, {
      nestedErrors: true,
    });

    const validatorError: any = checkValidity.errors;
    if (validatorError.length) {
      const errorName = validatorError[0].name;
      res.status(400).send({
        message: validatorError[0]?.schema?.errorMessage
          ? validatorError[0]?.schema?.errorMessage[errorName]
          : validatorError[0]?.message,
      });
      return;
    }
    next();
  };
