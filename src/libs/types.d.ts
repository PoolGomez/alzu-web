import mongoose from "mongoose";

type ExtraPrice ={
    _id:string;
    name: string;
    price: number;
}
type MenuItemType={
    _id : string;
    image: string;
    name: string;
    description: string;
    // category: mongoose.Types.ObjectId;
    category: string;
    basePrice: number;
    sizes: ExtraPrice[],
    extraIngredientPrices: ExtraPrice[],
}
type MenuItemCreateType={
    image: string;
    name: string;
    description: string;
    // category: mongoose.Types.ObjectId;
    category: string;
    basePrice: number;
    sizes: ExtraPrice[],
    extraIngredientPrices: ExtraPrice[],
}
type UserType={
    _id:string;
    name:string;
    email: string;
    password: string;
    image:string;
}

type UserInfoType={
    _id:string;
    email: string;
    streetAddress:string;
    postalCode:string;
    city:string;
    country:string;
    phone:string;
    admin: boolean;
}

type DataProfileType={
    _id:string;
    admin:boolean;
    city:string;
    email:string;
    image:string;
    name:string;
    phone:string;
    postalCode:string;
    streetAddress:string;
  }

  type CategoryType={
    _id:string;
    name:string;
  }


  type OrderType={
    _id:string;
    userEmail: string;
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    // cartProducts: Object;
    cartProducts: CartProductType[];
    paid: boolean;
    createdAt:string;
  }

  type CartProductType={
    _id:string;
    name:string;
  }