export const productSchema = {
  type: "object",
  required: ["code", "name"],
  properties: {
    code: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "Code must be string",
        minLength: "Code must have at least one character",
      },
    },
    name: {
      type: "string",
      minLength: 2,
      errorMessage: {
        type: "Name must be string",
        minLength: "Name must have at least 2 characters",
      },
    },
    description: {
      type: "string",
      errorMessage: {
        type: "Description must be string",
      },
    },
    image: {
      type: "string",
      errorMessage: {
        type: "Image must be string",
      },
    },
    category: {
      type: "string",
      errorMessage: {
        type: "Category must be string",
      },
    },
    price: {
      type: "number",
      errorMessage: {
        type: "Price must be a number",
      },
    },
    quantity: {
      type: "number",
      errorMessage: {
        type: "Quantity must be a number",
      },
    },
    internalReference: {
      type: "string",
      errorMessage: {
        type: "InternalReference must be string",
      },
    },
    shellId: {
      type: "number",
      errorMessage: {
        type: "Image must be a number",
      },
    },
    inventoryStatus: {
      type: "string",
      enum: ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"],
      errorMessage: {
        type: "Image must be string",
        enum: "Image must be value of INSTOCK or LOWSTOCK or OUTOFSTOCK",
      },
    },
    rating: {
      type: "number",
      errorMessage: {
        type: "Rating must be a number",
      },
    },
  },
};
