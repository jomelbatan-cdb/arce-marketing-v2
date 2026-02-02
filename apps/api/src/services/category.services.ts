import Category from "../models/category.model";
import { ICategory } from "../models/category.model";

export const createCategory = async (data: Partial<ICategory>) => {
  return await Category.create(data);
};

export const getAllCategories = async () => {
  return await Category.find().populate("parent");
};

export const getCategoryById = async (id: string) => {
  return await Category.findById(id).populate("parent");
};

export const updateCategory = async (id: string, data: Partial<ICategory>) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};
