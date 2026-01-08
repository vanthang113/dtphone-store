import { Province, District } from '@/types/location';

export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await fetch('https://provinces.open-api.vn/api/?depth=2');
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

export const getDistrictsByProvinceCode = async (provinceCode: number): Promise<District[]> => {
  try {
    const provinces = await getProvinces();
    const province = provinces.find(p => p.code === provinceCode);
    return province?.districts || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};