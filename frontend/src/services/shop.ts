import { CreateShopDto } from './../../../src/dtos/shop.dto';
import { Shop } from '@prisma/client';

export const getShops = async (): Promise<Shop[]> => {
  try {
    const response = await fetch(`/api/shops`);
    const shops = await response.json();
    return shops.data;
  } catch (error) {
    return [];
  }
};

export const getShopById = async (id: string): Promise<Shop | undefined> => {
  try {
    const response = await fetch(`/api/shops/${id}`);
    const shop = await response.json();
    return shop.data;
  } catch (error) {
    return undefined;
  }
};

export const addShopToNearBy = async (shopId: number): Promise<Shop | undefined> => {
  try {
    const response = await fetch(`/api/shops/${shopId}/nearby`, {
      method: 'POST',
    });
    const shop = await response.json();
    return shop.data;
  } catch (error) {
    return undefined;
  }
};

export const removeShopFromNearBy = async (shopId: number): Promise<Shop | undefined> => {
  try {
    const response = await fetch(`/api/shops/${shopId}/nearby`, {
      method: 'DELETE',
    });
    const shop = await response.json();
    return shop.data;
  } catch (error) {
    return undefined;
  }
};

// admin stuff

export const createShop = async (shop: CreateShopDto): Promise<Shop | undefined> => {
  try {
    const response = await fetch(`/api/shops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shop),
    });
    const newShop = await response.json();
    return newShop.data;
  } catch (error) {
    return undefined;
  }
};

export const deleteShop = async (id: string): Promise<Shop | undefined> => {
  try {
    const response = await fetch(`/api/shops/${id}`, {
      method: 'DELETE',
    });
    const deletedShop = await response.json();
    return deletedShop.data;
  } catch (error) {
    return undefined;
  }
};
