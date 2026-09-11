interface IHdd {
  size: number; // HDD size in bytes
}

export const initHdd = (size: number): IHdd => {
  return {
    size,
  };
};
