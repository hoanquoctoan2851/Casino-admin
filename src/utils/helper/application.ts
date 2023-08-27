import { roundTo } from 'round-to';
import { message } from 'ant-design-vue';
export const toFixedNumber = (number: number | string, rounded = 4) => {
  if (Math.abs(Number(number)) < 0.01) {
    return roundTo(Number(number), rounded + 2);
  } else {
    return roundTo(Number(number), rounded);
  }
};

export const formatNumericalOrder = (data, item, page, sizePage) => {
  const numberricalOrder = sizePage * (page - 1) + data.indexOf(item) + 1;
  return numberricalOrder;
};

export const copyText = async (id: string) => {
  const text = document.getElementById(id)?.innerHTML;
  try {
    await navigator.clipboard.writeText(text ? text : '');
    message.success('Copy success');
  } catch (err) {
    message.error('Error');
  }
};

export const convertObjectToArray = (obj, mapFn) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc.push(mapFn(key, value));
    return acc;
  }, []);
