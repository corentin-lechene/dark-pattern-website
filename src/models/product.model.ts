export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    size: number;
    insurance: boolean;
    category: Category;
    comments: Comment[];
}

export interface Category {
    name: string;
    image: string;
    description: string;
}

export interface Comment {
    id: string;
    userFullName: string;
    userAvatar: string;
    content: string;
    createdAt: string;
}