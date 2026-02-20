export interface Category {
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: { name: string; _id: string } | string;
  tags: string[];
  images: string[];
  stock: number;
  sku: string;
  ratings?: {
    average: number;
    count: number;
  };
  variations?: Variation[];
  solds: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductForm = Omit<
  Product,
  "_id" | "createdAt" | "updatedAt" | "solds" | "ratings" | "images"
> & {
  images: {
    existing: string[];
    uploads: File[];
  };
};

export type AddProductForm = Omit<
  Product,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "solds"
  | "ratings"
  | "images"
  | "variations"
> & {
  images: File[];
  variations: VariationDraft[];
};

export interface Variation {
  _id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  images: string[];
  productId: {
    _id: string;
    name: string;
  };
}
export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

type VariationUploadDraft = {
  images?: File[];
};

type VariationFormState = VariationDraft & {
  _uploads?: VariationUploadDraft;
};

export type VariationDraft = Omit<Variation, "_id" | "productId" | "images"> & {
  existingImages: string[]; // already uploaded images
  newImages: File[]; // newly uploaded images
};
