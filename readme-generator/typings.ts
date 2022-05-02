export type File = string;

export type Dir = {
    name: string;
    children: Items;
};

type Items = (File | Dir)[];

export default Items;
