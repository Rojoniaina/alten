import { Request, Response } from "express";
import { productService } from "../../services/product.service";
import { ProductAlreadyExistsError } from "../../domain/errors/productAlreadyExistsError";
import { httpErrorSend } from "../../utils/errors";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await productService.getProducts(page, limit);
    res.json(result);
  } catch (error: any) {
    httpErrorSend(res, { message: error?.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.status(200).json(product);
  } catch (error: any) {
    httpErrorSend(res, { message: error?.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    if (error instanceof ProductAlreadyExistsError) {
      httpErrorSend(res, {
        status: 409,
        error: "Conflict",
        message: error.message,
      });
      return;
    }
    httpErrorSend(res, { message: error?.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error: any) {
    if (error instanceof ProductAlreadyExistsError) {
      httpErrorSend(res, {
        status: 409,
        error: "Conflict",
        message: error.message,
      });
      return;
    }
    httpErrorSend(res, { message: error?.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const isDeleted = await productService.deleteProduct(req.params.id);
    res.status(200).json(isDeleted);
  } catch (error: any) {
    httpErrorSend(res, { message: error?.message });
  }
};
